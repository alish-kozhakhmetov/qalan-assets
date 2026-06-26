import { motion } from "framer-motion";
import { TRUST } from "../lib/site";
import { fadeUp, inView, staggerParent } from "../lib/motion";
import { useCountUp, formatRu } from "../lib/useCountUp";

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page py-12">
        <motion.div
          variants={staggerParent}
          {...inView}
          className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
        >
          {TRUST.stats.map((s, i) => (
            <Stat key={i} {...s} />
          ))}
        </motion.div>
        <p className="mt-8 text-center font-sans text-xs text-ink-tertiary">{TRUST.note}</p>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix = "",
  prefix = "",
  label,
  raw = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  raw?: boolean;
}) {
  const { ref, value: n } = useCountUp(value);
  const display = raw ? `${prefix}${value}${suffix}` : `${prefix}${formatRu(n)}${suffix}`;
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
      <span ref={ref} className="font-display text-[clamp(2rem,3.4vw,2.9rem)] font-bold leading-none text-brand">
        {display}
      </span>
      <span className="mt-2 font-sans text-[15px] text-ink-secondary">{label}</span>
    </motion.div>
  );
}
