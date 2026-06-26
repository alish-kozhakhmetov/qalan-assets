import { motion } from "framer-motion";
import { FEATURES } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { SectionHeading } from "./primitives/SectionHeading";

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <div className="container-page flex flex-col items-center">
        <SectionHeading title={FEATURES.title} subtitle={FEATURES.subtitle} />

        <motion.div
          variants={staggerParent}
          {...inView}
          className="mt-14 grid w-full gap-5 md:grid-cols-3"
        >
          {FEATURES.cards.map((c, i) => (
            <FeatureCard key={i} {...c} featured={i === 0} />
          ))}

          {/* CTA filler — keeps the bento tidy and adds a mid-page entry point */}
          <motion.a
            href="#start"
            variants={fadeUp}
            className="group flex flex-col justify-between gap-6 rounded-xl border border-brand-200 bg-brand-50 p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(0,70,200,0.35)] md:col-span-1"
          >
            <p className="font-display text-xl font-bold leading-snug text-ink">
              Всё в одном приложении
            </p>
            <span className="inline-flex items-center gap-2 font-sans text-[15px] font-bold text-brand">
              Начать бесплатно
              <ArrowIcon />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  span,
  featured,
}: {
  icon: string;
  title: string;
  text: string;
  span?: boolean;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`group flex flex-col gap-4 rounded-xl border p-7 transition-all duration-200 hover:-translate-y-1 ${
        span ? "md:col-span-2" : "md:col-span-1"
      } ${
        featured
          ? "border-transparent bg-brand text-white hover:shadow-[0_22px_50px_-20px_rgba(0,70,200,0.6)]"
          : "border-line bg-canvas hover:shadow-[0_18px_40px_-22px_rgba(0,40,120,0.22)]"
      }`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
          featured ? "bg-white/15" : "bg-surface shadow-sm"
        }`}
      >
        <img src={icon} alt="" width={36} height={36} className="h-9 w-9 object-contain" loading="lazy" />
      </span>
      <h3 className={`font-display text-xl font-bold ${featured ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`font-sans text-[15px] leading-relaxed ${featured ? "text-brand-100" : "text-ink-secondary"}`}>
        {text}
      </p>
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
