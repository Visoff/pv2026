/**
    * @param {HTMLElement} root
*/
export default function (root) {
    /*
        На входе: пустой div
        На выходе: форма входа:

        <form data-testid="form">
            <input data-testid="email" type="email">
            <span data-testid="email-error" hidden></span>
            <input data-testid="password" type="password">
            <span data-testid="password-error" hidden></span>
            <button data-testid="submit" type="submit" disabled>Войти</button>
        </form>
        <div data-testid="success" hidden>Добро пожаловать!</div>

        Правила:
        - email валиден, если похож на "что-то@что-то.что-то"
        - пароль валиден, если длина >= 8 и есть хотя бы одна цифра
        - на каждое событие input пересчитывай форму:
            * submit disabled, пока хотя бы одно поле невалидно
            * ошибка поля показывается (hidden = false), только если поле
              непустое и невалидное; у пустого поля ошибки нет
        - при submit: preventDefault, форма скрывается (hidden = true),
          success показывается (hidden = false)
        - текст ошибок любой, но непустой
    */
}
