export default function FlagButton({ active, onToggle }) {
    return (
        <button
            type="button"
            className={active ? "flag active" : "flag"}
            aria-pressed={active}
            onClick={onToggle}
        >
            {active ? "★" : "☆"}
        </button>
    );
}
