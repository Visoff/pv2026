import { useState } from "react";
import ReviewList from "./ReviewList.jsx";
import StatsModal from "./StatsModal.jsx";
import { questions } from "../data.js";

export default function ResultScreen({ name, answers, onRestart }) {
    const [showStats, setShowStats] = useState(false);
    const score = questions.filter(
        (question) => answers[question.id] === question.correct
    ).length;

    return (
        <div className="card">
            <h1>Результат</h1>
            <p className="score">
                {name}, правильно {score} из {questions.length}.
            </p>

            <div className="nav">
                <button type="button" onClick={() => setShowStats(true)}>
                    Статистика
                </button>
                <button type="button" onClick={onRestart}>
                    Пройти ещё раз
                </button>
            </div>

            <ReviewList questions={questions} answers={answers} />

            {showStats && (
                <StatsModal
                    questions={questions}
                    answers={answers}
                    onClose={() => setShowStats(false)}
                />
            )}
        </div>
    );
}
