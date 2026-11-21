import { useEffect, useState } from "react";

export default function Timer({ questionId }) {
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        setSeconds(30);
        const id = setInterval(() => {
            setSeconds((value) => Math.max(0, value - 1));
        }, 1000);
        return() => clearInterval(id);
    }, [questionId]);

    return <span className="timer">{seconds} с</span>;
}
