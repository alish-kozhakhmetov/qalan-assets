/* Build a self-contained, portable HTML of the Qalan hero phone-flow animation.
 * Inlines tokens.css + base.css + base64 fonts/icons → single file, no deps.
 * Flow: Main → Trainer → Success → Streak, autoplay loop. Ports the verified
 * prototype markup on our real DS, with handoff fixes (no green check on solve,
 * single shared status bar, prefers-reduced-motion). Output: public/hero-flow.html
 *
 * Run: node landing/scripts/build-hero-flow.mjs   (from repo root)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const REPO = join(here, "..", ".."); // qalan-assets root
const r = (p) => readFileSync(join(REPO, p));
const b64 = (p, mime) => `data:${mime};base64,${r(p).toString("base64")}`;

const TOK = r("tokens.css").toString();
const BASE = r("base.css").toString();

const F = {
  PR: b64("fonts/Platform-Regular-Desktop.woff2", "font/woff2"),
  PB: b64("fonts/Platform-Bold-Desktop.woff2", "font/woff2"),
  HR: b64("fonts/HalvarMittel-Rg.woff2", "font/woff2"),
  HB: b64("fonts/HalvarMittel-Bd.woff2", "font/woff2"),
};
const ICONS = [
  "feat-mentors-on", "feat-aichat-on", "feat-cashback-on",
  "metric-task-on", "metric-accuracy-on", "metric-time-on",
  "coin", "diamond", "streak-on", "streak-off", "league-button",
];
const I = Object.fromEntries(ICONS.map((k) => [k, b64(`icons/${k}.png`, "image/png")]));
const ic = (n) => I[n];

// Trainer keyboard icons — exported from Figma 4765:9969 (stroke colors baked in:
// operators=white, pencil/chat/delete=#0A0A0A via the svg var() fallback).
// Inline svgs with aspect preserved — the raw exports use preserveAspectRatio="none"
// which distorts thin glyphs (e.g. the 16×2 minus → square) when sized 24×24.
const svgInline = (k) => {
  const s = r(`landing/public/app-kbd/${k}.svg`)
    .toString()
    .replace('preserveAspectRatio="none"', 'preserveAspectRatio="xMidYMid meet"');
  return `data:image/svg+xml;base64,${Buffer.from(s).toString("base64")}`;
};
// Inline the raw <svg> markup (not a data-URI img) — needed for SVGs with filters
// (e.g. the splat's inner shadow), which pixelate when rasterized inside an <img>.
const rawSvg = (k) => r(`landing/public/app-kbd/${k}.svg`).toString();
const KBD = Object.fromEntries(
  ["divide", "pencil", "chat", "delete", "multiply", "minus", "plus", "heart", "heart-loss", "badge-splat", "badge-splat-inner", "badge-new"].map((k) => [k, svgInline(k)])
);
const ki = (n) => KBD[n];

const PHASE1 = process.argv.includes("--phase1"); // static Trainer-only build for review
const RADIO = process.argv.includes("--radio"); // static radio-question Trainer for review
const BANNER = process.argv.includes("--banner"); // isolated promo banner for 1:1 Figma compare
const SCROLL = process.argv.includes("--scroll"); // scroll-driven pinned-phone storytelling

const FONTFACE = `
@font-face{font-family:"Platform LC";src:url(${F.PR}) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Platform LC";src:url(${F.PB}) format("woff2");font-weight:700;font-display:swap}
@font-face{font-family:"Halvar Mittelschrift";src:url(${F.HR}) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Halvar Mittelschrift";src:url(${F.HB}) format("woff2");font-weight:700;font-display:swap}
/* safety aliases base.css class rules expect */
:root{--font-body:"Halvar Mittelschrift",system-ui,sans-serif;--font-heading:"Platform LC",system-ui,sans-serif;
--r-s:8px;--r-m:12px;--r-l:16px;--r-xxl:999px;--bg-status-success:#00b53f;--bg-status-error:#ff4d4d;--bg-status-warning:#f5b300;}
`;

const SBAR = `<div class="sbar"><span class="sbar__time">9:41</span><span class="sbar__ico">
<svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor"/><rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor"/><rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="currentColor"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg>
<svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.5c2.3 0 4.4.9 6 2.4l-1.4 1.5A6.5 6.5 0 0 0 8.5 4.5c-1.7 0-3.3.6-4.6 1.9L2.5 4.9A8.7 8.7 0 0 1 8.5 2.5Z" fill="currentColor"/><path d="M8.5 6.2c1.3 0 2.5.5 3.4 1.4l-3.4 3.5L5.1 7.6A4.8 4.8 0 0 1 8.5 6.2Z" fill="currentColor"/></svg>
<svg width="27" height="13" viewBox="0 0 27 13"><rect x="1" y="1" width="22" height="11" rx="3" stroke="currentColor" stroke-opacity=".35" fill="none"/><rect x="2.5" y="2.5" width="19" height="8" rx="1.5" fill="currentColor"/><rect x="24.5" y="4.5" width="1.5" height="4" rx=".75" fill="currentColor" fill-opacity=".35"/></svg></span></div>`;

const NOTCH = `<div class="tblock__back"><svg viewBox="0 0 343 305" xmlns="http://www.w3.org/2000/svg"><path d="M126 0C130.859 0 135.293 1.82427 138.653 4.82533C148.447 13.5742 153.344 17.9486 154.722 18.4743C156.1 19 157.733 19 161 19H295C317.627 19 328.941 19 335.971 26.0293C343 33.0587 343 44.3726 343 67V257C343 279.627 343 290.941 335.971 297.971C328.941 305 317.627 305 295 305H48C25.3726 305 14.0587 305 7.0293 297.971C-0.0001 290.941 0 279.627 0 257V67C0 44.3726 -0.0001 33.0587 7.0293 26.0293C10.0306 23.028 13.8134 21.3103 18.9239 20.325C19.5531 20.2037 20 19.6408 20 19C20 8.50659 28.5066 0 39 0H126Z" fill="white"/></svg></div>`;

const CHEV = `<span class="btn__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>`;

const SND_ICON_OFF = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
const SND_ICON_ON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a9 9 0 0 1 0 14"/></svg>`;
const PROMO_STAR = `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 2.2l2.85 6.06 6.65.62-5 4.45 1.46 6.52L12 16.9 6.04 20.37l1.46-6.52-5-4.45 6.65-.62z" fill="#FFD200" stroke="#E1B502" stroke-width="1" stroke-linejoin="round"/></svg>`;
// Promo Banner — Figma 460:5924 (Д.Р.У.Ж.О.К.). Real Spine character (Hello) on the right.
const PROMO = `<div class="promo">
  <div class="promo__text">
    <div class="promo__timer">6Д 5Ч 47М</div>
    <div class="promo__name">Д.Р.У.Ж.О.К.</div>
    <div class="promo__stars">${PROMO_STAR.repeat(4)}</div>
    <button class="promo__buy"><span class="promo__old">1490</span><span>745</span><img src="${ic("diamond")}" alt=""></button>
    <div class="promo__dots"><i class="on"></i><i></i></div>
  </div>
  <div class="promo__char"><iframe src="/characters/buddy.html?anim=Hello&pb=0&pt=0.02&pl=0.02&pr=0.02" title="Дружок" loading="lazy"></iframe></div>
  <div class="promo__badge"><span class="promo__badge-out">${rawSvg("badge-splat")}</span><span class="promo__badge-in">${rawSvg("badge-splat-inner")}</span><span class="promo__badge-new">${rawSvg("badge-new")}</span></div>
</div>`;

const MAIN = `<div class="scr scr--main" id="main">
  <div class="tnav__bar tnav__bar--main">
    <div class="tnav__left"><div class="tnav-ava">А</div></div>
    <div class="tnav__right">
      <div class="tnav-league"><img src="${ic("league-button")}" alt=""></div>
      <div class="tnav-streak tnav-streak--off"><img src="${ic("streak-off")}" alt=""></div>
    </div>
  </div>
  <div class="mainbody">
    <div class="tblock">${NOTCH}
      <div class="tblock__head"><div class="tblock__pill"><span>AI-тренажёр</span></div>
        <h1 class="tblock__title">Персональное обучение математике</h1></div>
      <div class="feat-row">
        <div class="feat"><div class="feat__ico"><img src="${ic("feat-mentors-on")}" alt=""></div><div class="feat__label">Менторы</div></div>
        <div class="feat"><div class="feat__ico"><img src="${ic("feat-aichat-on")}" alt=""></div><div class="feat__label">AI-чат</div></div>
        <div class="feat"><div class="feat__ico"><img src="${ic("feat-cashback-on")}" alt=""></div><div class="feat__label">Кешбек</div></div>
      </div>
      <div class="tblock__cta"><button class="cta__btn cta__btn--brand cta-tap" id="mainCta">Начать бесплатно ${CHEV}</button></div>
    </div>
    ${PROMO}
  </div>
  <div class="bnav"><div class="bnav__row">
    <div class="btab btab--text"><span class="btab__label">Курсы</span></div>
    <div class="btab btab--text btab--on"><span class="btab__label">Тренажёр</span><span class="btab__dot"></span></div>
    <div class="btab btab--text"><span class="btab__label">Магазин</span></div>
  </div></div>
  <div class="nav-safe"></div>
</div>`;

// --- Trainer keyboard (faithful to Figma 4765:9969, type Basic) ---
const opKey = (icon, op) => `<div class="kbd__key kbd__key--op" data-op="${op}"><img src="${ki(icon)}" alt="${op}"></div>`;
const txtKey = (g, key) => `<div class="kbd__key"${key ? ` data-key="${key}"` : ""}>${g}</div>`;
const KEYBOARD = `<div class="kbd">
  <div class="kbd__cta">
    <button class="kbd__iconbtn" aria-label="Заметка"><img src="${ki("pencil")}" alt=""></button>
    <button class="kbd__iconbtn" aria-label="Чат"><img src="${ki("chat")}" alt=""></button>
    <button class="kbd__check" id="checkBtn">Проверить</button>
  </div>
  <div class="kbd__grid">
    <div class="kbd__col">
      ${txtKey("&lt;")}${txtKey('<span class="kbd__frac"><b>x</b><em></em><b>y</b></span>')}${txtKey("x<sup>2</sup>")}${txtKey("x<sup>3</sup>")}${txtKey("( )")}
    </div>
    <div class="kbd__col">
      ${txtKey("&gt;")}${txtKey("7", "7")}${txtKey("4", "4")}${txtKey("1", "1")}${txtKey(";")}
    </div>
    <div class="kbd__col">
      ${txtKey("≠")}${txtKey("8", "8")}${txtKey("5", "5")}${txtKey("2", "2")}${txtKey("0", "0")}
    </div>
    <div class="kbd__col">
      ${txtKey("=")}${txtKey("9", "9")}${txtKey("6", "6")}${txtKey("3", "3")}${txtKey(",")}
    </div>
    <div class="kbd__col">
      <div class="kbd__key" data-key="back" aria-label="Стереть"><img src="${ki("delete")}" alt="⌫"></div>
      ${opKey("divide", "÷")}${opKey("multiply", "×")}${opKey("minus", "−")}${opKey("plus", "+")}
    </div>
  </div>
  <div class="kbd__dots"><i class="on"></i><i></i></div>
  <div class="nav-safe"></div>
</div>`;

// Trainer screen — real DS sub-nav + DS text field (centered, regular) + keyboard
const TRAINER = `<div class="scr scr--trainer" id="trainer">
  <div class="tnav__bar tnav__bar--sub">
    <button class="tnav-btn tnav-btn--icon" aria-label="Назад"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>
    <div class="tnav-spacer"></div>
    <div class="tnav-title tnav-title--trainer"><span id="tnum">№1/15</span><div class="tnav-hearts"><img class="tnav-hearts__ico tnav-hearts__ico--full" src="${ki("heart")}" alt=""><img class="tnav-hearts__ico tnav-hearts__ico--loss" src="${ki("heart-loss")}" alt=""><span class="heart-minus">−1</span><span id="hearts">3</span></div></div>
    <div class="tnav-spacer"></div>
    <button class="tnav-btn tnav-btn--icon" aria-label="Закрыть"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  </div>
  <div class="tbody">
    <div class="tprompt">Определите число в пустой ячейке, чтобы числовые выражения были равны:</div>
    <div class="teqn">
      <div class="tf tf--focus teqn__field"><div class="tf__input"><div class="tf__text tf__text--filled" id="answer">&nbsp;</div></div></div>
      <span class="teqn__rest">− 4 = 6 + 7</span>
    </div>
  </div>
  ${KEYBOARD}
</div>`;

// Success — Figma 428:19378 (× close, vertically-centred block, staggered reveal)
const SUCCESS = `<div class="scr scr--success" id="success">
  <div class="confetti" id="confetti"></div>
  <div class="succ-nav"><button class="rnav-btn" aria-label="Закрыть"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="succ-state">
    <div class="succ-textblock">
      <div class="succ-char succ-rv"><iframe src="/characters/buddy.html?anim=LevelUp" title="Дружок — level up" loading="lazy"></iframe></div>
      <h1 class="succ-ttl succ-rv">Деление натуральных чисел</h1>
      <div class="succ-sub succ-rv">Тренировка завершена, ты молодец!</div>
      <div class="succ-reward succ-rv"><span class="succ-rew">+1500<img src="${ic("coin")}" alt=""></span><span class="succ-rew">+100<img src="${ic("diamond")}" alt=""></span></div>
    </div>
    <div class="metric-row succ-metrics">
      <div class="metric succ-rv"><div class="metric__ico"><img src="${ic("metric-task-on")}" alt=""><span class="metric__val" data-to="17">0</span></div><div class="metric__label">Задачи</div></div>
      <div class="metric succ-rv"><div class="metric__ico"><img src="${ic("metric-accuracy-on")}" alt=""><span class="metric__val" data-to="92" data-suffix="%">0%</span></div><div class="metric__label">Точность</div></div>
      <div class="metric succ-rv"><div class="metric__ico"><img src="${ic("metric-time-on")}" alt=""><span class="metric__val">1ч 24м</span></div><div class="metric__label">Время</div></div>
    </div>
  </div>
  <div class="succ-cta succ-rv">
    <button class="cta__btn cta__btn--brand" style="width:100%">Смотреть отчёт</button>
    <button class="cta__btn cta__btn--secondary" style="width:100%">Ещё разок · 500<img src="${ic("coin")}" style="width:24px;height:24px;margin-left:4px;vertical-align:-6px" alt=""></button>
  </div>
  <div class="nav-safe"></div>
</div>`;

const WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
  .map((d) => `<i class="${d === "Пн" ? "on" : ""}">${d}</i>`).join("");
const STREAK = `<div class="scr scr--pad scr--streak" id="streak">
  <div class="st-mid">
  <div class="fire"><img src="${ic("streak-on")}" alt=""><b>1</b></div>
  <div class="st-d">день подряд</div>
  <div class="st-p">Отличный старт,<br>продолжай в том же духе</div>
  <div class="st-week">${WEEK}</div>
  <div class="st-cta"><button class="cta__btn cta__btn--brand" style="width:220px">Поделиться</button></div>
  </div>
</div>`;

// --- Trainer · radio-question variant (Figma 475:7106) ---
const ICO_CHEVL = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>`;
const ICO_X = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const ICO_CHEVR = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b4b4b4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`;
const RITEMS = [
  "Куб имеет 6 сторон",
  "У четырехугольника 5 вершин",
  "В минуте 4о секунд",
  "В неделе 7 дней",
]
  .map((t) => `<button class="ritem"><span class="ritem__radio"></span><span class="ritem__label">${t}</span><span class="ritem__chev">${ICO_CHEVR}</span></button>`)
  .join("");
const TRAINER_RADIO = `<div class="scr scr--radio" id="trainer-radio">
  <div class="tnav__bar tnav__bar--sub rnav">
    <div class="rnav-slot"><button class="rnav-btn" aria-label="Назад">${ICO_CHEVL}</button></div>
    <div class="tnav-title tnav-title--trainer"><span>№2/15</span><div class="tnav-hearts"><img class="tnav-hearts__ico tnav-hearts__ico--full" src="${ki("heart")}" alt=""><span>3</span></div></div>
    <div class="rnav-slot rnav-slot--end"><button class="rnav-btn" aria-label="Закрыть">${ICO_X}</button></div>
  </div>
  <div class="rbody">
    <p class="rprompt">Определите истинное высказывание из предложенных:</p>
    <div class="rlist">${RITEMS}</div>
  </div>
  <div class="kbd kbd--dock">
    <div class="kbd__cta">
      <button class="kbd__iconbtn" aria-label="Заметка"><img src="${ki("pencil")}" alt=""></button>
      <button class="kbd__iconbtn" aria-label="Чат"><img src="${ki("chat")}" alt=""></button>
      <button class="kbd__check">Проверить</button>
    </div>
    <div class="nav-safe"></div>
  </div>
</div>`;

const DEVICE_CSS = `
*{box-sizing:border-box}
body{margin:0;padding:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:"Halvar Mittelschrift";
  background:radial-gradient(120% 80% at 50% 18%,#eaf1ff 0%,#e4e7ee 46%,#dadde6 100%);overflow:hidden}
/* ambient glow behind device */
.stage{position:relative;display:flex;align-items:center;justify-content:center}
.stage::before{content:"";position:absolute;width:560px;height:560px;border-radius:50%;
  background:radial-gradient(circle,rgba(0,102,254,.20),rgba(0,102,254,0) 62%);filter:blur(8px);animation:ambient 9s ease-in-out infinite}
@keyframes ambient{0%,100%{transform:scale(1) translateY(0);opacity:.85}50%{transform:scale(1.12) translateY(-14px);opacity:1}}
/* device + cinematic camera drift */
.device{position:relative;z-index:1;width:392px;background:#0a0a0a;border-radius:54px;padding:11px;box-shadow:0 50px 90px -28px rgba(8,24,64,.5)}
.viewport{position:relative;width:370px;height:800px;border-radius:44px;overflow:hidden;background:#f5f5f5}
.notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:128px;height:30px;background:#0a0a0a;border-radius:0 0 18px 18px;z-index:50}
.sbar{position:absolute;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;justify-content:space-between;padding:9px 28px 6px}
.sbar__time{font:600 15px/1 -apple-system,"SF Pro Text",system-ui;color:#0a0a0a;letter-spacing:-.3px}
.sbar__ico{display:flex;align-items:center;gap:6px;color:#0a0a0a}
/* cinematic zoom + crossfade between screens */
.scr{position:absolute;inset:0;display:flex;flex-direction:column;background:#f5f5f5;overflow:hidden;padding-top:54px;
  opacity:0;transform:scale(1.06);transform-origin:50% 46%;pointer-events:none;
  transition:opacity .46s ease,transform .62s cubic-bezier(.22,1,.36,1);z-index:1}
.scr.on{opacity:1;transform:scale(1);z-index:10;pointer-events:auto}
.scr--pad{padding:54px 16px 18px}
.scr--center{align-items:center;text-align:center}
.tnav__bar--main{padding:8px 16px}
.mainbody{flex:1;padding:6px 16px 0;display:flex;flex-direction:column}
.tblock{position:relative}
/* Promo Banner — Figma 460:5924 */
.promo{position:relative;display:flex;align-items:center;background:transparent;border-radius:16px;width:343px;min-height:200px;margin-top:24px;overflow:visible}
.promo__text{display:flex;flex-direction:column;gap:8px;padding:16px;width:175px;position:relative;z-index:2}
.promo__timer{padding-left:8px;font:700 14px/18px "Halvar Mittelschrift";letter-spacing:.5px;color:#4a4a4a}
.promo__name{padding-left:8px;font:700 24px/28px "Platform LC";color:#0a0a0a}
.promo__stars{display:flex;gap:2px;height:32px;align-items:center}
.promo__stars svg{display:block}
.promo__buy{height:40px;align-self:flex-start;display:inline-flex;align-items:center;justify-content:center;gap:4px;background:var(--bg-brand,#0066fe);color:#fff;border:0;border-radius:999px;padding:0 16px;font:700 16px/21px "Halvar Mittelschrift";cursor:pointer}
.promo__old{text-decoration:line-through;color:rgba(255,255,255,.5);margin-right:2px}
.promo__buy img{width:20px;height:20px;display:block;margin-left:2px}
.promo__dots{display:flex;gap:2px;padding-left:8px}
.promo__dots i{width:16px;height:16px;display:flex;align-items:center;justify-content:center}
.promo__dots i::before{content:"";width:8px;height:8px;border-radius:50%;background:#d6d6d6}
.promo__dots i.on::before{background:#0a0a0a}
.promo__char{position:absolute;right:-2px;bottom:0;width:180px;height:236px;z-index:1;overflow:visible}
.promo__char iframe{width:100%;height:100%;border:0;background:transparent;display:block}
.promo__badge{position:absolute;left:148px;top:64px;width:82px;height:72px;transform:rotate(-15deg);z-index:3;pointer-events:none}
.promo__badge span{position:absolute;display:block}
.promo__badge span svg{width:100%;height:100%;display:block;overflow:visible}
.promo__badge-out{top:0;left:0;width:82px;height:72px}
.promo__badge-in{top:7.66%;left:6.89%;width:85.82%;height:83.33%}
.promo__badge-new{left:50%;top:49%;transform:translate(-50%,-50%);width:38.9px;height:11.7px}
.cta__btn{transition:background .13s ease,transform .13s ease}
.cta-tap.tap{background:var(--bg-brand-pressed,#0052cc);transform:scale(.975)}
.bnav{margin-top:auto}
/* trainer screen */
.scr--trainer{padding:54px 0 0;display:flex;flex-direction:column}
.tnav__bar--sub{width:100%}
.tnav-btn--icon{padding:0;width:40px}
.tnav-spacer{flex:1 0 0;min-width:0}
.tnav-title--trainer{display:flex;align-items:center;gap:8px;padding-bottom:0;border-bottom:0}
.tnav-title--trainer #tnum{font:700 18px/23px "Halvar Mittelschrift";color:#0a0a0a;border-bottom:1px solid var(--border-strong,#d6d6d6);padding-bottom:3px}
.tnav-hearts{position:relative;width:32px;height:32px}
.tnav-hearts__ico{position:absolute;top:12.5%;left:8.33%;right:8.33%;bottom:13.19%;display:block}
.tnav-hearts__ico--loss{display:none}
.tnav-hearts.is-loss .tnav-hearts__ico--full{display:none}
.tnav-hearts.is-loss .tnav-hearts__ico--loss{display:block}
.tnav-hearts.shake{animation:heartShake .5s ease}
@keyframes heartShake{0%,100%{transform:translateX(0) rotate(0)}20%{transform:translateX(-2px) rotate(-7deg)}40%{transform:translateX(2px) rotate(7deg)}60%{transform:translateX(-1.5px) rotate(-4deg)}80%{transform:translateX(1.5px) rotate(4deg)}}
.tnav-hearts span{position:absolute;left:50%;top:calc(50% - 11.8px);transform:translateX(-50%);font:400 18px/23px "Halvar Mittelschrift";color:#fff;text-align:center}
.tbody{padding:8px 16px 0;display:flex;flex-direction:column;gap:18px}
.tprompt{font:400 16px/21px "Halvar Mittelschrift";color:#0a0a0a}
.teqn{display:flex;align-items:center;gap:10px}
.teqn__field{width:auto}
.teqn__field .tf__input{min-width:84px;justify-content:center}
.teqn__field .tf__text{flex:1 1 auto;text-align:center}
#answer{font:400 24px/29px "Halvar Mittelschrift";color:#0a0a0a;text-align:center}
.teqn__rest{font:400 24px/29px "Halvar Mittelschrift";color:#0a0a0a;white-space:nowrap}
/* keyboard (Figma 4765:9969) */
.kbd{margin-top:auto;width:100%;display:flex;flex-direction:column;gap:4px;align-items:center}
.kbd__cta{display:flex;gap:4px;align-items:center;width:100%;padding:8px 16px}
.kbd__iconbtn{height:58px;min-width:58px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #eaeaea;border-radius:999px;padding:0 20px;cursor:pointer}
.kbd__iconbtn img{width:24px;height:24px;display:block}
.kbd__check{flex:1 0 0;min-width:0;height:58px;display:flex;align-items:center;justify-content:center;background:var(--bg-brand,#0066fe);color:#fff;border:0;border-radius:999px;font:700 18px/23px "Halvar Mittelschrift";cursor:pointer}
.kbd__check{transition:background .12s ease,transform .12s ease}
.kbd__check.is-disabled{background:#eaeaea;color:#c4c4c4;cursor:default}
.kbd__check.is-press{background:var(--bg-brand-pressed,#0052cc);transform:scale(.985)}
.kbd__grid{display:flex;gap:4px;align-items:flex-end;width:100%;padding:0 16px}
.kbd__col{flex:1 0 0;min-width:0;display:flex;flex-direction:column;gap:4px}
.kbd__key{height:62px;display:flex;align-items:center;justify-content:center;padding:4px;border-radius:12px;background:#fff;cursor:pointer;font:400 24px/29px "Halvar Mittelschrift";color:#0a0a0a;letter-spacing:-.5px;font-variant-numeric:tabular-nums lining-nums;user-select:none;transition:background .1s ease,transform .1s ease}
.kbd__key--op{background:var(--bg-accent-orange,#ff752c)}
.kbd__key img{width:24px;height:24px;display:block}
.kbd__key sup{font-size:15px;vertical-align:super;letter-spacing:0}
.kbd__frac{display:flex;flex-direction:column;align-items:center;font-size:18px;line-height:1}
.kbd__frac b{font-weight:400}
.kbd__frac em{display:block;width:16px;height:1.5px;background:#0a0a0a;margin:2px 0}
.kbd__key.is-press{background:#eaeaea;transform:scale(.96)}
.kbd__key--op.is-press{background:#e0641f}
.kbd__dots{display:flex;gap:2px;align-items:center;justify-content:center;padding:4px 0}
.kbd__dots i{width:16px;height:16px;display:flex;align-items:center;justify-content:center}
.kbd__dots i::before{content:"";width:8px;height:8px;border-radius:50%;background:#d6d6d6}
.kbd__dots i.on::before{background:#0a0a0a}
/* success — Figma 428:19378 */
.scr--success{padding:0;display:flex;flex-direction:column;background:#f5f5f5}
.succ-nav{display:flex;justify-content:flex-end;padding:54px 16px 8px}
.succ-state{flex:1;display:flex;flex-direction:column;gap:32px;align-items:center;justify-content:center;padding:8px 24px 40px;min-height:0}
.succ-textblock{display:flex;flex-direction:column;gap:16px;align-items:center;width:100%}
.succ-char{width:182px;height:250px;position:relative}
.succ-char iframe{width:100%;height:100%;border:0;background:transparent;display:block}
.succ-ttl{font:700 24px/28px "Platform LC";color:#0a0a0a;text-align:center;margin:0}
.succ-sub{font:400 18px/23px "Halvar Mittelschrift";color:#4a4a4a;text-align:center}
.succ-reward{display:flex;gap:12px;align-items:center}
.succ-rew{display:flex;gap:4px;align-items:center;font:700 18px/23px "Halvar Mittelschrift";color:#0a0a0a}
.succ-rew img{width:24px;height:24px;display:block}
.succ-metrics{width:327px}
.succ-cta{display:flex;flex-direction:column;gap:12px;padding:12px 16px;width:100%}
/* staggered reveal */
.succ-rv{opacity:0;transform:translateY(16px);transition:opacity .42s ease,transform .5s cubic-bezier(.34,1.56,.64,1)}
.succ-rv.on{opacity:1;transform:none}
/* streak */
.st-mid{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%}
.fire{position:relative;width:150px;height:150px;margin-bottom:4px}
.fire img{width:100%;height:100%;object-fit:contain}
.fire b{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:30px;font:700 54px/1 "Platform LC";color:#fff}
.st-d{font:700 30px/1 "Platform LC";color:#0a0a0a}
.st-p{font:400 15px/1.35 "Halvar Mittelschrift";color:#4a4a4a;margin:10px 0 20px}
.st-week{display:flex;gap:9px;margin-bottom:22px}
.st-week i{width:32px;height:32px;border-radius:999px;background:#eaeaea;display:flex;align-items:center;justify-content:center;font:700 11px/1 "Halvar Mittelschrift";color:#b4b4b4;font-style:normal}
.st-week i.on{background:var(--bg-status-warning,#f5b300);color:#fff}
.star{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 2.2l2.85 6.06 6.65.62-5 4.45 1.46 6.52L12 16.9 6.04 20.37l1.46-6.52-5-4.45 6.65-.62z' fill='%23EAEAEA'/></svg>")}
.star.on{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 2.2l2.85 6.06 6.65.62-5 4.45 1.46 6.52L12 16.9 6.04 20.37l1.46-6.52-5-4.45 6.65-.62z' fill='%23FFD200' stroke='%23E1B502' stroke-width='1' stroke-linejoin='round'/></svg>")}
/* ===== showreel polish ===== */
.kbd__key{transition:background .09s ease,transform .1s cubic-bezier(.34,1.56,.64,1),box-shadow .1s ease}
.kbd__key.is-press{transform:scale(.86);background:#e3e3e3;box-shadow:inset 0 2px 7px rgba(0,0,0,.18)}
.kbd__key--op.is-press{background:#d2551a;box-shadow:inset 0 2px 9px rgba(0,0,0,.28)}
.kbd__check.is-press{transform:scale(.97)}
.promo__buy,.cta__btn--brand{box-shadow:0 10px 24px -12px rgba(0,82,204,.65)}
/* dramatic heart break */
.tnav-hearts{overflow:visible}
.tnav-hearts.shake{animation:heartShake .55s cubic-bezier(.36,.07,.19,.97)}
@keyframes heartShake{0%,100%{transform:translateX(0) rotate(0) scale(1)}15%{transform:translateX(-3px) rotate(-13deg) scale(1.18)}30%{transform:translateX(3px) rotate(11deg) scale(1.12)}45%{transform:translateX(-3px) rotate(-8deg) scale(1.13)}60%{transform:translateX(2px) rotate(6deg) scale(1.05)}80%{transform:translateX(-1px) rotate(-2deg) scale(1)}}
.tnav-hearts::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:2px solid #ff4a4a;opacity:0;pointer-events:none}
.tnav-hearts.shake::after{animation:heartRing .55s ease-out}
@keyframes heartRing{0%{opacity:.85;transform:scale(.5)}100%{opacity:0;transform:scale(1.8)}}
.heart-minus{position:absolute;left:50%;top:-2px;transform:translateX(-50%);font:700 14px/1 "Halvar Mittelschrift";color:#ff4a4a;opacity:0;pointer-events:none;z-index:5}
.tnav-hearts.shake .heart-minus{animation:heartMinus .95s ease-out}
@keyframes heartMinus{0%{opacity:0;transform:translate(-50%,0) scale(.6)}25%{opacity:1}100%{opacity:0;transform:translate(-50%,-28px) scale(1.1)}}
/* confetti */
.confetti{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:40}
.confetti i{position:absolute;top:-14px;width:9px;height:14px;border-radius:2px;opacity:0;will-change:transform}
.confetti.go i{animation:confFall var(--d,2.5s) cubic-bezier(.2,.6,.3,1) forwards;animation-delay:var(--delay,0s)}
@keyframes confFall{0%{opacity:0;transform:translateY(-12px) rotate(0)}8%{opacity:1}100%{opacity:0;transform:translateY(620px) rotate(var(--r,540deg))}}
/* success character glow */
.succ-char{z-index:1}
.succ-char::after{content:"";position:absolute;inset:-14% -10%;border-radius:50%;z-index:-1;background:radial-gradient(circle,rgba(0,102,254,.20),transparent 64%);animation:ambient 4s ease-in-out infinite}
/* sound toggle */
.sndbtn{position:fixed;bottom:24px;right:24px;z-index:200;width:44px;height:44px;border-radius:999px;border:1px solid #d6d6d6;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);box-shadow:0 6px 18px -8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#0a0a0a;padding:0}
.sndbtn svg{width:18px;height:18px;display:block}
/* radio-question Trainer (Figma 475:7106) */
.scr--radio{padding:54px 0 0;display:flex;flex-direction:column}
.rnav{width:100%}
.rnav-slot{flex:1 0 0;min-width:0;display:flex;align-items:center}
.rnav-slot--end{justify-content:flex-end}
.rnav-btn{height:40px;width:52px;border-radius:999px;background:#fff;border:1px solid #eaeaea;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;flex-shrink:0}
.rbody{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:8px;padding:8px 0 8px 16px}
.rprompt{width:343px;margin:0;font:400 18px/23px "Halvar Mittelschrift";color:#0a0a0a}
.rlist{width:343px;background:#fff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.ritem{display:flex;align-items:center;gap:8px;min-height:58px;padding:16px;width:100%;background:none;border:0;cursor:pointer;text-align:left;font-family:"Halvar Mittelschrift"}
.ritem + .ritem{border-top:1px solid #eaeaea}
.ritem__radio{flex-shrink:0;width:24px;height:24px;position:relative}
.ritem__radio::before{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:999px;border:2px solid #eaeaea;background:#fff;box-sizing:border-box;transition:border-color .15s ease,border-width .15s ease}
.ritem__label{flex:1 1 auto;font:400 18px/23px "Halvar Mittelschrift";color:#0a0a0a}
.ritem__chev{flex-shrink:0;width:24px;height:24px;display:flex;align-items:center;justify-content:center}
.ritem.is-sel .ritem__radio::before{border:6px solid var(--bg-brand,#0066fe)}
.kbd--dock{margin-top:0}
/* bare-screen frame for 1:1 Figma comparison (--radio build) */
.screenframe{position:relative;width:375px;height:812px;overflow:hidden;background:#f5f5f5;box-shadow:0 24px 60px -24px rgba(0,0,0,.25)}
.screenframe .scr{opacity:1;transform:none;position:absolute;inset:0;z-index:1}
.bannerframe{position:relative;width:359px;height:300px;background:transparent;display:flex;align-items:center;justify-content:center}
.bannerframe .promo{margin-top:0}
/* scroll-driven pinned-phone storytelling — camera zooms into the screen */
.scroller{position:relative;width:100%;height:600vh}
.sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.sticky .device{flex:0 0 auto;will-change:transform;transform-origin:50% 50%;transform:scale(.82)}
.sticky .scr{transition:opacity .8s cubic-bezier(.16,1,.3,1)!important;transform:none!important}
.sticky .scr.on{opacity:1!important}
.capwrap{position:absolute;left:0;right:0;bottom:5vh;display:flex;justify-content:center;z-index:80;pointer-events:none;padding:0 20px}
.cap{font:700 21px/1.3 "Platform LC";color:#0a0a0a;text-align:center;max-width:430px;padding:13px 26px;border-radius:999px;background:rgba(245,247,250,.7);backdrop-filter:blur(10px);box-shadow:0 12px 32px -16px rgba(8,24,64,.45);opacity:0;transform:translateY(14px) scale(.98);transition:opacity .55s ease,transform .7s cubic-bezier(.16,1,.3,1)}
.cap.show{opacity:1;transform:none}
.scrollhint{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:90;font:600 12px/1 "Halvar Mittelschrift";color:#7a7a7a;letter-spacing:.4px;display:flex;flex-direction:column;align-items:center;gap:7px;transition:opacity .4s}
.scrollhint i{width:22px;height:34px;border:2px solid #c4c4c4;border-radius:12px;position:relative;display:block}
.scrollhint i::after{content:"";position:absolute;left:50%;top:6px;width:3px;height:6px;border-radius:2px;background:#b4b4b4;transform:translateX(-50%);animation:scrolldot 1.5s ease-in-out infinite}
@keyframes scrolldot{0%,100%{opacity:1;top:6px}50%{opacity:.35;top:15px}}
@media (prefers-reduced-motion: reduce){ .scr,.cta__btn,.device,.stage::before{transition:none!important;animation:none!important} .scr{opacity:1;transform:none} }
`;

// Shared animation library — drives the components' OWN states (real pressed key,
// input fill, ⌫ clear, hearts 3→2 via broken-heart, Проверить → DS disabled,
// metric count-up). No faked overlays. Respects prefers-reduced-motion.
const FLOW_LIB = `
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=id=>document.getElementById(id);
const q=s=>document.querySelector(s);
const NB='\\u00a0';
const wait=ms=>new Promise(r=>setTimeout(r, reduce?0:ms));
let prevEl=null;
function show(id){const el=$(id);if(!el)return;el.style.zIndex=10;el.classList.add('on');
  if(prevEl&&prevEl!==el){const pp=prevEl;setTimeout(()=>{pp.classList.remove('on');pp.style.zIndex=1;}, reduce?0:460);}prevEl=el;}
const keyEl=k=>q('[data-key="'+k+'"]');
const curr=()=>{const t=$('answer').textContent.trim();return (t===''||t===NB)?'':t;};
const setAns=v=>{$('answer').textContent=v||NB; $('checkBtn').classList.toggle('is-disabled', !v);};
function pressEl(el){return new Promise(r=>{if(!el)return r();el.classList.add('is-press');setTimeout(()=>{el.classList.remove('is-press');r();}, reduce?0:150);});}
async function typeD(d){sfx.press(); await pressEl(keyEl(d)); setAns(curr()+d);}
async function backsp(){sfx.press(); await pressEl(keyEl('back')); setAns(curr().slice(0,-1));}
async function pressCheck(){const c=$('checkBtn');c.classList.add('is-press'); await wait(160); c.classList.remove('is-press');}
async function loseHeart(){sfx.wrong(); const h=q('.tnav-hearts');h.classList.add('shake','is-loss'); await wait(520); h.classList.remove('shake','is-loss'); $('hearts').textContent='2';}
function resetTrainer(){setAns(''); $('hearts').textContent='3'; $('tnum').textContent='№1/15';}
async function solve(){
  await wait(700);
  await typeD('1'); await wait(260);
  await typeD('6'); await wait(560);
  await pressCheck(); $('checkBtn').classList.add('is-disabled'); await loseHeart(); await wait(760);
  await backsp(); await wait(220);
  await backsp(); await wait(460);
  await typeD('1'); await wait(260);
  await typeD('7'); await wait(560);
  await pressCheck(); sfx.correct(); $('tnum').textContent='№2/15'; await wait(700);
}
function countUp(el){const to=+el.dataset.to,suf=el.dataset.suffix||'';if(reduce){el.textContent=to+suf;return;}const t0=performance.now();(function f(t){const p=Math.min((t-t0)/700,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f);})(t0);}
function resetSuccess(){
  document.querySelectorAll('#success .metric__val[data-to]').forEach(el=>el.textContent=(el.dataset.suffix?'0'+el.dataset.suffix:'0'));
  document.querySelectorAll('#success .succ-rv').forEach(el=>el.classList.remove('on'));
  const cf=$('confetti'); if(cf){cf.classList.remove('go'); cf.innerHTML='';}
}
// staggered reveal: char+title → reward → metrics one-by-one → confetti+buttons
async function successSeq(){
  const on=sel=>{const e=document.querySelector('#success '+sel); if(e)e.classList.add('on');};
  on('.succ-char'); on('.succ-ttl'); on('.succ-sub'); await wait(580);
  on('.succ-reward'); sfx.correct(); await wait(480);
  const ms=document.querySelectorAll('#success .succ-metrics .metric');
  for(let k=0;k<ms.length;k++){ ms[k].classList.add('on'); const v=ms[k].querySelector('.metric__val[data-to]'); if(v)countUp(v); sfx.press(); await wait(440); }
  await wait(160);
  on('.succ-cta'); confetti(); sfx.levelup();
}
function resetRadio(){ document.querySelectorAll('#trainer-radio .ritem').forEach(i=>i.classList.remove('is-sel')); }
async function radioSolve(){
  await wait(800);
  const items=document.querySelectorAll('#trainer-radio .ritem');
  if(items.length){ items[items.length-1].classList.add('is-sel'); sfx.press(); }
  await wait(950);
  const c=document.querySelector('#trainer-radio .kbd__check'); if(c){ c.classList.add('is-press'); await wait(170); c.classList.remove('is-press'); }
  sfx.correct(); await wait(700);
}
async function mainTap(){const c=q('#main .cta-tap');if(c){c.classList.add('tap'); await wait(450); c.classList.remove('tap');}}
/* confetti burst on success */
function confetti(){const c=$('confetti'); if(!c||reduce)return; const cols=['#0066fe','#FFD200','#ff752c','#00b53f','#8b2cff']; c.innerHTML='';
  for(let i=0;i<48;i++){const p=document.createElement('i'); p.style.left=(Math.random()*100)+'%'; p.style.background=cols[i%cols.length];
    p.style.setProperty('--delay',(Math.random()*0.5)+'s'); p.style.setProperty('--d',(2+Math.random()*1.4)+'s'); p.style.setProperty('--r',(360+Math.random()*560)+'deg'); c.appendChild(p);}
  c.classList.remove('go'); void c.offsetWidth; c.classList.add('go');}
/* synthesized SFX (WebAudio) — off until the sound button is tapped (browser policy) */
let actx=null, muted=true;
function blip(freq,dur,type,gain,when){ if(!actx||muted)return; const t=actx.currentTime+(when||0); const o=actx.createOscillator(),g=actx.createGain();
  o.type=type; o.frequency.setValueAtTime(freq,t); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(gain,t+0.008); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t+dur+0.03); }
const sfx={
  press:()=>blip(430,0.06,'square',0.05),
  wrong:()=>{blip(200,0.16,'sawtooth',0.07); blip(140,0.22,'sawtooth',0.06,0.08);},
  correct:()=>{blip(660,0.12,'sine',0.07); blip(990,0.16,'sine',0.06,0.09);},
  levelup:()=>{[523,659,784,1047,1319].forEach((f,i)=>blip(f,0.2,'triangle',0.06,i*0.1));}
};
(function(){const sb=$('sndbtn'); if(!sb)return; sb.innerHTML=${JSON.stringify(SND_ICON_OFF)};
  sb.addEventListener('click',()=>{ if(!actx)actx=new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==='suspended')actx.resume(); muted=!muted; sb.innerHTML=muted?${JSON.stringify(SND_ICON_OFF)}:${JSON.stringify(SND_ICON_ON)}; });})();
`;

// scroll.html — pinned phone; camera scrubs/zooms into the active region by scroll.
// Continuous camera (rAF-damped lerp) over keyframes; chapters crossfade at the calm
// (~scale 1.0) borders so a switch never lands mid-deep-zoom.
const SCROLL_BOOT = `
const chapters=['main','trainer','success','streak'];
const caps=['Персональный AI-тренажёр по математике','Решает задачу — и сразу видит разбор','Награда за результат, а не за «посидел»','Возвращается каждый день за стриком'];
const KEYS=[
  {p:0.00,s:0.82,ox:50,oy:50},
  {p:0.20,s:0.92,ox:50,oy:50},
  {p:0.26,s:1.00,ox:50,oy:48},
  {p:0.44,s:1.15,ox:50,oy:45},
  {p:0.50,s:1.00,ox:50,oy:48},
  {p:0.70,s:1.12,ox:50,oy:45},
  {p:0.76,s:0.99,ox:50,oy:50},
  {p:1.00,s:0.90,ox:50,oy:50}
];
const device=document.querySelector('.sticky .device');
let targetP=0, active=-1;
const cur={s:0.82,ox:50,oy:50};
const lerp=(a,b,t)=>a+(b-a)*t;
function camAt(p){
  for(let i=0;i<KEYS.length-1;i++){const a=KEYS[i],b=KEYS[i+1];
    if(p>=a.p&&p<=b.p){const t=(p-a.p)/((b.p-a.p)||1);const e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
      return {s:lerp(a.s,b.s,e),ox:lerp(a.ox,b.ox,e),oy:lerp(a.oy,b.oy,e)};}}
  const L=KEYS[KEYS.length-1];return {s:L.s,ox:L.ox,oy:L.oy};
}
function tick(){
  const t=camAt(targetP);
  cur.s=lerp(cur.s,t.s,0.11);cur.ox=lerp(cur.ox,t.ox,0.11);cur.oy=lerp(cur.oy,t.oy,0.11);
  if(device){device.style.transformOrigin=cur.ox.toFixed(2)+'% '+cur.oy.toFixed(2)+'%';device.style.transform='scale('+cur.s.toFixed(4)+')';}
  requestAnimationFrame(tick);
}
async function chapterAnim(id){
  if(id==='trainer'){ resetTrainer(); await wait(520); await typeD('1'); await wait(230); await typeD('7'); await wait(540); await pressCheck(); sfx.correct(); }
  else if(id==='success'){ resetSuccess(); successSeq(); }
}
function setChapter(i){
  chapters.forEach((id,k)=>{const el=$(id); if(el) el.classList.toggle('on', k===i);});
  const cap=$('cap'); if(cap){ cap.textContent=caps[i]; cap.classList.remove('show'); void cap.offsetWidth; cap.classList.add('show'); }
  chapterAnim(chapters[i]);
}
function onScroll(){
  const sec=document.querySelector('.scroller'); if(!sec) return;
  const r=sec.getBoundingClientRect(); const total=sec.offsetHeight-window.innerHeight;
  const p=Math.min(Math.max(-r.top/total,0),0.9999);
  targetP=p;
  const idx=Math.min(chapters.length-1, Math.floor(p*chapters.length));
  if(idx!==active){ active=idx; setChapter(idx); const hint=document.querySelector('.scrollhint'); if(hint) hint.style.opacity = idx>0? '0':'.85'; }
}
// ?auto=SECONDS drives the camera 0→1 on its own (for screen-recording); ?delay=MS
// holds the opening frame before it starts. Otherwise the page is scroll-driven.
const _P=new URLSearchParams(location.search);
const AUTO=+(_P.get('auto')||0), DELAY=+(_P.get('delay')||600);
setChapter(0);
if(reduce){ if(device) device.style.transform='scale(.85)'; }
else {
  requestAnimationFrame(tick);
  if(AUTO>0){
    const hint=document.querySelector('.scrollhint'); if(hint) hint.style.display='none';
    let t0=null;
    function drive(ts){ if(t0===null)t0=ts; const p=Math.min((ts-t0)/1000/AUTO,0.9999); targetP=p;
      const idx=Math.min(chapters.length-1, Math.floor(p*chapters.length));
      if(idx!==active){ active=idx; setChapter(idx); }
      if(p<0.9999) requestAnimationFrame(drive); }
    setTimeout(()=>requestAnimationFrame(drive), DELAY);
  } else {
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    requestAnimationFrame(onScroll);
  }
}
`;

// trainer.html — loop the solve scenario only
const TRAINER_BOOT = `
(async()=>{ if(reduce){setAns('17');return;} while(true){ resetTrainer(); await solve(); await wait(1100);} })();
`;

// hero-flow.html — master loop across the 4 screens
const FLOW_BOOT = `
async function flow(){ while(true){
  resetTrainer(); resetSuccess(); resetRadio();
  show('main'); await wait(1700);
  await mainTap(); await wait(320);
  show('trainer'); await wait(560);
  await solve(); await wait(300);
  show('trainer-radio'); await wait(560);
  await radioSolve(); await wait(280);
  show('success'); successSeq(); await wait(4400);
  show('streak'); await wait(2800);
}}
if(reduce){ show('main'); resetTrainer(); } else { show('main'); flow(); }
`;

const SCREENS = PHASE1
  ? TRAINER.replace('class="scr scr--trainer"', 'class="scr scr--trainer on"')
  : `${MAIN}${TRAINER}${TRAINER_RADIO}${SUCCESS}${STREAK}`;
const SCRIPT = PHASE1
  ? `<script>${FLOW_LIB}${TRAINER_BOOT}</script>`
  : SCROLL
  ? `<script>${FLOW_LIB}${SCROLL_BOOT}</script>`
  : `<script>${FLOW_LIB}${FLOW_BOOT}</script>`;

// RADIO/BANNER builds = bare screens (no device chrome) for 1:1 Figma comparison.
const BODY = SCROLL
  ? `<div class="scroller"><div class="sticky">
<div class="device"><div class="viewport"><div class="notch"></div>${SBAR}${MAIN}${TRAINER}${SUCCESS}${STREAK}</div></div>
<div class="capwrap"><div class="cap" id="cap"></div></div>
</div></div>
<div class="scrollhint"><i></i>Скролль вниз</div>`
  : BANNER
  ? `<div class="bannerframe">${PROMO}</div>`
  : RADIO
  ? `<div class="screenframe">${SBAR}${TRAINER_RADIO.replace('class="scr scr--radio"', 'class="scr scr--radio on"')}</div>`
  : `<div class="stage">
<div class="device"><div class="viewport"><div class="notch"></div>
${SBAR}
${SCREENS}
</div></div>
</div>
${PHASE1 ? "" : `<button class="sndbtn" id="sndbtn" aria-label="Звук">${SND_ICON_OFF}</button>`}`;

const HTML = `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Qalan — ${RADIO ? "Trainer radio (static)" : PHASE1 ? "Trainer (static)" : "hero flow"}</title>
<style>${FONTFACE}</style>
<style>${TOK}</style>
<style>${BASE}</style>
<style>${DEVICE_CSS}</style>
</head><body${RADIO ? ' style="background:#c9ccd3"' : BANNER ? ' style="background:#f5f5f5"' : SCROLL ? ' style="display:block;overflow-x:hidden;overflow-y:auto;min-height:0;background:#eaedf3"' : ""}>
${BODY}
${RADIO || BANNER ? "" : SCRIPT}
</body></html>`;

const out = join(REPO, "landing", "public", SCROLL ? "scroll.html" : BANNER ? "banner.html" : RADIO ? "trainer-radio.html" : PHASE1 ? "trainer.html" : "hero-flow.html");
writeFileSync(out, HTML, "utf-8");
console.log("wrote", out, (HTML.length / 1024).toFixed(0) + "kb");
