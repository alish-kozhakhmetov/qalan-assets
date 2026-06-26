import "./appFlow.css";
import { AppTopNav } from "./AppTopNav";

/**
 * Qalan app — MAIN screen (student / Тренажёр tab).
 * Rebuilt on the real DS (base.css values, scoped in appFlow.css) per the
 * hero-flow handoff. Markup mirrors the verified prototype (qalan-flow):
 * Top nav · promo Trainer-block · level/character row · bottom nav.
 *
 * Character render is a clearly-labelled empty slot (asset pending).
 * Renders at native 375px width; the hero scales it to fit the device.
 */
export function AppMain() {
  return (
    <div className="app-screen">
      <AppTopNav />

      <div className="app-main">
        <div className="mainbody">
          {/* promo "Trainer block" — notched white card */}
          <div className="tblock">
            <div className="tblock__back">
              <NotchCard />
            </div>
            <div className="tblock__head">
              <div className="tblock__pill">
                <span>AI-тренажёр</span>
              </div>
              <h1 className="tblock__title">Персональное обучение математике</h1>
            </div>
            <div className="feat-row">
              <Feat icon="/icons/feat-mentors-on.png" label="Менторы" />
              <Feat icon="/icons/feat-aichat-on.png" label="AI-чат" />
              <Feat icon="/icons/feat-cashback-on.png" label="Кешбек" />
            </div>
            <div className="tblock__cta">
              <button className="cta__btn cta__btn--brand">
                Начать бесплатно
                <span className="btn__icon">
                  <Chevron />
                </span>
              </button>
            </div>
          </div>

          {/* level / character row */}
          <div className="lvlrow">
            <div className="lvl">
              <div className="lvl__tag">ОБЫЧНЫЙ</div>
              <div className="lvl__name">Амина</div>
              <div className="lvl__stars">
                <Star on />
                <Star />
                <Star />
                <Star />
              </div>
              <button className="cta__btn cta__btn--brand lvl__btn">Прокачать</button>
            </div>
            <div className="charslot">
              Амина
              <span>персонаж · GIF</span>
              <span className="tag">ассет в работе</span>
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <div className="bnav">
          <div className="bnav__row">
            <div className="btab btab--text">
              <span className="btab__label">Курсы</span>
            </div>
            <div className="btab btab--text btab--on">
              <span className="btab__label">Тренажёр</span>
              <span className="btab__dot" />
            </div>
            <div className="btab btab--text">
              <span className="btab__label">Магазин</span>
            </div>
          </div>
        </div>
        <div className="nav-safe" />
      </div>
    </div>
  );
}

function Feat({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="feat">
      <div className="feat__ico">
        <img src={icon} alt="" />
      </div>
      <div className="feat__label">{label}</div>
    </div>
  );
}

function Star({ on = false }: { on?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.2l2.85 6.06 6.65.62-5 4.45 1.46 6.52L12 16.9 6.04 20.37l1.46-6.52-5-4.45 6.65-.62z"
        fill={on ? "#FFD200" : "#EAEAEA"}
        stroke={on ? "#E1B502" : "none"}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** Notched promo-card background (base.css .tblock__back master shape). */
function NotchCard() {
  return (
    <svg viewBox="0 0 343 305" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M126 0C130.859 0 135.293 1.82427 138.653 4.82533C148.447 13.5742 153.344 17.9486 154.722 18.4743C156.1 19 157.733 19 161 19H295C317.627 19 328.941 19 335.971 26.0293C343 33.0587 343 44.3726 343 67V257C343 279.627 343 290.941 335.971 297.971C328.941 305 317.627 305 295 305H48C25.3726 305 14.0587 305 7.0293 297.971C-0.0001 290.941 0 279.627 0 257V67C0 44.3726 -0.0001 33.0587 7.0293 26.0293C10.0306 23.028 13.8134 21.3103 18.9239 20.325C19.5531 20.2037 20 19.6408 20 19C20 8.50659 28.5066 0 39 0H126Z"
        fill="white"
      />
    </svg>
  );
}
