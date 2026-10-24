class AssertionError extends Error {}

function assert(cond, msg) {
    if (msg === undefined) {
        msg = "Assertion failed";
    }
    if (!cond) {
        throw new AssertionError(msg);
    }
}

function deep_eq(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a !== typeof b) {
        console.error("expected", typeof b, "got", typeof a);
        return false;
    }
    if (
        (typeof a == "string" || typeof a == "number") &&
        (typeof b == "string" || typeof b == "number")
    ) {
        console.error("expected", JSON.stringify(b), "got", JSON.stringify(a));
        return false;
    }
    if (a == null || b == null) {
        if (a == null) {
            console.error("expected", JSON.stringify(b), "got nothing");
        } else {
            console.error("expected nothing, got", JSON.stringify(b));
        }
        return false;
    }
    const a_keys = Object.keys(a).sort();
    const b_keys = Object.keys(b).sort();
    if (a_keys.length !== b_keys.length) {
        console.error("object structure is not as expected");
        return false;
    }
    for (let i = 0; i < a_keys.length; i++) {
        if (a_keys[i] !== b_keys[i]) {
            console.error("object structure is not as expected");
            return false;
        }
        if (!deep_eq(a[a_keys[i]], b[b_keys[i]])) {
            return false;
        }
    }
    return true;
}

function assert_eq(a, b, msg="Wrong answer") { assert(deep_eq(a, b), msg); }
function assert_ne(a, b, msg) { assert(!deep_eq(a, b), msg); }

function test(name, fn) {
    try {
        fn();
        console.log("\x1b[32m ✔️ PASS\x1b[0m:", name);
    } catch (e) {
        console.log(`\x1b[31m ❌ FAIL\x1b[0m(${name}):`, e.message);
    }
}

function test_file(name, fn) {
    try {
        fn(require("./" + name + ".mjs").default);
        console.log("\x1b[32m ✔️ PASS\x1b[0m:", name);
    } catch (e) {
        console.log(`\x1b[31m ❌ FAIL\x1b[0m(${name}):`, e.message);
    }
}

test_file("1", (f) => {
    assert_eq(f([1, 2, 3]), [0, 2, 6]);
    assert_eq(f([]), []);
    assert_eq(f([5, 5, 5, 5]), [0, 5, 10, 15]);
})

test_file("2", (f) => {
    assert_eq(f([1, 2, 3, 4]), [2, 4]);
    assert_eq(f([1, 3, 5]), []);
    assert_eq(f([]), []);
    const input = [1, 2, 3, 4];
    f(input);
    assert_eq(input, [1, 2, 3, 4], "input must not be mutated");
})

test_file("3", (f) => {
    assert_eq(f(["a", "b", "a"]), { a: 2, b: 1 });
    assert_eq(f([1, 1, 1]), { 1: 3 });
    assert_eq(f([]), {});
})

test_file("4", (f) => {
    assert_eq(f([{ name: "a", age: 10 }, { name: "b", age: 20 }, { name: "c", age: 30 }]), "b");
    assert_eq(f([{ name: "a", age: 10 }]), null);
    assert_eq(f([]), null);
})

test_file("5", (f) => {
    assert_eq(f([3, 1, 10, 2]), [1, 2, 3, 10]);
    assert_eq(f([]), []);
    const input = [3, 1, 2];
    f(input);
    assert_eq(input, [3, 1, 2], "input must not be mutated");
})

test_file("6", (f) => {
    assert_eq(f([1, 2, 3]), [3, 2, 1]);
    assert_eq(f([]), []);
    const input = [1, 2, 3];
    f(input);
    assert_eq(input, [1, 2, 3], "input must not be mutated");
})

test_file("7", (f) => {
    assert_eq(f([1, 2, 3]), false);
    assert_eq(f([1, 2, 1]), true);
    assert_eq(f(["a", "b", "a"]), true);
    assert_eq(f([]), false);
})

test_file("8", (f) => {
    assert_eq(f([1, 2, 3, 4, 5]), 20);
    assert_eq(f([1, 3]), 0);
    assert_eq(f([]), 0);
})

test_file("9", (f) => {
    assert_eq(
        f([1, 2, 3, 4, 5], (x) => x % 2 === 0 ? "even" : "odd"),
        { odd: [1, 3, 5], even: [2, 4] }
    );
    assert_eq(f([], (x) => String(x)), {});
    assert_eq(
        f(["apple", "avocado", "banana"], (s) => s[0]),
        { a: ["apple", "avocado"], b: ["banana"] }
    );
})
