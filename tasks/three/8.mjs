/**
    * @param {HTMLElement} root
    * @param {{id: number, title: string, done: boolean}[]} initialTasks
*/
export default function (root, initialTasks) {
    /*
        Самое сложное задание: таск-борд с фильтрами.

        <form data-testid="form">
            <input data-testid="input" type="text">
            <button data-testid="add" type="submit">Добавить</button>
        </form>
        <div>
            <button data-testid="filter-all" type="button" class="active">Все</button>
            <button data-testid="filter-active" type="button">Активные</button>
            <button data-testid="filter-completed" type="button">Выполненные</button>
        </div>
        <ul data-testid="list">
            <li data-testid="task" data-id="1">
                <input data-testid="toggle" type="checkbox">
                <span data-testid="title">...</span>
                <button data-testid="delete" type="button">Удалить</button>
            </li>
        </ul>
        <span data-testid="remaining">1</span>
        <div data-testid="empty" hidden>Нет задач</div>
        <button data-testid="clear-completed" type="button">Очистить выполненные</button>

        - задачи из initialTasks сразу отрисованы
        - remaining — число невыполненных задач (просто цифра),
          не зависит от выбранного фильтра
        - фильтр по умолчанию "all", у его кнопки класс active
        - "Активные" показывает только done === false,
          "Выполненные" — только done === true, "Все" — все
        - в списке должны оставаться только подходящие задачи
          (можно удалять из DOM или скрывать через hidden)
        - checkbox переключает done; у выполненной задачи на li есть класс done
        - новая задача: title.trim(), пустые игнорируются, id = max(id) + 1,
          задача добавляется в конец и сразу учитывается фильтром
        - "Удалить" удаляет задачу
        - "Очистить выполненные" удаляет все done; кнопка disabled, если done нет
        - empty виден (hidden = false), когда в текущем фильтре нет задач
        - title вставляй через textContent
    */
}
