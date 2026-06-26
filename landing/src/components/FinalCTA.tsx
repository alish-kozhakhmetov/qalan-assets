import { motion } from "framer-motion";
import { FINAL } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { StoreBadges } from "./primitives/StoreBadges";

export function FinalCTA() {
  return (
    <section id="start" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <motion.div
          variants={staggerParent}
          {...inView}
          className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-16 text-center md:px-16 md:py-20"
        >
          {/* decorative glow shapes */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand-700/40 blur-3xl" />
          </div>

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <motion.h2 variants={fadeUp} className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-white">
              {FINAL.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-brand-100">
              {FINAL.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <a href="#start" className="btn btn--l bg-white px-10 font-bold text-brand transition-colors hover:bg-brand-50">
                {FINAL.cta}
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7">
              <StoreBadges inverse />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-7 font-sans text-[14px] text-brand-100">
              {FINAL.proof} <span className="text-white/50">[{FINAL.proofFlag}]</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
