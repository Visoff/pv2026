import { useState } from "react";
import QuestionCard from "./QuestionCard.jsx";
import Timer from "./Timer.jsx";
import { questions } from "../data.js";

export default function QuizScreen({
    name,
    answers,
    flagged,
    onAnswer,
    onToggleFlag,
    onFinish,
}) {
    const [index, setIndex] = useState(0);
    const question = questions[index];
    let remaining = questions.length;

    function next() {
        remaining--;
        if (index === questions.length - 1) {
            onFinish();
        } else {
            setIndex(index + 1);
        }
    }

    function prev() {
        remaining++;
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    return (
        <div className="card">
            <div className="top">
                <span>{name}</span>
                <span>
                    Вопрос {index + 1} из {questions.length}
                </span>
                <span>Осталось вопросов: {remaining}</span>
                <Timer questionId={question.id} />
            </div>

            <QuestionCard
                question={question}
                selected={answers[question.id]}
                flagged={flagged.includes(question.id)}
                onAnswer={(optionIndex) => onAnswer(question.id, optionIndex)}
                onToggleFlag={() => onToggleFlag(question.id)}
            />

            <div className="nav">
                <button type="button" onClick={prev} disabled={index === 0}>
                    Назад
                </button>
                <button type="button" onClick={next}>
                    {index === questions.length - 1 ? "Результаты" : "Далее"}
                </button>
            </div>
        </div>
    );
}
