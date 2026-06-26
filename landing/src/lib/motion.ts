import type { Variants } from "framer-motion";

/** Smooth ease-out used across the site (restrained, springy feel per spec). */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Headline: parent staggers word children. */
export const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/** Each word: blur→sharp fade-up. */
export const headlineWord: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
};

/** Generic fade-up item. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Container that staggers fade-up children on scroll-in. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Standard whileInView props for section reveals. */
export const inView = {
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, amount: 0.2 },
};
