import { motion } from "framer-motion";
import { fadeUp, inView, staggerParent } from "../../lib/motion";

/** Eyebrow + title + optional subtitle, revealed with a small stagger. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <motion.div
      variants={staggerParent}
      {...inView}
      className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 font-sans text-[13px] font-bold uppercase tracking-wide text-brand"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="font-sans text-lg leading-relaxed text-ink-secondary">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
