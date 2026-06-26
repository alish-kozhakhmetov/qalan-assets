import { motion } from "framer-motion";
import { HOW } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { SectionHeading } from "./primitives/SectionHeading";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page flex flex-col items-center">
        <SectionHeading eyebrow={HOW.eyebrow} title={HOW.title} subtitle={HOW.subtitle} />

        <motion.ol
          variants={staggerParent}
          {...inView}
          className="mt-14 grid w-full gap-6 md:grid-cols-3"
        >
          {HOW.steps.map((s) => (
            <motion.li
              key={s.n}
              variants={fadeUp}
              className="group relative flex flex-col gap-4 rounded-xl border border-line bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(0,40,120,0.25)]"
            >
              <span className="font-display text-5xl font-bold text-brand-200 transition-colors group-hover:text-brand">
                {s.n}
              </span>
              <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
              <p className="font-sans text-[15px] leading-relaxed text-ink-secondary">{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
