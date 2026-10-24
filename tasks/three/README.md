# Задания третьего блока (DOM)

В этом блоке учимся работать с DOM

## Как запускать

```bash
npm run dev
```

В консоли появится адрес:

```text
http://localhost:5173/
```

Откройте его в браузере — тесты запустятся автоматически. Результаты будут на странице,
подробности — в консоли браузера

## Правила

- Каждое задание — отдельный файл `1.mjs`, `2.mjs`, ... с `export default function`.
- В функцию первым аргументом приходит `root` — пустой `div`, который уже есть в документе. Всё, что нужно, создавайте внутри него.
- Элементы, которые ищут тесты, помечены `data-testid="..."`. Эти атрибуты менять нельзя.

## Полезные ссылки

- [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [События клавиатуры](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
