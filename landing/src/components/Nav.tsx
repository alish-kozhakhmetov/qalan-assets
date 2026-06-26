import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";
import { LangDropdown } from "./LangDropdown";
import { NAV_LINKS } from "../lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-line bg-surface/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 font-sans text-[15px] font-medium text-ink-secondary transition-colors hover:bg-subtle hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LangDropdown />
          <a href="#login" className="btn btn--m btn--ghost">
            Войти
          </a>
          <a href="#start" className="btn btn--m btn--primary">
            Начать бесплатно
          </a>
        </div>

        <button
          type="button"
          aria-label="Открыть меню"
          aria-expanded={drawer}
          onClick={() => setDrawer(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle md:hidden"
        >
          <BurgerIcon />
        </button>
      </nav>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-surface p-5 shadow-xl md:hidden"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Закрыть меню"
                  onClick={() => setDrawer(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle"
                >
                  <CloseIcon />
                </button>
              </div>

              <ul className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setDrawer(false)}
                      className="block rounded-md px-3 py-3 font-sans text-lg font-medium text-ink transition-colors hover:bg-subtle"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <LangDropdown className="self-start" />
                <a href="#login" onClick={() => setDrawer(false)} className="btn btn--l btn--secondary w-full">
                  Войти
                </a>
                <a href="#start" onClick={() => setDrawer(false)} className="btn btn--l btn--primary w-full">
                  Начать бесплатно
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function BurgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
