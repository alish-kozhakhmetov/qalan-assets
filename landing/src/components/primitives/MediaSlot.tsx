/**
 * Clean, clearly-labelled EMPTY media slot for assets we don't have yet
 * (app screenshots, character renders, parent videos). Per spec: a labelled
 * empty slot beats a fake/ugly product mock. No invented UI inside.
 */
export function MediaSlot({
  label,
  variant = "image",
  className = "",
  tone = "light",
}: {
  label: string;
  variant?: "image" | "video" | "character";
  className?: string;
  tone?: "light" | "brand";
}) {
  const toneCls =
    tone === "brand"
      ? "border-white/30 bg-white/10 text-white"
      : "border-line bg-canvas text-ink-tertiary";
  return (
    <div
      role="img"
      aria-label={`${label} — плейсхолдер, ассет в работе`}
      className={`group relative grid place-items-center overflow-hidden rounded-xl border border-dashed ${toneCls} ${className}`}
    >
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 0.7px, transparent 0.7px)",
          backgroundSize: "16px 16px",
          color: tone === "brand" ? "rgba(255,255,255,0.18)" : "var(--graphit-300)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            tone === "brand" ? "bg-white/15" : "bg-surface shadow-sm"
          }`}
        >
          {variant === "video" ? <PlayIcon /> : variant === "character" ? <UserIcon /> : <ImageIcon />}
        </span>
        <span className="font-sans text-[13px] font-medium">{label}</span>
        <span
          className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide ${
            tone === "brand" ? "bg-white/15 text-white/80" : "bg-subtle text-ink-tertiary"
          }`}
        >
          ассет в работе
        </span>
      </div>
    </div>
  );
}

function ImageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8.5" cy="9.5" r="1.8" fill="currentColor" />
      <path d="M5 17l4.5-4.5 3 3L16 11l3 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="9" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 19c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
