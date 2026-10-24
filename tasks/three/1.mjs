/**
    * @param {HTMLElement} root
    * @param {{name: string, age: number, city: string}} user
*/
export default function (root, user) {
    /*
        На входе: пустой div (root) и объект пользователя
        На выходе: внутри root появляется карточка:

        <div data-testid="card" class="card adult">
            <h2 data-testid="name">Имя</h2>
            <p data-testid="age">Возраст: 20</p>
            <p data-testid="city">Город: Казань</p>
            <span data-testid="status">Совершеннолетний</span>
        </div>

        - если age >= 18: класс adult и статус "Совершеннолетний"
        - иначе: класс minor (вместо adult) и статус "Несовершеннолетний"
        - имя и город вставляй через textContent, а не innerHTML:
          тесты проверяют, что строка "<b>Илья</b>" остаётся текстом
    */
}
