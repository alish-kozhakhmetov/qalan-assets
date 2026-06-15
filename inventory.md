# Qalan DS — Инвентарь (Фаза 0)

> Источник: обход DS `kplQ9O09pktrTZYzsihSrr` через Figma MCP, 13 июня 2026.
> ✅ снято · ⬜ в очереди

## Карта страниц
Foundations: Grid/spacings/radius `2975:7588` ⬜ · Colors `25:307` ⬜ · Typography `1:243` ⬜ (фаза 1, через get_variable_defs)
Controls: все ✅ (ниже) · Блоки: Content Blocks `17:2449` ⬜ · Trainer Blocks `7325:8125` ⬜ · Style guide `1:16` ⬜ · Archive `2882:6945` —

## Компоненты (Controls / Navigation)

| Компонент | Сет | Пропы | Вариантов | Внутренние |
|---|---|---|---|---|
| Button | 12:2263 | State(4) × Type(Primary/Secondary/Tertiary/Text/Text-critical) × Size(L58/M40/S30) | 60/60 ✅ | — |
| Tabs | 494:477 | Type(Segmented/Underlined) × Size(M/S) | 4 | _Tab-component 249:1527 (8), _Affix 254:1517 (Star/Icon/Avatar × Active) |
| Text field | 19:6301 | Type(Text Field/Multiline) × State | 8+6=14 | _Prefix 19:6419 (Icon/Text/Flag/Radio Button/Checkbox/Avatar), _Suffix 19:6426 (Icon/Text/Switch/Count) |
| Pill | 3393:6443 | одиночный `Pills` | 1 | _Pill-component 1518:6514 (Default/Active/Disabled) |
| Radio Button | 96:2273 | Size(S/M) × State(Default/Hover/Checked/Disabled) | 8 | — |
| Checkbox | 94:2005 | Size(S/M) × State(Default/Hover/Checked/Indeterminate/Disabled) | 10 | — |
| Switch | 130:258 | State(On/Off) × Disabled(T/F) × Size(M/S) | 8/8 ✅ | — |
| List Item | 94:829 | Type(Checkbox/Radio Button/Navigation/Profile) × State | 21 (CB/RB/Nav по 6: Default/Pressed/Disabled/Active/Success/Error; Profile 3: без Active/Success/Error) | потребляет _Prefix/_Suffix из Text field |
| Date picker | 3343:1853 | одиночный | 1 | _Calendar day 1300:16286 (Current month × Default/Hover/Selected/Disabled) |
| Label | 3189:21959 | Text Case(Upper/Standard) × Weight(Reg/Bold) × Accent(T/F) | 8/8 ✅ | — |
| Progress Bar | 916:24522 | Style=Default | 1 | _Progress-indicator 90:529 (Active T/F) |
| Progress-button | 2837:11673 | Progress(1%/30%/90%/100%) | 4 | — |
| Divider | 3182:11814 | Emphasis(Strong/Middle/Subtle) × Orientation(H/V) | 6/6 ✅ | — |
| Keyboard iOS | 18:6027 | Slot(Numeric/Text) | 2 | — |
| Scrollbar | 950:28783 | одиночный | 1 | — |
| State icon | 3189:22153 | Success/Warning/Error/Info/Neutral/Brand/Ability + Hero success/failed/offline | 10 | Hero — 168×250, остальные 100×100 |
| Avatar | 181:820 | Type(Default/Initial/Character/Student/Parent) × Size(XS24/S32/M40/L52/XL80) | 25/25 ✅ | — |
| Banner | 4975:6825 | Type(Info/Error/Warning/Neutral) × Style(Default/Playful) | 8/8 ✅ | — |
| Status Bar | 89:881 | Background(T/F), 375×52 | 2 | — |
| Top Navigation | 7108:548 | Sub page(T/F), 108px | 2 | _Main page 181:809 (Role Student/Parent), _Sub page 4131:2242 (Default/Trainer/Shop), _Sticky-container 4997:5054 |
| Bottom Navigation | 306:4104 | Role(Student/Parent/Alternative) | 3 | _Bottom-tab 18:6189 (State×Type Text only/Text+Icon), Badge 1824:6613 (S12/M22), Navigation Safe-area 123:3777 |
| CTA Dock | 3156:9870 | Layout(Single 82/Row 152/Column 82) | 3 | ⚠️ см. аудит 8 |
| Chat Input Dock | 3162:10303 | State(Default/Typing) | 2 | — |
| Dots Indicator | 905:10324 | одиночный | 1 | _Dot-indicator 5065:4417 (Active T/F) |
| Brand/Logo | 89:898 | Theme(Light/Dark) × Variant(Full/Short) | 4 | + App icon 4164:6030 (Default/Full) |

## Аудит-лист

1. **Prize banner не существует в ДС** — на экранах россыпь автолейаута. Кандидат в Content Blocks.
2. **Text field / Multiline без ReadOnly и Error** (у Text Field 8 состояний, у Multiline 6). Осознанно?
3. **_Prefix уже содержит Type=Radio Button и Checkbox** — фолдинг, отложенный для List Item, в донорах сделан. Проверить потребителей.
4. **Hover в мобильной ДС**: Text field, Radio, Checkbox, _Calendar day. Тач-платформа — Hover мёртвый груз или задел под веб?
5. **List Item: высоты вариантов** — Navigation 78, Profile 76, CB/RB 58. Nav vs Profile 2px — проверить, осознанно ли.
6. **List Item / Profile** без Active/Success/Error — асимметрия с остальными типами.
7. **Секция «Переделать» на странице List Item**: Draft-Tenge (6 номиналов 500–20 000) и Draft-Checkbox picture — черновики живут в библиотеке.
8. **CTA Dock: Row=152px, Column=82px** — ✅ РЕШЕНО (сверено 13.06): имена НЕ перепутаны в файле, но семантика контринтуитивна. `Row` = кнопки каждая на своей строке (вертикальная стопка brand+secondary) → 152px. `Column` = кнопки колонками в один ряд (secondary|brand) → 82px. Single → 82px. Рекомендация: переименовать в Stacked/Inline (или Vertical/Horizontal) — «Row» для вертикали сбивает.
9. **Рабочий мусор на канвасах**: instance Radio Button `8325:3116`, instance Divider `6241:3099`, instance _Bottom-tab `8205:3595`, два безымянных фрейма Logo на App Icon.
10. **Dropdown-list `4074:2087`** — одиночный компонент на странице List Item, без вариантов и категории.
11. **Banner/Invite from parent** (решение от 08.05) на странице Banner отсутствует — либо не создан, либо в Content Blocks. Проверить при обходе.
12. Из CHANGELOG (проверить на месте в Content Blocks): Superare-опечатка, 4× [old], Accuracy, Course / Card с пробелом, lineHeight 100, border/hack_do-not-implement.

### Партия 2 — навигация (находки при пересборке 13.06)

13. **Status Bar высота 52, не 44** — мастер 89:881 = 52px (совпадает с ASSETS.md). Легаси `.statusbar` в каркасе = 44px (черновой слой из прототипа). Пересборка `.sbar` идёт на 52; легаси не трогаю — его держат старые секции kit. При переходе экранов на новый каркас заменить 44→52.
14. **TrainerHearts (Top Nav / Sub page=Trainer)** — глиф сердца-жизни (мастер 914:14844/914:14851) НЕ в репо icons/. Собрано инлайн-плейсхолдером, заливка = brand blue (предположение, т.к. число белое). ⚠ подтвердить цвет + экспортнуть PNG для пиксель-перфекта.
15. **Аватар Student (Top Nav / _Main)** — мастер 181:809 показывает фото (Avatar Type=Character/Student). Фото-ассета в репо нет → в витрине стоит Avatar Type=Initial («А»). Не баг DS, а пробел ассетов витрины. Экспорт по желанию.
16. **Иконка ⚡ ability** — цвет глифа в мастере не зафиксирован явно; собрано brand blue. Подтвердить.
17. **Generic nav-глифы инлайн** — chevron-left, x-close, plus, message-circle, user, grid-01, lightning рисуются инлайн-SVG (приближение Untitled UI), как уже принято в ките (chevron/lock/star). Точные пути UUI можно вшить, если Алиш экспортнёт; на вид расхождений нет.
18. **Bottom Navigation: активный Text+Icon = filled-иконка** — мастер 18:6189 на active тянет ДРУГОЙ ассет (imgIcon1 ≠ imgIcon): активная иконка залитая (тёмный сквиркл + белый глиф), не перекрашенный контур. Активная точка-индикатор Text only = primary (#0a0a0a), НЕ brand. В витрине приближено (сквиркл + белый инлайн-глиф); точный filled-набор UUI — экспорт по желанию.

### Партия 3 — контент-блоки (находки при пересборке 13.06)

19. **Metric Icon: нет Frozen-ассета** — мастер 242:4461 имеет State On/Off/**Frozen**, но в репо только metric-{type}-on/off.png (10 шт), frozen нет. Витрина показывает On/Off; Frozen — пробел (число серое на иконке). Экспорт frozen-PNG или подтвердить, что Frozen = off-иконка + серое значение.
20. **Metric Row `7187:4324` — ширина/гэп по аналогии** — MCP отвалился по таймауту на снятии этого мастера. Собрано как Feature Row (flex gap-8, flex-1, w327). Сверить при восстановлении MCP.
21. **Опечатка в лейбле Metric Streak** — мастер 242:4461 пишет «Cтрик» с ЛАТИНСКОЙ C (U+0043), должно быть «Стрик» (кириллица С). В вебе собрал правильно; в Figma — поправить.
22. **Feature Icon Off-ассеты ЕСТЬ** — CHANGELOG помечал 🚧 отсутствие State=Off у Courses/Tests/Cashback/AI-chat, но в репо все feat-*-off.png присутствуют (16/16). Витрина собрана на них. Свериться с Figma-мастером — возможно, в DS уже дорисовано.

23. **Trainer Block notch-фон параметрический** — мастер 242:3056 кладёт единый Back-SVG 343×**409** и клипает по высоте фазы. В репо shapes/trainer-back.svg = 343×**305** (только под Promo). Решено: генерю notch-путь параметрически под высоту каждой фазы (язычок+углы фикс, тело тянется) — точнее фикс-SVG и кроет все фазы 305–350. Сам SVG-путь в base.css не хранится: генерится в разметке инстанса (как Back-инстанс в мастере).

## Trainer Blocks (`7325:8125`)

| Компонент | Пропы / варианты |
|---|---|
| Trainer Keyboard 4765:9969 | Full view On/Off |
| _Trainer Keyboard-types 891:5971 | Basic / Advanced / Additional / abc / ABC (5) |
| _Trainer Keyboard-section 865:5856 | Type(Primary-symbol/Number/Symbol/Letter) × Disabled (8) |
| _Trainer Expanded-keys 901:12699 | Root/Parentheses/Comma/Less-than/More-than/Sin/Cos/Tan/Ctg (9) |
| _Trainer Section-container 865:5866 | text/icon/nesting-icon/nesting-text/nesting-small_text (5) |
| _Trainer Hearts 1072:6088 | Size(M/S) × State(Default/If loss) (4) |
| Trainer Task Container 915:14944 | одиночный |
| _Trainer Task Content Text / Fraction / Text+Media | одиночные; Media 4173:8485 (Single/Stack/Grid) |
| _Trainer Fraction 4906:5735 | одиночный |
| _Trainer Answer Row 4800:5701 | одиночный |
| _Trainer Answer Slot Radiobutton / Checkbox | одиночные |
| _Trainer Answer Slot Text Field 4800:5867 | Layout(Stack/Grid) × Count(1/2/3/4+) (8) |

+ секция Task's examples: ~60 растров задач (это те самые «~50 фреймов» из P11, живут здесь).

## Content Blocks (`17:2449`)

| Компонент | Пропы / варианты |
|---|---|
| Trainer Block 242:3056 | Role × Subscription × Link × Phase(Promo/Upgrade/Ready/InProgress/Completed/Scheduled/Frozen/Checkpoint) = 19. Phase=Invite from parent убран ✅ (A7 выполнена) |
| Metric Icon 242:4461 | Type(Streak/Accuracy/Time/Score/Task) × State(Off/On/Frozen) = 15/15 ✅ |
| Metric Row 7187:4324, Feature Row 7325:10125 | одиночные |
| Feature Icon 7096:4177 | Type(Hero/Trainer/Mentors/Analysis/Courses/Tests/Cashback/AI-chat) × On/Off = 16/16. State=Off для Courses/Tests/Cashback/AI-chat есть ✅ (A5 выполнена) |
| Speech Bubble 555:10752 | Author(Recipient/Sender) × Type(Default/Small/Accent/Video/Image/Voice/Voice-active/File) = 16/16 ✅ |
| _Speech Bubble Time, _Bubble Button(Play/Stop/File), Video | — |
| Character Image 254:1461 | Type(23 персонажа) × Level(1–4) × Locked(T/F); у большинства 8/8 |
| Character Card 2433:7240 | Size(M/S) × State(Default/Favorite/Disabled/New/Sale) = 10/10 ✅ |
| Character Label 3189:21978 | Rarity: Common/Rare/Super-rare/Epic/Legendary/Mythical (6). Super-rare без опечатки ✅ |
| Character Badge 6719:3640 | Type(New/Sale) × Size(L/M/S) = 6 |
| Character Full-view 1161:7628 | одиночный |
| Resource Icon 1283:6879 | Сoin/Diamond/Point (⚠️ аудит 17) |
| Resource Button 5328:2899 | Coin/Diamond/Combinated |
| Ability Button 5663:3883 | Active/Disabled |
| League Button 7713:1631 | Default/Duel |
| Streak 5242:2782 | Off: 9 состояний (1-13/14-30/31-61/62-92/93+/Skipped/Frozen/Gift/Gift-done); On: 7 (⚠️ аудит 14) |
| Streak Item 6063:4522 | Empty/Done/Frozen/Locked/x2/x3 (A4: регистр x2/x3 не унифицирован) |
| Streak Report 6408:2861 | Property 1=Default (⚠️ аудит 15) |
| Course Item 5956:4867 | Free(5) / Optimum(5) / Trainer(4) состояний = 14, матрица осознанно асимметрична |
| Course Card 295:8915, Product Card 7586:1903 | одиночные (Product Card шириной 163.5 — дробная) |
| Promo Banner 439:4319 | Character/Default |
| State Screen 7187:4459 | Type: Status / Edu success / Streak / Overlay (4) — в доке заявлено 3 типа с другими именами |
| Plan Selector 7260:7914, Plan Screen 7466:7149 (Free/Optimum/Premium) | — |
| Leaderboard Top/Stage/List, Stage(Place 1-3 × Active), Zone Status(Up/Downgrade), League's Trophy(Wooden/Iron/Bronze × On/Off), Trophy Row | Лиги, в работе |
| Text Block 18:5597 | одиночный |

## Аудит-лист (продолжение)

13. **Feature Icon: Type=Hero** в ДС, но подпись в компоненте «Персонажи» (скрытые тексты-остатки переименования рядом). Ассеты в репо названы `feat-characters-*` по подписи. Привести к одному имени.
14. **Streak: Gift и Gift-done существуют только в Full Screen=Off** — на On их нет. Дыра или осознанно?
15. **Streak Report: проп `Property 1`** — дефолтное имя, переименовать (State/Type).
16. **Trainer Block (сет) живёт внутри док-фрейма «Модуль тренажера / State»** — компонент-сет вложен в оформительский фрейм. Вынести на канвас.
17. **Resource Icon: Type=Сoin** — «С» кириллическая (Сoin vs Coin в Resource Button). Скрытая опечатка, ломает поиск.
18. **Character Image: `infernus`** с маленькой буквы — единственный из 23.
19. **Мусор на Content Blocks**: 4 расс-компоненченных фрейма Character Badge (7453:*), 4 фрейма League's Trophy + Wood [Vectorized] + скрытый Bronze (WIP векторизация), telegram-cloud-photo растр, image 5/6, пустой Frame 8012:2553, инстансы Streak_for_Unity/Streak/Character Image ×5 россыпью, 16 скрытых текстов у Feature Icon.
20. **Из CHANGELOG не обнаружены** (вероятно вычищены Никой): Accuracy, Course / Card с пробелом, [old]-компоненты, Superare. Снять с TASKS после подтверждения.
21. **CTA Dock Row/Column** (аудит 8) и **Metric frozen-ассеты**: Frozen-иконки метрик в ДС есть, в репо PNG их нет — доэкспортировать.

## Осталось (фаза 1+)
- Foundations: Colors / Typography / Grid через `get_variable_defs` → честный tokens.css
- **Файл иконок** (отдельный) — нужно переключение вкладки Алишем
- Style guide `1:16` — снять

## Фаза 1 — Токены (снято 13.06.2026)

Выгружены в tokens.css: семантика bg/text/border, палитра (Brand/Graphit/Red/Green/Orange/Yellow/Purple), радиусы xs–xxl (4/8/12/16/24/999), спейсинг 2–64, типографика display→caption.

**Закрытые задачи:** A2 выполнена полностью — heading/m 34 ✅, heading/s 28 ✅, body/l/regular в variables ✅. Снять из TASKS.

22. **Спейсинг-коллекция: голые имена** («4»…«64») и при этом дубль `Space/24` рядом с «24». Привести к одной конвенции.
23. **Токен `Number` = 128** — безымянный, назначение неизвестно.
24. **Радиусы: голые буквы** (xs/s/m/l/xl/xxl без namespace) — конфликтуют по именам с Size-пропами компонентов при поиске.
25. **Палитра: Neutral/100 #FFFFFF дублирует White/100%** — два белых в разных коллекциях.
26. **border/hack_do-not-implement** в выгрузке не встретился — но метод отдаёт только используемые переменные, удаление подтвердить вручную (A3).
27. **heading/l 32/38 существует** — в задокументированной шкале ASSETS.md его не было, добавлен в tokens.css.

## Файл иконок (Untitled UI Icons, снято 13.06.2026)

Страницы: **Icons** (0:1) и **Emoji** (1369:556).

**Icons:** 1467 компонентов. 1197 шт — 24×24 (лайн-иконки Untitled UI), 266 шт — 100×100 (страновые флаги по ISO-кодам). Категории: General, Arrows, Finance & eCommerce, Users, Maps & travel, Education, Security, Communication, Charts, Editor, Media & devices, Weather, Time, Images, Files, Shapes, Alerts & feedback, Layout, Development, Gamification, Flag.
Кастом поверх стока: 5 survey-фейсов (face-angry/bad/normal/smile/happy-survey), `mark`, экспортные наборы `Charts_Unity` и `Flag - Unity` (для Unity-прототипа Бибы).
Полный список имён — **icons-index.txt** в корне репо (для подбора иконки без MCP).

**Emoji:** 3961 компонент в 8 категориях (Flags 261, Symbols, Objects, Travel & Places, Activity, Food & Drink, Animals & Nature, Smileys & People) — сток-пак целиком.

## Аудит-лист — файл иконок

28. **Два внутренних базовых компонента флагов: `_flagBase` и `_baseFlag`** — имя меняется посреди алфавита (примерно с hu). Один и тот же смысл, два имени — слить в один.
29. **Флаги задублированы между страницами**: эмодзи-флаги «Flag <Страна>» (261 шт, Emoji) и ISO-флаги `kz`/`ru`/`uz`… (266 шт, Icons). Какая система каноническая для UI (поле телефона, выбор страны)?
30. **Дубль имени `colors`** — компонент существует и в Editor, и в Images (сток-проблема Untitled UI, но ломает поиск/свопы).
31. **Безымянный фрейм `Frame 1`** среди категорий; категория **Gamification на вид пустая** — проверить и заполнить/удалить.
32. **Конвенция имён категорий смешана**: `Finance & eCommerce` рядом с `Finance_eCommerce`, `Maps_and_travel`, `Charts_Unity` — амперсанды против андерскоров.
33. **Emoji-пак 3961 шт лежит целиком** — если реально используются единицы (стрик, подарок), сток-балласт стоит вынести в отдельный файл или archive, чтобы не грузить библиотеку.

## Резолюции аудита (13.06.2026, Алиш)

- п.2 Multiline без ReadOnly/Error — **осознанно, закрыто**
- п.4 Hover-состояния — **остаются, задел под веб-платформу**
- п.5 List Item Navigation 78 ≠ Profile 76 — **должно быть едино**; чинить через выравнивание паддингов/слотов, НЕ через Fixed-высоту. Диагностика в фазе 2 (List Item первый)
- п.6 List Item Profile без Active/Success/Error — **осознанно**; асимметричные матрицы — норма
- п.8 CTA Dock Row/Column — **имена верны, закрыто**
- п.13 Feature Icon: канон — **Characters**. Задача Алишу: переименовать проп Type=Hero → Characters в Figma. PNG в репо уже feat-characters ✅
- п.14 Streak Gift/Gift-done без Full Screen=On — **осознанно, закрыто**
- п.25 Neutral/100 vs White/100% — убрать дубль, **позже / Ника**
- п.29 Флаги: канон для UI — **ISO-набор** (kz/ru/uz); эмодзи-флаги только для контента
- алмаз/монета: канон — **мастер 30×30, экспорт @2x = 60×60** (свежая пачка). В kit base64-остатки заменены на файлы репо

## Фаза 2 — List Item пересобран (13.06.2026)

Мастер 94:829 (21 вариант: Checkbox/Radio Button/Navigation/Profile × 6 состояний, Profile без Active/Success/Error).

**Корневой диагноз бага высоты (3 дефекта):**
1. Radio Button в Active/Success/Error имел `h-58` FIXED вместо min-h — обрезал бы 2 строки.
2. Вертикальное выравнивание гуляло: Navigation items-start, Profile items-center — при min-h давало ±2px между типами.
3. gap-токен `--8` с дефолт-фолбэком **0** (а не 8) — схлопывал зазор у Checkbox.
Корень: 4 типа собраны 4 разными скелетами (Nav/Profile через слой Content+flex-1, Checkbox/Radio — потроха в руте; Checkbox/Default вообще вложенным компонентом).

**Рецепт пересборки (в base.css, класс .li):** единый каркас для всех типов — рут `min-h-58 + items-center + gap-8 + py-16 + Hug`, обязательный слой Content(flex-1), контролы как слоты prefix/suffix. Тип меняет начинку, не структуру. Результат рендера: все однострочные = 58px, все с описанием = 80px, разнобой устранён (проверено Playwright).

**Задача в Figma (TASKS):** применить рецепт к мастеру — убрать h-58 fixed у Radio Active/Success/Error, выровнять items-center, свести 4 типа к единому слою Content, gap-фолбэк 8.

**Открыто:** Checkbox/Error — чек залит красным (эталон) или пустой (валидация непоставленной галки)? Уточнить у Алиша.

## Фаза 2 — Button пересобран (13.06.2026)
Мастер 12:2263, 60 вариантов (Type: Primary/Secondary/Tertiary/Text/Text-critical × State: Default/Pressed/Disabled/Loading × Size: L58/M40/S30). Единый класс .btn + модификаторы. Loading = спиннер вместо контента, Text/Text-critical без паддингов и фона. Высоты L все 58 (проверено). Иконочные слоты left/right опциональны. Заметка: gap-фолбэк токенов та же болячка что в List Item, но в вебе решена прямым gap:4px.

## Фаза 2 — Партия 1 контролов (13.06.2026)
Пересобраны от мастеров: Text field (19:6301, 8 сост.), Multiline (6 сост.), Switch (130:258, 8), Tabs (494:477, Segmented/Underlined × M/S), Checkbox (94:2005), Radio (96:2273), Pill (3393:6443, 3 сост.). Все в base.css + kit. Сверка по эталону пройдена.

## Аудит-лист (продолжение)
34. **Multiline help-text на шрифте `Gerbera`** (font-['Gerbera:Regular'], 12px) — у обычного Text field тот же help на Halvar 14px. Чужой шрифт + другой размер в одном компоненте. Привести к Halvar 14.
35. **Multiline/Focus: бордер захардкожен `#ebeaec`** мимо токена (у Active правильный --border/focus). Заменить на токен.
36. **Tabs/Underlined использует токен `--text/placeholder`**, а Segmented — `--text/tertiary` для неактивного таба. Один смысл (неактивный текст), два токена. Свести.
37. **Text field _Prefix/_Suffix дефолтные иконки**: search-sm (prefix), calendar (suffix), у Disabled/ReadOnly — slash-circle. Консистентно, ок.
38. **Label gap-токен `--p-sapce-200`** — опечатка в имени переменной (sapce → space). Та же коллекция спейсинга что в аудите 22.
