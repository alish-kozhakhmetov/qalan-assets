import { motion, useReducedMotion } from "framer-motion";
import { GAME } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { SectionHeading } from "./primitives/SectionHeading";
import { MediaSlot } from "./primitives/MediaSlot";

export function Gamification() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[60%] -translate-x-1/2 rounded-full bg-brand-50 blur-3xl" />
      </div>

      <div className="container-page relative flex flex-col items-center">
        <SectionHeading eyebrow={GAME.eyebrow} title={GAME.title} subtitle={GAME.subtitle} />

        {/* mechanics */}
        <motion.div variants={staggerParent} {...inView} className="mt-14 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GAME.mechanics.map((m) => (
            <motion.div
              key={m.title}
              variants={fadeUp}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(0,40,120,0.22)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas shadow-sm">
                <img src={m.icon} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" loading="lazy" />
              </span>
              <h3 className="font-display text-lg font-bold text-ink">{m.title}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-ink-secondary">{m.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* character cards */}
        <motion.div variants={staggerParent} {...inView} className="mt-6 grid w-full gap-5 md:grid-cols-3">
          {GAME.characters.map((c) => (
            <CharacterCard key={c.name} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CharacterCard({ name, role, stars }: { name: string; role: string; stars: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-xl border border-line bg-surface p-5 transition-shadow duration-200 hover:shadow-[0_26px_60px_-26px_rgba(0,70,200,0.45)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <MediaSlot label={`Рендер: ${name}`} variant="character" className="aspect-[4/5] w-full" />
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{name}</h3>
          <p className="font-sans text-[13px] text-ink-secondary">{role}</p>
        </div>
        <div className="flex items-center gap-0.5" aria-label={`${stars} из 3 звёзд`}>
          {[0, 1, 2].map((i) => (
            <StarIcon key={i} filled={i < stars} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "var(--yellow-500)" : "var(--graphit-200)"} aria-hidden="true">
      <path d="M12 2l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.8z" />
    </svg>
  );
}
