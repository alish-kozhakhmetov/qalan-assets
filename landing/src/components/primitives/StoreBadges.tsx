/** App Store / Google Play badges. Self-serve entry points; links are
 *  placeholders pending real store URLs (title attr flags this). */
export function StoreBadges({ inverse = false, className = "" }: { inverse?: boolean; className?: string }) {
  const base = inverse
    ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
    : "border-line bg-surface text-ink hover:bg-subtle";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href="#start" title="Ссылка на App Store — плейсхолдер" className={`inline-flex h-12 items-center gap-2.5 rounded-xl border px-4 transition-colors ${base}`}>
        <AppleIcon />
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[10px] opacity-70">Скачать в</span>
          <span className="font-sans text-[15px] font-bold">App Store</span>
        </span>
      </a>
      <a href="#start" title="Ссылка на Google Play — плейсхолдер" className={`inline-flex h-12 items-center gap-2.5 rounded-xl border px-4 transition-colors ${base}`}>
        <PlayStoreIcon />
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[10px] opacity-70">Доступно в</span>
          <span className="font-sans text-[15px] font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.7-3.1.7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.1 1-.04 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.6 1.1-.02 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4-.02-.01-2.1-.8-2.1-3.2zM14.6 6.1c.6-.7 1-1.7.9-2.6-.8.03-1.9.6-2.5 1.2-.5.6-1 1.5-.9 2.5.9.07 1.8-.4 2.5-1.1z" />
    </svg>
  );
}
function PlayStoreIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 2.5v19l11-9.5z" fill="currentColor" opacity="0.9" />
      <path d="M3.5 2.5l11 9.5 3.5-3-12-7c-.9-.5-1.7-.5-2.5.5z" fill="currentColor" opacity="0.6" />
      <path d="M3.5 21.5l11-9.5 3.5 3-12 7c-.9.5-1.7.5-2.5-.5z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}
