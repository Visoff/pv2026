/**
    * @param {HTMLElement} root
    * @param {{id: number, name: string, price: number}[]} products
*/
export default function (root, products) {
    /*
        На входе: пустой div и список товаров
        На выходе: корзина:

        <div data-testid="cart">
            <ul data-testid="list">
                <li data-testid="item" data-id="1">
                    <span data-testid="name">Хлеб</span>
                    <span data-testid="price">50 ₽</span>
                    <button data-testid="minus" type="button">−</button>
                    <span data-testid="qty">0</span>
                    <button data-testid="plus" type="button">+</button>
                </li>
                ...
            </ul>
            <div data-testid="total">Итого: 0 ₽</div>
        </div>

        - количество начинается с 0
        - "+" увеличивает количество товара, "−" уменьшает,
          но не ниже 0; при 0 кнопка "−" disabled
        - total = сумма price * qty по всем товарам, формат "Итого: 130 ₽"
        - total обновляется после каждого клика
        - попробуй повесить один обработчик на список (делегирование),
          а не отдельный на каждую кнопку
        - name вставляй через textContent
    */
}
