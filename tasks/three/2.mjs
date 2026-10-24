/**
    * @param {HTMLElement} root
*/
export default function (root) {
    /*
        На входе: пустой div
        На выходе: счётчик:

        <div data-testid="counter">
            <button data-testid="decrement">−</button>
            <span data-testid="value">0</span>
            <button data-testid="increment">+</button>
            <button data-testid="reset">Сброс</button>
        </div>

        - значение начинается с 0
        - "+" увеличивает на 1, "−" уменьшает на 1
        - "−" disabled, когда значение равно 0 (отрицательным счётчик быть не может)
        - "Сброс" возвращает 0
        - после каждого клика текст value обновляется
        - обработчики можно вешать через onclick или addEventListener
    */
}
