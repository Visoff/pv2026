import { useEffect, useState } from "react";
import { loadExplanation } from "../data.js";

export default function Explanation({ questionId }) {
    const [text, setText] = useState("Загрузка…");

    useEffect(() => {
        setText("Загрузка…");
        loadExplanation(questionId).then(setText);
    }, []);

    return <p className="explanation">{text}</p>;
}
