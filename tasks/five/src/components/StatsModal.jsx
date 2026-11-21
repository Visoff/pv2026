import { useEffect, useState } from "react";

export default function StatsModal({ questions, answers, onClose }) {
    const [stats, setStats] = useState(null);
    const correct = questions.filter(
        (question) => answers[question.id] === question.correct
    );

    useEffect(() => {
        setStats({
            correct: correct.length,
            total: questions.length,
            percent: Math.round((correct.length / questions.length) * 100),
        });
    }, [correct]);

    if (!stats) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Статистика</h2>
                <p>
                    Правильно: {stats.correct} из {stats.total}
                </p>
                <p>Точность: {stats.percent}%</p>
                <button type="button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
}
