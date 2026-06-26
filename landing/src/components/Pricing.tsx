import { motion, useReducedMotion } from "framer-motion";
import { PRICING } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { SectionHeading } from "./primitives/SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page flex flex-col items-center">
        <SectionHeading title={PRICING.title} subtitle={PRICING.subtitle} />

        <motion.div
          variants={staggerParent}
          {...inView}
          className="mt-14 grid w-full items-stretch gap-6 md:grid-cols-3"
        >
          {PRICING.tiers.map((t) => (
            <PriceCard key={t.name} tier={t} />
          ))}
        </motion.div>

        <p className="mt-8 text-center font-sans text-xs text-ink-tertiary">{PRICING.note}</p>
      </div>
    </section>
  );
}

function PriceCard({ tier }: { tier: (typeof PRICING.tiers)[number] }) {
  const reduce = useReducedMotion();
  const featured = tier.featured;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`relative flex flex-col rounded-2xl border p-7 ${
        featured
          ? "border-brand bg-surface shadow-[0_30px_70px_-30px_rgba(0,80,220,0.55)] ring-2 ring-brand/30 md:-mt-3 md:mb-[-12px]"
          : "border-line bg-surface"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 font-sans text-[12px] font-bold text-white shadow-sm">
          Популярный
        </span>
      )}

      <h3 className="font-display text-xl font-bold text-ink">{tier.name}</h3>
      <p className="mt-1 min-h-[40px] font-sans text-[14px] leading-snug text-ink-secondary">{tier.desc}</p>

      <div className="mt-5 flex items-end gap-1.5">
        <span className="font-display text-4xl font-bold text-ink">{tier.price}</span>
        <span className="pb-1 font-sans text-[15px] text-ink-secondary">{tier.period}</span>
      </div>
      {"priceFlag" in tier && tier.priceFlag && (
        <span className="mt-1 font-sans text-[11px] text-ink-tertiary">цену уточнить</span>
      )}

      <a
        href="#start"
        className={`btn btn--l mt-6 w-full ${featured ? "btn--primary" : "btn--secondary"}`}
      >
        {tier.cta}
      </a>

      <ul className="mt-7 flex flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-sans text-[15px] text-ink">
            <CheckIcon />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0 text-[color:var(--green-500)]">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
