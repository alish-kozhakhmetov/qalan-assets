import { motion } from "framer-motion";
import { REVIEWS } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { SectionHeading } from "./primitives/SectionHeading";
import { MediaSlot } from "./primitives/MediaSlot";

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <div className="container-page flex flex-col items-center">
        <SectionHeading title={REVIEWS.title} subtitle={REVIEWS.subtitle} />

        <motion.div variants={staggerParent} {...inView} className="mt-14 grid w-full gap-6 md:grid-cols-3">
          {REVIEWS.items.map((r) => (
            <motion.figure
              key={r.name}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-canvas p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_50px_-26px_rgba(0,40,120,0.3)]"
            >
              <MediaSlot label="Видео-отзыв" variant="video" className="aspect-[4/3] w-full" />
              <figcaption className="flex items-center gap-3 px-2 pb-1">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 font-display text-lg font-bold text-brand">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display text-[16px] font-bold text-ink">{r.name}</p>
                  <p className="font-sans text-[13px] text-ink-secondary">{r.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} {...inView} className="mt-10 text-center font-sans text-[15px] text-ink-secondary">
          {REVIEWS.proof}{" "}
          <span className="text-ink-tertiary">[{REVIEWS.proofFlag}]</span>
        </motion.p>
      </div>
    </section>
  );
}
