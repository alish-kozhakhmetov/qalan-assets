// Qalan wordmark. Black on light per spec; supports inverse (on brand bg).
export function Logo({ inverse = false, className = "" }: { inverse?: boolean; className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Qalan — на главную"
      className={`font-display text-2xl font-bold leading-none tracking-tight ${
        inverse ? "text-white" : "text-ink"
      } ${className}`}
    >
      Qalan
    </a>
  );
}
