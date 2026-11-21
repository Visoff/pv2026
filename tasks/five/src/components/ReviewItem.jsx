import { useState } from "react";

export default function ReviewItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    const correct = answer === question.correct;

    return (
        <li className={correct ? "review-item correct" : "review-item wrong"}>
            <div className="review-item-head">
                <span>
                    {correct ? "✓" : "✗"} {question.text}
                </span>
                <button type="button" onClick={() => setOpen(!open)}>
                    {open ? "Скрыть" : "Объяснение"}
                </button>
            </div>
            {open && <p className="explanation">{question.explanation}</p>}
        </li>
    );
}
