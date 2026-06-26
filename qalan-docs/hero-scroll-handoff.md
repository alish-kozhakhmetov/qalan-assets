# Qalan hero — scroll-zoom showreel · handoff

Перенос наработок «анимированный телефон с наездом камеры по скроллу» (приём как на
tinker.com) на наш контент. Источник истины кода — `landing/scripts/build-hero-flow.mjs`.
Собранные файлы — `landing/public/scroll.html` (скролл+зум) и `hero-flow.html` (автоплей).

---

## 1. Что это за приём (разбор tinker.com)

Hero на tinker — это **НЕ видео**. Это:
- один `<canvas>` (ретина), лежащий в контейнере `position:sticky; top:0; height:100vh`
  (`flex items-center justify-center`), плюс `object-cover size-full`;
- на `window` нет анимационных библиотек (ни GSAP, ни Lottie, ни Rive, ни Three) —
  сцена **рисуется кодом на canvas**, React-приложение (React Router);
- картинки (UI телефона + фото-обрамление) — слои-текстуры с CDN, которые движок
  композитит на canvas.

Механика эффекта «экран увеличивается»:
1. длинная секция-скролл, сцена **приколота** через `sticky + height:100vh`
   (пока скроллишь — картинка стоит, копится «прогресс» 0→1);
2. позиция скролла → **камера-зум**: масштаб + фокус пересчитываются каждый кадр.

**Вывод для нас:** «достать их данные и повторить 1:1» нельзя — анимация это
императивный код рисования в минифицированном бандле, не данные (нет Lottie/Rive/keyframes).
Но сам приём простой и мы воспроизводим его **на DOM** (чётче, легче, живые состояния
компонентов) — sticky-пин + scroll-scrubbed зум + смена экранов.

---

## 2. Камера — спека (это главное, что переносим)

Прогресс скролла `p ∈ [0,1]` считается так:
```
total = scroller.offsetHeight - innerHeight
p = clamp(-scroller.getBoundingClientRect().top / total, 0, 0.9999)
```
Высота секции: `.scroller{height:600vh}` (4 главы × ~125vh скролла на главу).
Пин: `.sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}`.

### Кейфреймы камеры (scale + точка фокуса в % по вертикали)
Калибровка: на границах глав (p = 0.25 / 0.50 / 0.75) масштаб ≈ 1.0 — чтобы кроссфейд
между экранами случался в спокойной точке, а не посреди глубокого зума.

| p | scale | origin Y | смысл |
|------|-------|----------|-------|
| 0.00 | 0.82 | 50% | старт, мелко, по центру |
| 0.20 | 0.92 | 50% | главная «осела» |
| 0.26 | 1.00 | 48% | вход в тренажёр |
| 0.44 | 1.15 | 45% | **наезд в поле ввода/клавиатуру** |
| 0.50 | 1.00 | 48% | выход к успеху (спокойно для reveal) |
| 0.70 | 1.12 | 45% | **наезд на награду/метрики** |
| 0.76 | 0.99 | 50% | вход в стрик |
| 1.00 | 0.90 | 50% | отъезд назад |

`transform-origin` всегда `50% <origin Y>`; `transform: scale(<scale>)` на `.device`.

### Алгоритм (continuous + демпфирование = «масло»)
```js
const lerp=(a,b,t)=>a+(b-a)*t;
function camAt(p){                       // интерполяция между кейфреймами с ease-in-out
  for(let i=0;i<KEYS.length-1;i++){const a=KEYS[i],b=KEYS[i+1];
    if(p>=a.p&&p<=b.p){const t=(p-a.p)/((b.p-a.p)||1);
      const e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;        // easeInOutQuad
      return {s:lerp(a.s,b.s,e),ox:lerp(a.ox,b.ox,e),oy:lerp(a.oy,b.oy,e)};}}
  const L=KEYS[KEYS.length-1];return {s:L.s,ox:L.ox,oy:L.oy};
}
const cur={s:0.82,ox:50,oy:50};          // текущее состояние камеры
function tick(){                          // rAF-loop: cur мягко догоняет цель (демпфирование)
  const t=camAt(targetP);
  cur.s=lerp(cur.s,t.s,0.11); cur.ox=lerp(cur.ox,t.ox,0.11); cur.oy=lerp(cur.oy,t.oy,0.11);
  device.style.transformOrigin=cur.ox.toFixed(2)+'% '+cur.oy.toFixed(2)+'%';
  device.style.transform='scale('+cur.s.toFixed(4)+')';
  requestAnimationFrame(tick);
}
```
`targetP` пишется в `scroll`-листенере; `tick()` крутится сам и лерпит `cur→target`
с коэффициентом `0.11` — отсюда весомое, не дёрганое движение.

---

## 3. Главы, подписи, микро-анимации

4 главы, индекс `= floor(p*4)`. Кроссфейд экранов:
`.scr{opacity:0} .scr.on{opacity:1}` + `transition:opacity .8s cubic-bezier(.16,1,.3,1)`.

| # | экран | подпись (RU) | что играет внутри |
|---|-------|--------------|-------------------|
| 0 | main | «Персональный AI-тренажёр по математике» | персонаж Дружок (Hello), промо-баннер |
| 1 | trainer | «Решает задачу — и сразу видит разбор» | печать `1`,`7` (реальные pressed-стейты клавиш) → «Проверить» |
| 2 | success | «Награда за результат, а не за „посидел“» | поэтапный reveal: перс+заголовок → награда → метрики по очереди (count-up) → конфетти + кнопки |
| 3 | streak | «Возвращается каждый день за стриком» | экран стрика |

Подпись — фрост-пилюля внизу (`.cap` в `.capwrap`), на смене главы ре-триггерится
класс `.show` (fade+slide).

Порядок reveal на успехе (`successSeq`): `char/title/sub` → ждать 580мс → `reward` (sfx)
→ метрики по одной каждые 440мс (задачи/точность/время, count-up) → пауза 160мс →
кнопки + конфетти + sfx levelup.

Звук — синтез на WebAudio (без копирайта), по умолчанию выключен (политика браузеров),
включается кнопкой. `prefers-reduced-motion` уважается (всё статично).

---

## 4. Авто-режим для записи видео

`scroll.html?auto=<сек>&delay=<мс>` — камера сама едет 0→1 за `auto` секунд (скролл
отключается), `delay` держит первый кадр перед стартом. Используется рекордером.

Запись (нужен dev-сервер на :5173):
```
cd landing && npm run dev        # терминал 1
node landing/scripts/record-scroll.mjs   # терминал 2 → public/qalan-scroll.webm
```
Рекордер: Playwright (chromium, swiftshader для WebGL), viewport 600×1040 @2x, пишет webm.

---

## 5. Сборка и токены

```
node landing/scripts/build-hero-flow.mjs --scroll    # → public/scroll.html (скролл+зум)
node landing/scripts/build-hero-flow.mjs             # → public/hero-flow.html (автоплей)
node landing/scripts/build-hero-flow.mjs --phase1    # → trainer.html (статичный тренажёр)
node landing/scripts/build-hero-flow.mjs --radio     # → trainer-radio.html
node landing/scripts/build-hero-flow.mjs --banner    # → banner.html (промо 1:1 с Figma)
```

Дизайн-система (НЕ выдумывать — тащить отсюда):
- brand `#0066fe` / pressed `#0052cc`; canvas `#f5f5f5`; surface `#fff`;
  text `#0a0a0a`/`#4a4a4a`/`#b4b4b4`; border `#eaeaea`; success `#00b53f`;
  warning `#f5b300`; orange (клавиши-операторы) `#ff752c`; радиусы 12/16/999.
- Шрифты: **Platform LC** (заголовки/display), **Halvar Mittelschrift** (текст) —
  `fonts/*.woff2`, в собранных html уже вшиты base64.
- Иконки: `icons/*.png` (фичи/метрики/монета/алмаз/стрик), `landing/public/app-kbd/*.svg`
  (клавиатура, сердца, бейджи). В сборке инлайнятся (SVG с фильтрами — как raw `<svg>`,
  иначе пикселит; у тонких глифов `preserveAspectRatio` правится на `xMidYMid meet`).

Экраны (Figma-ноды, по которым собрано пиксель-перфект):
- main / промо-баннер — 460:5924 (Д.Р.У.Ж.О.К.)
- trainer (клавиатура) — 4765:9969, layout — файл `66VsPAuI2bJPvSUZ7NDfpn`
- trainer radio — 475:7106
- success — 428:19378

---

## 6. Ограничения / на что смотреть при переносе

- **Персонажи** — отдельные iframe (`/characters/*.html`, по 2–3.6 МБ Spine base64).
  Если выносить `scroll.html` с сервера — пути к ним отвалятся; для полностью
  автономного файла их надо инлайнить или заменить на статичные рендеры.
- **Headless WebGL**: Spine в Playwright требует флагов swiftshader (уже в рекордере).
- **Размеры:** телефон базово 392px, viewport экрана 370×800; при зуме ×1.15 не вылезает
  за стейдж 600×1040.
