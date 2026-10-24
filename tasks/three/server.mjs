import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));
const base_port = Number(process.env.PORT) || 5173;
let port = base_port;
let attempts = 0;

const mime = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
        res.writeHead(405, { Allow: "GET, HEAD" });
        res.end("Method Not Allowed");
        return;
    }

    try {
        const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        let pathname = decodeURIComponent(url.pathname);

        if (pathname.endsWith("/")) {
            pathname += "index.html";
        }

        const file = resolve(root, "." + pathname);

        if (file !== root && !file.startsWith(root + sep)) {
            res.writeHead(403);
            res.end("Forbidden");
            return;
        }

        const info = await stat(file);

        if (!info.isFile()) {
            res.writeHead(404);
            res.end("Not Found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": mime[extname(file).toLowerCase()] || "application/octet-stream",
            "Content-Length": info.size,
            "Cache-Control": "no-store",
        });

        if (req.method === "HEAD") {
            res.end();
            return;
        }

        const stream = createReadStream(file);
        stream.on("error", () => res.destroy());
        stream.pipe(res);
    } catch (error) {
        if (error.code === "ENOENT" || error.code === "ENOTDIR") {
            res.writeHead(404);
            res.end("Not Found");
            return;
        }

        console.error(error);
        res.writeHead(500);
        res.end("Internal Server Error");
    }
});

server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && attempts < 10) {
        attempts++;
        port++;
        server.listen(port);
        return;
    }

    if (error.code === "EADDRINUSE") {
        console.error(`Не удалось найти свободный порт, начиная с ${base_port}.`);
        process.exit(1);
    }

    throw error;
});

server.listen(port, () => {
    console.log("");
    console.log(`  DOM tasks: http://localhost:${port}/`);
    console.log("");
});
