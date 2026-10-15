# СЭС «Чистый Дом» — уничтожение насекомых в Москве

Одностраничный адаптивный сайт санитарной службы. Чистая вёрстка без фреймворков и внешних зависимостей.

## Структура

```
.
├── index.html      # семантическая разметка, SEO, Open Graph, JSON-LD
├── css/style.css   # дизайн-токены, Grid/Flexbox, адаптив 320–1920px
├── js/script.js    # маска телефона, валидация, эмуляция отправки
└── README.md
```

## Возможности

- **HTML5 + семантика**: `header`, `nav`, `main`, `section`, `figure`, `address`, `table` с `caption` и `scope`.
- **Доступность (WCAG 2.2 AA)**: skip-link, видимый фокус (`:focus-visible`), `aria-describedby`, `role="alert"`, `aria-live="polite"`, `aria-invalid`, контраст ≥ 4.5:1, тач-таргеты ≥ 48px, поддержка `prefers-reduced-motion`.
- **CSS без фреймворков**: custom properties, `clamp()`, CSS Grid и Flexbox, `prefers-color-scheme: dark`, `min()`/`max()`/`color-mix()`.
- **JavaScript vanilla**: маска `+7 (495) 123-45-56`, нормализация `8 → +7`, валидация имени (≥ 2 символа, только буквы/пробел/дефис) и телефона (11 цифр РФ), сообщение об успехе без реального запроса на сервер.
- **SEO**: `title`, `meta description`, Open Graph + Twitter Card, JSON-LD `LocalBusiness` (адрес, часы работы, гео, рейтинг).
- **Производительность**: 0 внешних запросов, inline SVG-плейсхолдеры вместо фото, `defer` для скрипта, иконка через data-URI.

## Запуск

Откройте `index.html` в браузере или поднимите статический сервер:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Адаптивность

Брейкпоинты: базовая (mobile-first) → 640px → 900px → 1440px. Проверено в диапазоне 320–1920px.

## Форма

Отправка эмулируется (`setTimeout`), данные никуда не передаются. Для продакшена подключите свой endpoint в обработчике `submit` в `js/script.js`.

## Лицензия

MIT
