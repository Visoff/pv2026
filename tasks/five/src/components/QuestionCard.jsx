import Explanation from "./Explanation.jsx";
import FlagButton from "./FlagButton.jsx";

export default function QuestionCard({ question, selected, flagged, onAnswer }) {
    return (
        <div className="question">
            <div className="question-head">
                <h2>{question.text}</h2>
                <FlagButton active={flagged} />
            </div>

            <div className="options">
                {question.options.map((option, optionIndex) => (
                    <button
                        key={option}
                        type="button"
                        className={selected === optionIndex ? "option selected" : "option"}
                        onClick={() => onAnswer(optionIndex)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <Explanation questionId={question.id} />
        </div>
    );
}
