import { useRef } from "react";

export default function StartScreen({ onStart }) {
    const nameRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        const name = nameRef.current.value.trim();
        if (name) {
            onStart(name);
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
                <input ref={nameRef} type="text" placeholder="..." />
            </label>

            <p className="preview">Привет, {nameRef.current?.value || "..."}!</p>

            <button type="submit">Начать</button>
        </form>
    );
}
