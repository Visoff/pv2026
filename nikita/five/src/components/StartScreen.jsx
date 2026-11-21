import { useState } from "react";

export default function StartScreen({ onStart }) {
    const [name, setName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const name1 = name.trim();
        if (name1) {
            onStart(name1);
        }
    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h1>Квиз по React</h1>
            <p className="muted">
                6 вопросов. На каждый — 30 секунд, но таймер ничего не блокирует.
            </p>

            <label className="field">
                Ваше имя
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder=""/>
            </label>

            <p className="preview">Привет, {name.trim() || "..."}!</p>

            <button type="submit">Начать</button>
        </form>
    );
}


