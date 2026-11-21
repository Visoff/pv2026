import { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import QuizScreen from "./components/QuizScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import { questions } from "./data.js";

export default function App() {
    const [screen, setScreen] = useState("start");
    const [name, setName] = useState("");
    const [answers, setAnswers] = useState([]);
    const [flagged, setFlagged] = useState([]);

    function start(playerName) {
        setName(playerName);
        setAnswers(Array(questions.length).fill(null));
        setFlagged([]);
        setScreen("quiz");
    }

    function answer(questionId, optionIndex) {
        answers[questionId] = optionIndex;
        setAnswers(answers);
    }

    function toggleFlag(questionId) {
        setFlagged(
            flagged.includes(questionId)
                ? flagged.filter((id) => id !== questionId)
                : [...flagged, questionId]
        );
    }

    function finish() {
        setScreen("result");
    }

    function restart() {
        setScreen("start");
    }

    if (screen === "start") {
        return <StartScreen onStart={start} />;
    }

    if (screen === "quiz") {
        return (
            <QuizScreen
                name={name}
                answers={answers}
                flagged={flagged}
                onAnswer={answer}
                onToggleFlag={toggleFlag}
                onFinish={finish}
            />
        );
    }

    return <ResultScreen name={name} answers={answers} onRestart={restart} />;
}
