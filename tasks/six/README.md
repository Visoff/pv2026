# Задание

Подключить фронтенд к бэкенду.

Сейчас фронтенд хранит список в локальном состоянии и не обращается к API.
Бэкенд уже готов, менять его не нужно.

Что нужно сделать:
1. Запустить бэкенд и фронтенд.
2. Заменить локальные операции в `frontend/src/App.jsx` на `fetch`-запросы.
3. Проверить добавление, переименование и удаление элементов.

# Запуск проекта

Бэкенд:

```bash
cd backend
./mvnw spring-boot:run
```

Фронтенд:

```bash
cd frontend
npm install
npm run dev
```

По умолчанию:
Фронтенд: http://localhost:5173  
Бэкенд: http://localhost:8080

# API

Элемент: `{"id": 1, "name": "..."}`.

| Метод  | Путь              | Тело              |
| ------ | ----------------- | ----------------- |
| GET    | `/api/items`      | —                 |
| POST   | `/api/items`      | `{"name": "..."}` |
| PUT    | `/api/items/{id}` | `{"name": "..."}` |
| DELETE | `/api/items/{id}` | —                 |


# Подсказка
(приятнее додуматься самому, но подсмотреть не стыдно)

Запросы с фронтенда на бекенд отправляются по HTTP, для этого проще всего использовать `fetch`

```js
fetch("http://localhost:8080/api/items")
    .then(res => res.json())
    .then(items => {
        ...
    })
```

```js
fetch("http://localhost:8080/api/items", {
    method: "POST",
    body: JSON.stringify({name: "some name"})
})
```

Иногда(для удобства) `fetch` используют в контексте `async/await`

```js
async function something() {
    const response = await fetch("http://localhost:8080/api/items")
    const items = await response.json()
}
```

Асинхронную функцию можно запустить без обработки возвращаемого Promis'а
Стрелочные функции могут быть асинхронными
Те для запуска некого асинхронного блока можно использовать

```js
// async () => {}    -> функция, её надо вызвать
(async () => {})()
```
