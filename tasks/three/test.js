const sandbox = document.getElementById("sandbox");
const results_list = document.getElementById("results");
const summary = document.getElementById("summary");
const status_line = document.getElementById("status");
const rerun = document.getElementById("rerun");

rerun.addEventListener("click", () => {
    location.reload();
});

document.addEventListener("submit", (event) => {
    event.preventDefault();
}, true);

class AssertionError extends Error {}

function assert(cond, msg) {
    if (msg === undefined) {
        msg = "Assertion failed";
    }
    if (!cond) {
        throw new AssertionError(msg);
    }
}

function deep_eq(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a !== typeof b) {
        console.error("expected", typeof b, "got", typeof a);
        return false;
    }
    if (
        (typeof a == "string" || typeof a == "number") &&
        (typeof b == "string" || typeof b == "number")
    ) {
        console.error("expected", JSON.stringify(b), "got", JSON.stringify(a));
        return false;
    }
    if (typeof a === "boolean" || typeof b === "boolean") {
        console.error("expected", b, "got", a);
        return false;
    }
    if (typeof a !== "object") {
        console.error("expected", String(b), "got", String(a));
        return false;
    }
    if (a == null || b == null) {
        if (a == null) {
            console.error("expected", JSON.stringify(b), "got nothing");
        } else {
            console.error("expected nothing, got", JSON.stringify(b));
        }
        return false;
    }
    const a_keys = Object.keys(a).sort();
    const b_keys = Object.keys(b).sort();
    if (a_keys.length !== b_keys.length) {
        console.error("object structure is not as expected");
        return false;
    }
    for (let i = 0; i < a_keys.length; i++) {
        if (a_keys[i] !== b_keys[i]) {
            console.error("object structure is not as expected");
            return false;
        }
        if (!deep_eq(a[a_keys[i]], b[b_keys[i]])) {
            return false;
        }
    }
    return true;
}

function assert_eq(a, b, msg = "Wrong answer") { assert(deep_eq(a, b), msg); }

let passed = 0;
let failed = 0;

const TESTS = [
    ["1", "Карточка пользователя", test_1],
    ["2", "Счётчик", test_2],
    ["3", "Список задач", test_3],
    ["4", "Вкладки", test_4],
    ["5", "Модальное окно", test_5],
    ["6", "Валидация формы", test_6],
    ["7", "Корзина", test_7],
    ["8", "Таск-борд с фильтрами", test_8],
];

function update_summary() {
    const total = TESTS.length;
    const done = passed + failed;

    summary.textContent = `${passed} / ${total}`;

    if (done < total) {
        status_line.textContent = "Тесты выполняются…";
        return;
    }

    status_line.textContent = failed === 0
        ? "Все тесты прошли"
        : `Провалено ${failed} из ${total}`;
    status_line.classList.toggle("ok", failed === 0);
    status_line.classList.toggle("bad", failed !== 0);
}

async function test_file(name, title, fn) {
    const row = document.createElement("li");
    row.className = "test running";

    const label = document.createElement("span");
    label.className = "name";
    label.textContent = `${name}. ${title}`;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "…";

    row.append(label, badge);
    results_list.append(row);

    try {
        const solution = (await import(`./${name}.mjs`)).default;
        await fn(solution);
        passed++;
        row.classList.remove("running");
        row.classList.add("pass");
        badge.textContent = "PASS";
        console.log(`✔ PASS ${name}. ${title}`);
    } catch (e) {
        failed++;
        row.classList.remove("running");
        row.classList.add("fail");
        badge.textContent = "FAIL";

        const message = document.createElement("pre");
        message.textContent = e instanceof AssertionError
            ? e.message
            : (e.stack || String(e));
        row.append(message);

        console.error(`✘ FAIL ${name}. ${title}`, e);
    }

    update_summary();
    await new Promise((resolve) => setTimeout(resolve, 0));
}

function mount() {
    sandbox.replaceChildren();
    const root = document.createElement("div");
    sandbox.append(root);
    return root;
}

function one(root, selector, msg) {
    const element = root.querySelector(selector);
    assert(element !== null, msg || `не найден элемент ${selector}`);
    return element;
}

function all(root, selector) {
    return Array.from(root.querySelectorAll(selector));
}

function by_id(root, testid, id) {
    return one(root, `[data-testid="${testid}"][data-id="${id}"]`);
}

function text(element) {
    return element.textContent.trim();
}

function norm(element) {
    return element.textContent.replace(/\s+/g, " ").trim();
}

function click(element) {
    assert(element, "нечего нажимать: элемент не найден");
    element.click();
}

function type(input, value) {
    input.value = value;
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
}

function submit(form) {
    form.requestSubmit();
}

function press_enter(input, form) {
    const event = new window.KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        cancelable: true,
    });
    const not_prevented = input.dispatchEvent(event);
    if (not_prevented) {
        form.requestSubmit();
    }
}

function is_visible(element) {
    if (element.hidden) {
        return false;
    }
    for (let node = element; node && node.nodeType === 1; node = node.parentElement) {
        if (node.hidden) {
            return false;
        }
        if (node.style && (node.style.display === "none" || node.style.visibility === "hidden")) {
            return false;
        }
    }
    return true;
}

function visible_tasks(root) {
    return all(root, '[data-testid="task"]').filter(is_visible);
}

async function test_1(solution) {
    const root = mount();
    solution(root, { name: "Илья", age: 20, city: "Казань" });

    const card = one(root, '[data-testid="card"]');
    assert(card.classList.contains("card"), 'у карточки должен быть класс "card"');
    assert(card.classList.contains("adult"), 'для age >= 18 нужен класс "adult"');
    assert(!card.classList.contains("minor"), 'для age >= 18 не должно быть класса "minor"');
    assert_eq(text(one(root, '[data-testid="name"]')), "Илья");
    assert_eq(text(one(root, '[data-testid="age"]')), "Возраст: 20");
    assert_eq(text(one(root, '[data-testid="city"]')), "Город: Казань");
    assert_eq(text(one(root, '[data-testid="status"]')), "Совершеннолетний");

    const minor_root = mount();
    solution(minor_root, { name: "Петя", age: 17, city: "Москва" });
    const minor_card = one(minor_root, '[data-testid="card"]');
    assert(minor_card.classList.contains("card"), 'у карточки должен быть класс "card"');
    assert(minor_card.classList.contains("minor"), 'для age < 18 нужен класс "minor"');
    assert(!minor_card.classList.contains("adult"), 'для age < 18 не должно быть класса "adult"');
    assert_eq(text(one(minor_root, '[data-testid="status"]')), "Несовершеннолетний");

    const xss_root = mount();
    solution(xss_root, {
        name: "<b>Илья</b>",
        age: 18,
        city: "<script>alert(1)</script>",
    });
    const name = one(xss_root, '[data-testid="name"]');
    const city = one(xss_root, '[data-testid="city"]');
    assert_eq(text(name), "<b>Илья</b>", "имя должно вставляться через textContent");
    assert_eq(name.children.length, 0, "имя не должно превращаться в HTML-элементы");
    assert_eq(text(city), "Город: <script>alert(1)</script>", "город должен вставляться через textContent");
    assert_eq(city.children.length, 0, "город не должен превращаться в HTML-элементы");
}

async function test_2(solution) {
    const root = mount();
    solution(root);

    one(root, '[data-testid="counter"]');
    const value = one(root, '[data-testid="value"]');
    const decrement = one(root, '[data-testid="decrement"]');
    const increment = one(root, '[data-testid="increment"]');
    const reset = one(root, '[data-testid="reset"]');

    assert_eq(text(value), "0", "счётчик должен начинаться с 0");
    assert(decrement.disabled, 'кнопка "−" должна быть disabled при 0');

    click(increment);
    click(increment);
    click(increment);
    assert_eq(text(value), "3");
    assert(!decrement.disabled, 'кнопка "−" должна включиться, когда значение > 0');

    click(decrement);
    assert_eq(text(value), "2");

    click(reset);
    assert_eq(text(value), "0");
    assert(decrement.disabled, 'после сброса "−" снова disabled');

    click(decrement);
    assert_eq(text(value), "0", "счётчик не должен уходить в минус");

    click(increment);
    assert_eq(text(value), "1");
}

async function test_3(solution) {
    const root = mount();
    solution(root);

    const form = () => one(root, '[data-testid="form"]');
    const input = () => one(root, '[data-testid="input"]');
    const add = () => one(root, '[data-testid="add"]');
    const list = () => one(root, '[data-testid="list"]');
    const count = () => one(root, '[data-testid="count"]');
    const item = (index) => list().children[index];

    assert_eq(text(count()), "0");
    assert_eq(list().children.length, 0);

    type(input(), "Купить хлеб");
    submit(form());
    assert_eq(list().children.length, 1, "после submit должна появиться одна задача");
    assert_eq(text(one(item(0), '[data-testid="text"]')), "Купить хлеб");
    assert_eq(text(count()), "1");
    assert_eq(input().value, "", "после добавления input должен очищаться");

    type(input(), "Помыть посуду");
    click(add());
    assert_eq(list().children.length, 2, 'кнопка "Добавить" должна отправлять форму');
    assert_eq(text(one(item(1), '[data-testid="text"]')), "Помыть посуду");

    type(input(), "   ");
    submit(form());
    assert_eq(list().children.length, 2, "пустая задача не должна добавляться");

    click(one(item(0), '[data-testid="delete"]'));
    assert_eq(list().children.length, 1, 'кнопка "Удалить" должна убирать задачу');
    assert_eq(text(one(item(0), '[data-testid="text"]')), "Помыть посуду");
    assert_eq(text(count()), "1");

    type(input(), '<img src=x onerror="alert(1)">');
    submit(form());
    const xss_text = one(item(1), '[data-testid="text"]');
    assert_eq(text(xss_text), '<img src=x onerror="alert(1)">', "текст задачи вставляй через textContent");
    assert_eq(xss_text.children.length, 0, "текст задачи не должен превращаться в HTML-элементы");

    type(input(), "Через Enter");
    press_enter(input(), form());
    assert_eq(list().children.length, 3, "Enter в input должен добавлять задачу");
    assert_eq(text(one(item(2), '[data-testid="text"]')), "Через Enter");
    assert_eq(text(count()), "3");
}

async function test_4(solution) {
    const tabs = [
        { title: "Первый", content: "Содержимое 1" },
        { title: "Второй", content: "Содержимое 2" },
        { title: "Третий", content: "Содержимое 3" },
    ];

    const root = mount();
    solution(root, tabs);

    const tablist = one(root, '[role="tablist"]');
    let buttons = all(root, '[data-testid="tab"]');
    let panels = all(root, '[data-testid="panel"]');

    assert_eq(buttons.length, 3);
    assert_eq(panels.length, 3);
    for (let i = 0; i < 3; i++) {
        assert_eq(text(buttons[i]), tabs[i].title);
        assert_eq(text(panels[i]), tabs[i].content);
        assert_eq(buttons[i].getAttribute("role"), "tab");
        assert_eq(panels[i].getAttribute("role"), "tabpanel");
        assert(tablist.contains(buttons[i]), "вкладка должна лежать внутри tablist");
    }

    assert(buttons[0].classList.contains("active"), "первая вкладка должна быть активной");
    assert_eq(buttons[0].getAttribute("aria-selected"), "true");
    assert_eq(buttons[1].getAttribute("aria-selected"), "false");
    assert(!panels[0].hidden, "первая панель должна быть видна");
    assert(panels[1].hidden, "вторая панель должна быть скрыта");
    assert(panels[2].hidden, "третья панель должна быть скрыта");
    assert_eq(all(root, '[data-testid="tab"]').filter((b) => b.classList.contains("active")).length, 1);

    click(buttons[2]);
    buttons = all(root, '[data-testid="tab"]');
    panels = all(root, '[data-testid="panel"]');
    assert(buttons[2].classList.contains("active"), "кликнутая вкладка должна стать активной");
    assert(!buttons[0].classList.contains("active"), "старая вкладка не должна оставаться активной");
    assert_eq(buttons[2].getAttribute("aria-selected"), "true");
    assert_eq(buttons[0].getAttribute("aria-selected"), "false");
    assert(panels[0].hidden);
    assert(panels[1].hidden);
    assert(!panels[2].hidden, "должна показываться только панель активной вкладки");

    click(buttons[1]);
    buttons = all(root, '[data-testid="tab"]');
    panels = all(root, '[data-testid="panel"]');
    assert(buttons[1].classList.contains("active"));
    assert(!panels[1].hidden);
    assert(panels[0].hidden);
    assert(panels[2].hidden);

    const xss_root = mount();
    solution(xss_root, [{ title: "<b>Заголовок</b>", content: "<i>Текст</i>" }]);
    const xss_title = one(xss_root, '[data-testid="tab"]');
    const xss_panel = one(xss_root, '[data-testid="panel"]');
    assert_eq(text(xss_title), "<b>Заголовок</b>", "title вставляй через textContent");
    assert_eq(xss_title.children.length, 0);
    assert_eq(text(xss_panel), "<i>Текст</i>", "content вставляй через textContent");
    assert_eq(xss_panel.children.length, 0);
}

// --- 5. Модальное окно --------------------------------------------------

async function test_5(solution) {
    const root = mount();
    solution(root);

    const open = one(root, '[data-testid="open"]');
    const overlay = one(root, '[data-testid="overlay"]');
    const modal = one(root, '[data-testid="modal"]');
    const close = one(root, '[data-testid="close"]');

    assert_eq(overlay.getAttribute("role"), "dialog");
    assert_eq(overlay.getAttribute("aria-modal"), "true");
    assert(overlay.hidden, "модальное окно должно быть скрыто изначально");

    click(open);
    assert(!overlay.hidden, 'по кнопке "Открыть" окно должно показываться');
    assert(document.activeElement === close, 'фокус должен перейти на кнопку "Закрыть"');

    click(modal);
    assert(!overlay.hidden, "клик внутри modal не должен закрывать окно");

    document.activeElement.dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    assert(overlay.hidden, "Escape должен закрывать окно");
    assert(document.activeElement === open, 'фокус должен вернуться на кнопку "Открыть"');

    click(open);
    assert(!overlay.hidden);
    click(overlay);
    assert(overlay.hidden, "клик по overlay должен закрывать окно");

    click(open);
    click(close);
    assert(overlay.hidden, 'кнопка "Закрыть" должна закрывать окно');
    assert(document.activeElement === open, 'фокус должен вернуться на "Открыть"');
}

// --- 6. Валидация формы -------------------------------------------------

async function test_6(solution) {
    const root = mount();
    solution(root);

    const form = one(root, '[data-testid="form"]');
    const email = one(root, '[data-testid="email"]');
    const email_error = one(root, '[data-testid="email-error"]');
    const password = one(root, '[data-testid="password"]');
    const password_error = one(root, '[data-testid="password-error"]');
    const submit_button = one(root, '[data-testid="submit"]');
    const success = one(root, '[data-testid="success"]');

    assert(submit_button.disabled, "submit должен быть disabled изначально");
    assert(email_error.hidden, "ошибки email быть не должно");
    assert(password_error.hidden, "ошибки пароля быть не должно");
    assert(success.hidden, "success должен быть скрыт изначально");
    assert_eq(text(success), "Добро пожаловать!");

    type(email, "bad");
    assert(!email_error.hidden, "для невалидного email должна показываться ошибка");
    assert(text(email_error).length > 0, "текст ошибки не должен быть пустым");
    assert(submit_button.disabled);

    type(email, "");
    assert(email_error.hidden, "у пустого поля не должно быть ошибки");

    type(email, "user@example");
    assert(!email_error.hidden, "email без точки после @ невалиден");

    type(email, "user@example.com");
    assert(email_error.hidden, "валидный email не должен показывать ошибку");
    assert(submit_button.disabled, "без пароля submit должен оставаться disabled");

    type(password, "1234567");
    assert(!password_error.hidden, "пароль короче 8 символов невалиден");
    assert(submit_button.disabled);

    type(password, "abcdefgh");
    assert(!password_error.hidden, "пароль без цифр невалиден");
    assert(submit_button.disabled);

    type(password, "abcdefg1");
    assert(password_error.hidden, "валидный пароль не должен показывать ошибку");
    assert(!submit_button.disabled, "при валидных полях submit должен включиться");

    click(submit_button);
    assert(form.hidden, "после успешной отправки форма должна скрыться");
    assert(!success.hidden, "после успешной отправки должен показаться success");
}

// --- 7. Корзина ---------------------------------------------------------

async function test_7(solution) {
    const products = [
        { id: 1, name: "Хлеб", price: 50 },
        { id: 2, name: "Молоко", price: 80 },
        { id: 3, name: "Сыр", price: 300 },
    ];

    const root = mount();
    solution(root, products);

    one(root, '[data-testid="cart"]');
    const list = one(root, '[data-testid="list"]');
    const total = one(root, '[data-testid="total"]');
    let items = all(root, '[data-testid="item"]');

    assert_eq(items.length, 3);
    assert_eq(items[0].dataset.id, "1");
    assert_eq(text(one(items[0], '[data-testid="name"]')), "Хлеб");
    assert_eq(norm(one(items[0], '[data-testid="price"]')), "50 ₽");
    assert_eq(text(one(items[1], '[data-testid="name"]')), "Молоко");
    assert_eq(norm(one(items[1], '[data-testid="price"]')), "80 ₽");
    assert_eq(text(one(items[2], '[data-testid="name"]')), "Сыр");
    assert_eq(norm(one(items[2], '[data-testid="price"]')), "300 ₽");
    assert_eq(norm(total), "Итого: 0 ₽");
    one(list, '[data-testid="item"]');

    const qty = (id) => one(by_id(root, "item", id), '[data-testid="qty"]');
    const plus = (id) => one(by_id(root, "item", id), '[data-testid="plus"]');
    const minus = (id) => one(by_id(root, "item", id), '[data-testid="minus"]');

    for (const id of [1, 2, 3]) {
        assert_eq(text(qty(id)), "0");
        assert(minus(id).disabled, 'при количестве 0 кнопка "−" должна быть disabled');
    }

    click(plus(1));
    click(plus(1));
    assert_eq(text(qty(1)), "2");
    assert(!minus(1).disabled);
    assert_eq(norm(total), "Итого: 100 ₽");

    click(plus(2));
    assert_eq(text(qty(2)), "1");
    assert_eq(norm(total), "Итого: 180 ₽");

    click(minus(1));
    assert_eq(text(qty(1)), "1");
    assert_eq(norm(total), "Итого: 130 ₽");

    click(minus(2));
    assert_eq(text(qty(2)), "0");
    assert(minus(2).disabled, 'после уменьшения до 0 кнопка "−" должна стать disabled');
    assert_eq(norm(total), "Итого: 50 ₽");

    click(minus(2));
    assert_eq(text(qty(2)), "0", "количество не должно уходить в минус");
    assert_eq(norm(total), "Итого: 50 ₽");

    const xss_root = mount();
    solution(xss_root, [{ id: 7, name: '<img src=x onerror="alert(1)">', price: 10 }]);
    const xss_name = one(xss_root, '[data-testid="name"]');
    assert_eq(text(xss_name), '<img src=x onerror="alert(1)">', "name вставляй через textContent");
    assert_eq(xss_name.children.length, 0, "name не должен превращаться в HTML-элементы");
    assert_eq(norm(one(xss_root, '[data-testid="total"]')), "Итого: 0 ₽");
}

// --- 8. Таск-борд -------------------------------------------------------

function task_title(task) {
    return text(one(task, '[data-testid="title"]'));
}

function set_filter(root, name) {
    click(one(root, `[data-testid="filter-${name}"]`));
}

async function test_8(solution) {
    const initial = [
        { id: 1, title: "Сделать зарядку", done: true },
        { id: 2, title: "Написать код", done: false },
        { id: 3, title: "Погулять", done: true },
    ];

    // Начальная отрисовка
    let root = mount();
    solution(root, initial);

    assert_eq(visible_tasks(root).length, 3);
    assert_eq(task_title(by_id(root, "task", 1)), "Сделать зарядку");
    assert_eq(task_title(by_id(root, "task", 2)), "Написать код");
    assert_eq(task_title(by_id(root, "task", 3)), "Погулять");
    assert(by_id(root, "task", 1).classList.contains("done"), "у выполненной задачи нужен класс done");
    assert(!by_id(root, "task", 2).classList.contains("done"));
    assert(by_id(root, "task", 3).classList.contains("done"));
    assert(one(by_id(root, "task", 1), '[data-testid="toggle"]').checked === true, "чекбокс выполненной задачи должен быть checked");
    assert(one(by_id(root, "task", 2), '[data-testid="toggle"]').checked === false, "чекбокс активной задачи не должен быть checked");
    assert_eq(text(one(root, '[data-testid="remaining"]')), "1");
    assert(one(root, '[data-testid="empty"]').hidden, "при наличии задач empty должен быть скрыт");
    assert(!one(root, '[data-testid="clear-completed"]').disabled);
    assert(one(root, '[data-testid="filter-all"]').classList.contains("active"), 'по умолчанию активен фильтр "Все"');

    // Фильтры
    set_filter(root, "active");
    assert_eq(visible_tasks(root).length, 1);
    assert_eq(task_title(visible_tasks(root)[0]), "Написать код");
    assert(one(root, '[data-testid="filter-active"]').classList.contains("active"));
    assert(!one(root, '[data-testid="filter-all"]').classList.contains("active"));
    assert_eq(text(one(root, '[data-testid="remaining"]')), "1", "remaining не зависит от фильтра");

    set_filter(root, "completed");
    assert_eq(visible_tasks(root).length, 2);
    assert_eq(visible_tasks(root).map(task_title), ["Сделать зарядку", "Погулять"]);
    assert(one(root, '[data-testid="filter-completed"]').classList.contains("active"));

    set_filter(root, "all");
    assert_eq(visible_tasks(root).length, 3);
    assert(one(root, '[data-testid="filter-all"]').classList.contains("active"));

    // Переключение done
    root = mount();
    solution(root, initial);
    click(one(by_id(root, "task", 2), '[data-testid="toggle"]'));
    assert(one(by_id(root, "task", 2), '[data-testid="toggle"]').checked === true, "чекбокс должен стать checked после клика");
    assert(by_id(root, "task", 2).classList.contains("done"));
    assert_eq(text(one(root, '[data-testid="remaining"]')), "0");
    assert(!one(root, '[data-testid="clear-completed"]').disabled);

    set_filter(root, "active");
    assert_eq(visible_tasks(root).length, 0, "выполненная задача не должна попадать в активные");
    assert(!one(root, '[data-testid="empty"]').hidden, "при пустом фильтре empty должен показываться");
    assert_eq(text(one(root, '[data-testid="empty"]')), "Нет задач");

    set_filter(root, "completed");
    assert_eq(visible_tasks(root).length, 3);
    click(one(by_id(root, "task", 2), '[data-testid="toggle"]'));
    assert_eq(visible_tasks(root).length, 2, "снятая галочка должна убрать задачу из выполненных");
    assert_eq(text(one(root, '[data-testid="remaining"]')), "1");
    assert(one(root, '[data-testid="empty"]').hidden);

    // Добавление задач
    root = mount();
    solution(root, [{ id: 5, title: "Старая", done: false }]);
    assert(one(root, '[data-testid="empty"]').hidden);

    const input = () => one(root, '[data-testid="input"]');
    const form = () => one(root, '[data-testid="form"]');
    const add = () => one(root, '[data-testid="add"]');

    type(input(), "  Новая задача  ");
    click(add());
    assert_eq(visible_tasks(root).length, 2);
    assert_eq(task_title(visible_tasks(root)[1]), "Новая задача");
    assert_eq(visible_tasks(root)[1].dataset.id, "6", "id новой задачи = max(id) + 1");
    assert_eq(text(one(root, '[data-testid="remaining"]')), "2");
    assert_eq(input().value, "", "после добавления input должен очищаться");
    assert(one(root, '[data-testid="empty"]').hidden);

    type(input(), "Через Enter");
    press_enter(input(), form());
    assert_eq(visible_tasks(root).length, 3, "Enter в input должен добавлять задачу");
    assert_eq(task_title(visible_tasks(root)[2]), "Через Enter");

    type(input(), "   ");
    press_enter(input(), form());
    assert_eq(visible_tasks(root).length, 3, "пустая задача не должна добавляться");

    set_filter(root, "completed");
    assert_eq(visible_tasks(root).length, 0);
    assert(!one(root, '[data-testid="empty"]').hidden);

    type(input(), "Скрытая");
    click(add());
    assert_eq(visible_tasks(root).length, 0, "новая активная задача не должна попадать в выполненные");
    assert(!one(root, '[data-testid="empty"]').hidden);
    assert_eq(text(one(root, '[data-testid="remaining"]')), "4");

    set_filter(root, "all");
    assert_eq(visible_tasks(root).length, 4);
    assert_eq(visible_tasks(root)[3].dataset.id, "8");
    assert_eq(task_title(visible_tasks(root)[3]), "Скрытая");

    // Пустой старт
    root = mount();
    solution(root, []);
    assert_eq(text(one(root, '[data-testid="remaining"]')), "0");
    assert(!one(root, '[data-testid="empty"]').hidden, "на пустом борде empty должен быть виден");
    assert(one(root, '[data-testid="clear-completed"]').disabled, "без выполненных задач clear должен быть disabled");
    assert_eq(visible_tasks(root).length, 0);

    // Удаление и очистка выполненных
    root = mount();
    solution(root, [
        { id: 1, title: "A", done: true },
        { id: 2, title: "B", done: false },
        { id: 3, title: "C", done: true },
    ]);

    click(one(by_id(root, "task", 2), '[data-testid="delete"]'));
    assert_eq(visible_tasks(root).length, 2, 'кнопка "Удалить" должна убирать задачу');
    assert_eq(text(one(root, '[data-testid="remaining"]')), "0");
    assert(!one(root, '[data-testid="clear-completed"]').disabled);

    click(one(by_id(root, "task", 1), '[data-testid="delete"]'));
    assert_eq(visible_tasks(root).length, 1);
    assert(!one(root, '[data-testid="clear-completed"]').disabled);

    click(one(root, '[data-testid="clear-completed"]'));
    assert_eq(visible_tasks(root).length, 0);
    assert(!one(root, '[data-testid="empty"]').hidden);
    assert(one(root, '[data-testid="clear-completed"]').disabled, "после очистки clear должен стать disabled");

    // XSS в названии задачи
    root = mount();
    solution(root, [{ id: 1, title: '<img src=x onerror="alert(1)">', done: false }]);
    const xss_title = one(by_id(root, "task", 1), '[data-testid="title"]');
    assert_eq(text(xss_title), '<img src=x onerror="alert(1)">', "title вставляй через textContent");
    assert_eq(xss_title.children.length, 0, "title не должен превращаться в HTML-элементы");
}

// --- Запуск -------------------------------------------------------------

(async () => {
    document.documentElement.dataset.tests = "running";
    update_summary();

    for (const [name, title, fn] of TESTS) {
        await test_file(name, title, fn);
    }

    document.documentElement.dataset.tests = "done";
    document.documentElement.dataset.passed = String(passed);
    document.documentElement.dataset.failed = String(failed);
    update_summary();

    if (failed === 0) {
        console.log(`Все тесты прошли: ${passed}/${TESTS.length}`);
    } else {
        console.log(`Провалено ${failed} из ${TESTS.length}`);
    }
})();
