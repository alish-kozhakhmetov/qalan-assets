import { motion } from "framer-motion";
import { PARENTS } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { MediaSlot } from "./primitives/MediaSlot";

export function ForParents() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* media slot */}
        <motion.div variants={fadeUp} {...inView} className="order-2 lg:order-1">
          <div className="rounded-2xl border border-line bg-canvas p-3 shadow-[0_30px_70px_-40px_rgba(0,40,120,0.35)]">
            <MediaSlot label={PARENTS.mediaLabel} variant="image" className="aspect-[4/3] w-full rounded-xl" />
          </div>
        </motion.div>

        {/* copy + features */}
        <motion.div variants={staggerParent} {...inView} className="order-1 flex flex-col gap-6 lg:order-2">
          <motion.span
            variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 font-sans text-[13px] font-bold uppercase tracking-wide text-brand"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {PARENTS.eyebrow}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-[clamp(1.8rem,3.2vw,2.7rem)] font-bold leading-[1.1] tracking-tight text-ink">
            {PARENTS.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-lg leading-relaxed text-ink-secondary">
            {PARENTS.subtitle}
          </motion.p>

          <motion.div variants={staggerParent} className="mt-2 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {PARENTS.features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="flex gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-canvas shadow-sm">
                  <img src={f.icon} alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" loading="lazy" />
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-bold text-ink">{f.title}</h3>
                  <p className="font-sans text-[14px] leading-relaxed text-ink-secondary">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
