import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ as FAQ_DATA } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { SectionHeading } from "./primitives/SectionHeading";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page flex flex-col items-center">
        <SectionHeading title={FAQ_DATA.title} />

        <motion.ul variants={staggerParent} {...inView} className="mt-12 w-full max-w-3xl">
          {FAQ_DATA.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li key={i} variants={fadeUp} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-display text-[18px] font-bold text-ink md:text-xl">{item.q}</span>
                  <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-subtle text-ink transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    <PlusIcon />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 font-sans text-[16px] leading-relaxed text-ink-secondary">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
