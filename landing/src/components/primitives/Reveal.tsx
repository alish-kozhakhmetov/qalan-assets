import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, inView } from "../../lib/motion";

/** Scroll-in fade-up wrapper. Use for one-off elements; for lists wrap a
 *  staggerParent motion element and give children the `fadeUp` variant. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      {...inView}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
