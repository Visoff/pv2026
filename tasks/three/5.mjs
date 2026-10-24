/**
    * @param {HTMLElement} root
*/
export default function (root) {
    /*
        На входе: пустой div
        На выходе: модальное окно:

        <button data-testid="open">Открыть</button>
        <div data-testid="overlay" role="dialog" aria-modal="true" hidden>
            <div data-testid="modal">
                <button data-testid="close">Закрыть</button>
            </div>
        </div>

        - по "Открыть": overlay.hidden = false, фокус переходит на "Закрыть"
        - по "Закрыть": overlay.hidden = true, фокус возвращается на "Открыть"
        - клик по overlay (вне modal) закрывает, клик внутри modal — нет
        - Escape закрывает, если окно открыто
        - listener для Escape удобно вешать на document
    */
}
