import { Logo } from "./Logo";
import { LangDropdown } from "./LangDropdown";
import { FOOTER } from "../lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          {/* brand + contacts */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs font-sans text-[15px] leading-relaxed text-ink-secondary">{FOOTER.tagline}</p>
            <div className="mt-1 flex flex-col gap-1.5 font-sans text-[15px]">
              <a href={`tel:${FOOTER.phone.replace(/[^+\d]/g, "")}`} className="font-bold text-ink transition-colors hover:text-brand">
                {FOOTER.phone}
              </a>
              <a href={`mailto:${FOOTER.email}`} className="text-ink-secondary transition-colors hover:text-brand">
                {FOOTER.email}
              </a>
              <span className="text-ink-tertiary">{FOOTER.hours}</span>
            </div>
          </div>

          {/* link columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="font-sans text-[13px] font-bold uppercase tracking-wide text-ink-tertiary">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="font-sans text-[15px] text-ink-secondary transition-colors hover:text-brand">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* lang */}
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-sans text-[13px] font-bold uppercase tracking-wide text-ink-tertiary">Язык</h3>
            <LangDropdown />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-[14px] text-ink-tertiary">© 2026 Qalan. Все права защищены.</p>
          <p className="font-sans text-[12px] text-ink-tertiary">{FOOTER.flag}</p>
        </div>
      </div>
    </footer>
  );
}
