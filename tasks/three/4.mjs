/**
    * @param {HTMLElement} root
    * @param {{title: string, content: string}[]} tabs
*/
export default function (root, tabs) {
    /*
        На входе: пустой div и массив вкладок
        На выходе: переключаемые вкладки:

        <div data-testid="tabs">
            <div role="tablist">
                <button data-testid="tab" role="tab" aria-selected="true">Заголовок</button>
                ...
            </div>
            <div data-testid="panel" role="tabpanel">Содержимое</div>
            ...
        </div>

        - кнопка вкладки: data-testid="tab", role="tab", текст = title
        - панель: data-testid="panel", role="tabpanel", текст = content
        - изначально активна первая вкладка: класс active и aria-selected="true",
          у остальных aria-selected="false"
        - неактивные панели скрыты через hidden
        - по клику на вкладку активной становится только она,
          показывается только её панель
        - content вставляй через textContent
    */
}
