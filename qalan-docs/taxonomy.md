# Qalan DS — Taxonomy

> Классификация дизайн-системы по 4 слоям.
> Источник: `inventory.md` (qalan-assets, commit d70c2eb), 18 июня 2026.
>
> **Правило границы:**
> фиксированный конечный API + самодостаточный → Component;
> композиция-рецепт под ситуацию, часто со слотом → Pattern;
> мельчайшая единица со своим состоянием → Control;
> значение / переменная / ассет → Foundations.

---

## Foundations

| Элемент | Node ID | Обоснование |
|---|---|---|
| Colors | `25:307` | Токены цвета — палитра + семантика (bg/text/border) |
| Typography | `1:243` | Токены типографики (display → caption, Halvar Mittelschrift) |
| Grid / Spacings / Radius | `2975:7588` | Токены отступов (2–64), радиусов (xs–xxl) |
| Icons (Untitled UI) | отдельный файл Icon pack (уточнить fileKey) | 1467 иконок (1197 лайн 24x24 + 266 флагов 100x100) — базовый визуальный ресурс |
| Emoji | отдельный файл Icon pack (уточнить fileKey) | 3961 эмодзи в 8 категориях — визуальный ресурс (сток-пак) |
| Brand / Logo | `89:898` | Брендовые ассеты (Light/Dark x Full/Short) + App icon `4164:6030` — не интерактивные |
| Character Image | `254:1461` | 23 персонажа x Level(1–4) x Locked — иллюстративный ассет, нет UI-состояний |
| State Icon | `3189:22153` | Иллюстративные иконки статусов (Success/Warning/.../Hero) — ассеты 100x100 и 168x250 |
| Resource Icon | `1283:6879` | Coin/Diamond/Point — визуальные ассеты ресурсов |

## Controls

| Элемент | Node ID | Обоснование |
|---|---|---|
| Button | `12:2263` | Атом — State(4) x Type(5) x Size(3) = 60 вариантов |
| Radio Button | `96:2273` | Атом — Size(S/M) x State(4) |
| Checkbox | `94:2005` | Атом — Size(S/M) x State(5) |
| Switch | `130:258` | Атом — On/Off x Disabled x Size(M/S) |
| Label | `3189:21959` | Атом — TextCase x Weight x Accent |
| Avatar | `181:820` | Атом — Type(5) x Size(5) = 25 вариантов |
| Badge | `1824:6613` | Атом — S12/M22 (внутри Bottom Navigation) |
| Character Badge | `6719:3640` | Атом — Type(New/Sale) x Size(L/M/S) |
| Character Label | `3189:21978` | Атом — 6 вариантов редкости (Common→Mythical) |
| Streak (огонёк) | `5242:2782` | Атом-индикатор — Off(9 сост.) / On(7 сост.) |
| Progress Bar | `916:24522` | Атом — Style=Default |
| Progress-button | `2837:11673` | Атом — Progress(1%/30%/90%/100%) |
| Dots Indicator | `905:10324` | Атом — набор точек-индикаторов |
| Scrollbar | `950:28783` | Атом — одиночный |
| Status Bar | `89:881` | Системный бар iOS — Background T/F |
| Keyboard iOS | `18:6027` | Системная клавиатура — Numeric/Text |
| Ability Button | `5663:3883` | Атом — Active/Disabled |
| Resource Button | `5328:2899` | Атом — Coin/Diamond/Combinated |
| League Button | `7713:1631` | Атом — Default/Duel |
| **Internal** | | |
| _Prefix *(internal)* | `19:6419` | Служебный слот (Icon/Text/Flag/Radio/Checkbox/Avatar) |
| _Suffix *(internal)* | `19:6426` | Служебный слот (Icon/Text/Switch/Count) |
| _Tab-component *(internal)* | `249:1527` | Служебный — 8 вариантов внутри Tabs |
| _Affix *(internal)* | `254:1517` | Служебный — Star/Icon/Avatar x Active внутри Tabs |
| _Pill-component *(internal)* | `1518:6514` | Служебный — Default/Active/Disabled внутри Pills |
| _Calendar day *(internal)* | `1300:16286` | Служебный — Current month x State внутри Date picker |
| _Progress-indicator *(internal)* | `90:529` | Служебный — Active T/F внутри Progress Bar |
| _Dot-indicator *(internal)* | `5065:4417` | Служебный — Active T/F внутри Dots Indicator |
| _Bottom-tab *(internal)* | `18:6189` | Служебный — State x Type внутри Bottom Navigation |
| Navigation Safe-area *(internal)* | `123:3777` | Служебная зона внутри Bottom Navigation |
| _Main page *(internal)* | `181:809` | Служебный — Role Student/Parent внутри Top Navigation |
| _Sub page *(internal)* | `4131:2242` | Служебный — Default/Trainer/Shop внутри Top Navigation |
| _Sticky-container *(internal)* | `4997:5054` | Служебный — контейнер внутри Top Navigation |
| _Trainer Keyboard-types *(internal)* | `891:5971` | Служебный — 5 раскладок клавиатуры |
| _Trainer Keyboard-section *(internal)* | `865:5856` | Служебный — Type(4) x Disabled |
| _Trainer Expanded-keys *(internal)* | `901:12699` | Служебный — 9 вариантов раскрытых клавиш |
| _Trainer Section-container *(internal)* | `865:5866` | Служебный — 5 типов контейнера секции |
| _Trainer Hearts *(internal)* | `1072:6088` | Служебный — Size(M/S) x State(Default/If loss) |
| _Trainer Fraction *(internal)* | `4906:5735` | Служебный — дробь |
| _Trainer Answer Row *(internal)* | `4800:5701` | Служебный — ряд ответа |
| _Trainer Answer Slot Radiobutton *(internal)* | — | Служебный — слот ответа (радио) |
| _Trainer Answer Slot Checkbox *(internal)* | — | Служебный — слот ответа (чекбокс) |
| _Trainer Answer Slot Text Field *(internal)* | `4800:5867` | Служебный — Layout(Stack/Grid) x Count(1/2/3/4+) |
| _Speech Bubble Time *(internal)* | — | Служебный — время внутри Speech Bubble |
| _Bubble Button *(internal)* | — | Служебный — Play/Stop/File внутри Speech Bubble |

## Components

| Элемент | Node ID | Обоснование |
|---|---|---|
| List Item | `94:829` | API: Type(4) x State, 21 вариант; потребляет _Prefix/_Suffix |
| List | `8776:16539` | Контейнер List Item'ов, самодостаточный |
| Dropdown | `4074:2087` | Самодостаточный компонент (одиночный) |
| Text Field | `19:6301` | API: Type(Text Field/Multiline) x State, 14 вариантов |
| Tabs | `494:477` | API: Type(Segmented/Underlined) x Size(M/S) |
| Pill (Pills) | `3393:6443` | Контейнер _Pill-component'ов |
| Date Picker | `3343:1853` | API: одиночный, потребляет _Calendar day |
| Divider | `3182:11814` | API: Emphasis(3) x Orientation(2). Принадлежит List, не Section |
| Section | — | API: UseLabel/UseBackground/LayoutType + контент-слот. Не в inventory, но часть ДС |
| Banner | `4975:6825` | API: Type(4) x Style(2) = 8 вариантов |
| Promo Banner | `439:4319` | API: Character/Default |
| Top Navigation | `7108:548` | API: Sub page(T/F) |
| Bottom Navigation | `306:4104` | API: Role(Student/Parent/Alternative) |
| CTA Dock | `3156:9870` | API: Layout(Single/Row/Column) |
| Chat Input Dock | `3162:10303` | API: State(Default/Typing) |
| State Screen | `7187:4459` | API: Type(Status/Edu success/Streak/Overlay) |
| Plan Selector | `7260:7914` | API: выбор тарифа |
| Plan Screen | `7466:7149` | API: Free/Optimum/Premium |
| Trainer Keyboard | `4765:9969` | API: Full view On/Off |
| Trainer Task Container | `915:14944` | Контейнер задания, самодостаточный |
| _Trainer Task Content Text | — | Контент-блок задания (текст) |
| _Trainer Task Content Fraction | — | Контент-блок задания (дробь) |
| _Trainer Task Content Text+Media | `4173:8485` | Контент-блок задания: Single/Stack/Grid |
| Trainer Block | `242:3056` | API: Role x Subscription x Link x Phase = 19 вариантов |
| Metric Icon | `242:4461` | API: Type(5) x State(Off/On/Frozen) = 15 |
| Metric Row | `7187:4324` | Самодостаточная строка метрик |
| Feature Row | `7325:10125` | Самодостаточная строка фич |
| Feature Icon | `7096:4177` | API: Type(8) x On/Off = 16 |
| Speech Bubble | `555:10752` | API: Author(2) x Type(8) = 16 |
| Video *(внутри Speech Bubble)* | — | Медиа-компонент |
| Character Card | `2433:7240` | API: Size(M/S) x State(5) = 10 |
| Character Full-view | `1161:7628` | Самодостаточный, одиночный |
| Streak Item | `6063:4522` | API: Empty/Done/Frozen/Locked/x2/x3 |
| Streak Report | `6408:2861` | API: Property 1=Default (переименовать проп) |
| Course Item | `5956:4867` | API: Free(5)/Optimum(5)/Trainer(4) = 14 |
| Course Card | `295:8915` | Самодостаточный, одиночный |
| Product Card | `7586:1903` | Самодостаточный, одиночный |
| Text Block | `18:5597` | Самодостаточный, одиночный |
| Leaderboard Top/Stage/List | — | API: Stage(Place 1-3 x Active) — в работе |
| Zone Status | — | Up/Downgrade — в работе |
| League's Trophy | — | Wooden/Iron/Bronze x On/Off — в работе |
| Trophy Row | — | Строка трофеев — в работе |

## Patterns

| Элемент | Node ID | Обоснование |
|---|---|---|
| Группа настроек | — | Рецепт: Section + List, варьируется по экрану |
| Карта знаний | — | Рецепт: композиция Course Item'ов, контекстуальна |
| Журнал (чат) | — | Рецепт: лента Speech Bubble'ов, макет чата |
| Пейволл | — | Рецепт: Plan Selector + Plan Screen + CTA Dock |
| Главная | — | Рецепт: Trainer Block + Streak + Metric Row + ... |
| Контрольная (Checkpoint) | — | Рецепт: Trainer-компоненты под контрольную сессию |
| Онбординг | — | Рецепт: экраны первого входа, вариативны |
| Streak-milestone | — | Рецепт: Streak + State Screen для юбилея серии |

---

## Mismatches

> Что в inventory лежит не в том слое или без категории.

| Элемент | Node ID | В inventory | По правилу | Причина |
|---|---|---|---|---|
| Dropdown | `4074:2087` | Без категории, «одиночный компонент на странице List Item» (аудит 10) | **Component** | Самодостаточный с фиксированным API |
| Section | — | Отсутствует в inventory | **Component** | Есть API: UseLabel/UseBackground/LayoutType + слот |
| Plan Screen | `7466:7149` | Перечислен рядом с Plan Selector без отдельной строки | **Component** | Фиксированный API (Free/Optimum/Premium) |
| Character Label | `3189:21978` | Перечислен в Content Blocks рядом с Character Card | **Control** | Мельчайшая единица — 6 текстовых вариантов редкости |
| Character Badge | `6719:3640` | Перечислен в Content Blocks | **Control** | Атом-бейдж (New/Sale x Size) |
| Streak | `5242:2782` | Перечислен в Content Blocks | **Control** | Атом-индикатор со состояниями, не собранный компонент |
| Banner | `4975:6825` | Перечислен в Controls / Navigation | **Component** | Фиксированный API: Type x Style, не атом |

## Debt

> Дубли, опечатки, мусор, аудит-флаги.

| # | Проблема | Node ID / контекст |
|---|---|---|
| A7 | Draft-Tenge (6 номиналов) и Draft-Checkbox picture — черновики живут в библиотеке | Страница List Item |
| A9 | Рабочий мусор: instance Radio `8325:3116`, Divider `6241:3099`, _Bottom-tab `8205:3595`, безымянные фреймы Logo | Разные канвасы |
| A15 | Streak Report: проп `Property 1` — дефолтное имя, переименовать в State/Type | `6408:2861` |
| A16 | Trainer Block (сет) вложен в док-фрейм «Модуль тренажера / State» — вынести на канвас | `242:3056` |
| A17 | Resource Icon: Type=Coin — кириллическая «С», ломает поиск | `1283:6879` |
| A18 | Character Image: `infernus` с маленькой буквы — единственный из 23 | `254:1461` |
| A19 | Мусор на Content Blocks: рас-компоненченные Character Badge `7453:*`, League's Trophy WIP, растры, пустой Frame `8012:2553`, 16 скрытых текстов у Feature Icon | `17:2449` |
| A20 | Superare → Super-rare исправлено; [old], Accuracy, Course/Card с пробелом — не обнаружены (вероятно вычищены) | — |
| A21 | Metric frozen-ассеты: Frozen-иконки в ДС есть, в репо PNG нет — доэкспортировать | Metric Icon |
| A22 | Спейсинг: голые имена «4»...«64» + дубль `Space/24` рядом с «24» | Foundations |
| A23 | Токен `Number` = 128 — назначение неизвестно | Foundations |
| A24 | Радиусы: голые xs/s/m/l/xl/xxl без namespace — конфликт имён с Size-пропами | Foundations |
| A25 | Neutral/100 #FFFFFF дублирует White/100% — два белых | Foundations |
| A28 | Два базовых компонента флагов: `_flagBase` и `_baseFlag` — слить | Icons |
| A30 | Дубль имени `colors` в Editor и Images | Icons |
| A31 | Безымянный `Frame 1`, пустая категория Gamification | Icons |
| A32 | Конвенция имён смешана: `Finance & eCommerce` vs `Maps_and_travel` | Icons |
| A33 | Emoji-пак 3961 шт целиком — балласт для библиотеки | Icons |
| A34 | Multiline help-text на шрифте Gerbera 12px вместо Halvar 14px | Text Field |
| A35 | Multiline/Focus: бордер `#ebeaec` мимо токена --border/focus | Text Field |
| A36 | Tabs/Underlined: `--text/placeholder` vs Segmented `--text/tertiary` для неактивного таба | Tabs |
| A38 | Label gap-токен `--p-sapce-200` — опечатка (sapce → space) | Label |
| — | Product Card ширина 163.5 — дробное значение | `7586:1903` |
| — | Streak Item: регистр x2/x3 не унифицирован | `6063:4522` |
| — | State Screen: в доке 3 типа с другими именами, в мастере 4 | `7187:4459` |
| — | CTA Dock Row/Column: семантика контринтуитивна (Row=вертикальная стопка), рекомендация: Stacked/Inline | `3156:9870` |

## Global refs

> При будущем разнесении компонентов по страницам:
>
> - **НЕ детачить инстансы** — все instance → master ссылки должны сохраняться.
> - **НЕ рвать ссылки** — перемещать component sets целиком (Move to page), не копировать + удалять.
> - **_Prefix / _Suffix** используются и в Text Field, и в List Item — при перемещении оба потребителя должны сохранять ссылку на один мастер.
> - **Внутренние компоненты** (_Tab-component, _Affix, _Calendar day и т.д.) перемещать вместе с родительским компонентом.
> - **Trainer-internal** (24 компонента с префиксом `_Trainer`) держать на одной странице с Trainer Keyboard и Trainer Task Container.
> - **Leaderboard-группа** (в работе) — дождаться финализации перед разнесением.
