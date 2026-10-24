/**
    * @param {HTMLElement} root
*/
export default function (root) {
    /*
        На входе: пустой div
        На выходе: список задач:

        <form data-testid="form">
            <input data-testid="input" type="text">
            <button data-testid="add" type="submit">Добавить</button>
        </form>
        <ul data-testid="list"></ul>
        <span data-testid="count">0</span>

        Каждая задача:
        <li data-testid="item">
            <span data-testid="text">Купить хлеб</span>
            <button data-testid="delete" type="button">Удалить</button>
        </li>

        - добавление по submit формы: текст из input обрезается по краям,
          пустая строка (или одни пробелы) игнорируется
        - после добавления input очищается, задача появляется в конце списка
        - "Удалить" удаляет свою задачу
        - count — просто число задач (например, "2")
        - Enter в input должен работать: если используешь form + submit,
          браузер сделает это сам
        - текст задачи вставляй через textContent (тест на XSS)
    */
}
