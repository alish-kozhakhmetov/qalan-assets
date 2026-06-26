import { motion, useReducedMotion } from "framer-motion";
import { HERO } from "../lib/site";
import { fadeUp, headlineContainer, headlineWord, staggerParent } from "../lib/motion";
import { StoreBadges } from "./primitives/StoreBadges";
import { MediaSlot } from "./primitives/MediaSlot";

export function Hero() {
  const reduce = useReducedMotion();
  const lead = HERO.headlineLead.split(" ");
  const brand = HERO.headlineBrand.split(" ");

  return (
    <section id="top" className="relative overflow-hidden">
      <BackgroundDecor reduce={!!reduce} />

      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:py-24">
        {/* text column */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 font-sans text-[13px] font-bold text-brand"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {HERO.eyebrow}
          </motion.span>

          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-[18ch] font-display text-[clamp(2.6rem,5.2vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-ink"
          >
            {lead.map((w, i) => (
              <motion.span key={`l-${i}`} variants={headlineWord} className="mr-[0.25em] inline-block">
                {w}
              </motion.span>
            ))}
            {brand.map((w, i) => (
              <motion.span key={`b-${i}`} variants={headlineWord} className="mr-[0.25em] inline-block text-brand">
                {w}
                {i === brand.length - 1 ? "." : ""}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-[52ch] font-sans text-lg leading-relaxed text-ink-secondary">
            {HERO.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#start" className="btn btn--l btn--primary">
              {HERO.ctaPrimary}
            </a>
            <span className="flex items-center gap-2 font-sans text-[15px] text-ink-secondary">
              <CheckBadge />
              {HERO.ctaNote}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7">
            <StoreBadges />
          </motion.div>
        </motion.div>

        {/* media column — labelled empty app-screenshot slot in a device frame */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[300px] rounded-[44px] border border-line bg-graphit-900 p-[10px] shadow-[0_40px_80px_-30px_rgba(0,60,160,0.4)] sm:w-[330px]"
          >
            <div className="absolute left-1/2 top-[18px] z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-graphit-900" />
            <MediaSlot label={HERO.mediaLabel} variant="image" className="aspect-[300/620] w-full rounded-[34px]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BackgroundDecor({ reduce }: { reduce: boolean }) {
  const float = (delay: number) =>
    reduce ? undefined : { y: [0, -14, 0], transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const, delay } };
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-28 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="absolute right-[-6rem] top-24 h-96 w-96 rounded-full bg-brand-50 blur-3xl" />
      <motion.div animate={float(0)} className="absolute left-[6%] top-[34%] hidden h-12 w-12 rounded-2xl bg-accent-orange/15 lg:block" />
      <motion.div animate={float(0.8)} className="absolute right-[16%] top-[14%] hidden h-9 w-9 rounded-full bg-brand-200 lg:block" />
      <motion.div animate={float(1.6)} className="absolute right-[8%] bottom-[12%] hidden h-7 w-7 rounded-lg bg-[color:var(--green-300)] lg:block" />
    </div>
  );
}

function CheckBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[color:var(--green-500)]">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
