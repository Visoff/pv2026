import { useState } from "react";
import ReviewItem from "./ReviewItem.jsx";

export default function ReviewList({ questions, answers }) {
    const [onlyMistakes, setOnlyMistakes] = useState(false);
    const visible = onlyMistakes
        ? questions.filter((question) => answers[question.id] !== question.correct)
        : questions;

    return (
        <section className="review">
            <div className="review-head">
                <h2>Разбор</h2>
                <button type="button" onClick={() => setOnlyMistakes(!onlyMistakes)}>
                    {onlyMistakes ? "Показать все" : "Только ошибки"}
                </button>
            </div>

            <ul className="review-list">
                {visible.map((question, index) => (
                    <ReviewItem
                        key={index}
                        question={question}
                        answer={answers[question.id]}
                    />
                ))}
            </ul>
        </section>
    );
}
