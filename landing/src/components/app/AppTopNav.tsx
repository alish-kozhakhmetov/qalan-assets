/**
 * Pixel-perfect rebuild of the Qalan app "Top Navigation" component.
 * Source: Figma 66VsPAuI2bJPvSUZ7NDfpn, node 13793:142523.
 * Built to the exact measurements from the Figma design context; uses our DS
 * tokens (canvas #f5f5f5, surface #fff, border #eaeaea, text #0a0a0a/#4a4a4a,
 * radii 999/12) and Halvar Mittelschrift, plus the original vector assets
 * exported from Figma (public/app-nav/*.svg).
 *
 * Natural size is 375×108. Wrap in a scaler (transform: scale) to drop into the
 * hero device without losing fidelity.
 */
export function AppTopNav({ className = "" }: { className?: string }) {
  return (
    <div
      data-node-id="13793:142523"
      className={`flex w-[375px] flex-col items-start bg-[#f5f5f5] ${className}`}
    >
      {/* ---- iOS status bar (52px) ---- */}
      <div className="relative flex h-[52px] w-full items-center justify-center px-6 py-2.5">
        <div className="relative h-full w-[375px]">
          {/* time */}
          <div className="absolute left-[31px] top-1/2 flex h-[21px] w-[54px] -translate-y-1/2 items-center justify-center">
            <span
              className="text-center text-[15px] font-semibold leading-none tracking-[-0.3px] text-[#0a0a0a]"
              style={{ fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif' }}
            >
              9:41
            </span>
          </div>
          {/* mobile signal */}
          <img src="/app-nav/signal.svg" alt="" aria-hidden className="absolute right-[69.33px] top-1/2 h-[10.667px] w-[17px] -translate-y-1/2" />
          {/* wifi */}
          <img src="/app-nav/wifi.svg" alt="" aria-hidden className="absolute right-[49.03px] top-1/2 h-[10.966px] w-[15.272px] -translate-y-1/2" />
          {/* battery */}
          <img src="/app-nav/battery-body.svg" alt="" aria-hidden className="absolute right-[22px] top-1/2 h-[11.333px] w-[22px] -translate-y-1/2" />
          <img src="/app-nav/battery-fill.svg" alt="" aria-hidden className="absolute right-[24px] top-1/2 h-[7.333px] w-[18px] -translate-y-1/2" />
          <img src="/app-nav/battery-tip.svg" alt="" aria-hidden className="absolute right-[19.67px] top-1/2 h-[4px] w-[1.328px] -translate-y-1/2" />
        </div>
      </div>

      {/* ---- header row (px-16 py-8) ---- */}
      <div className="flex w-full items-center justify-between px-4 py-2">
        {/* left slot — avatar */}
        <div className="flex items-center">
          <div className="flex size-10 min-h-10 min-w-10 items-center justify-center rounded-full border border-[#eaeaea] bg-white">
            <span className="w-6 text-center font-sans text-[18px] font-bold leading-[23px] text-[#4a4a4a]">
              А
            </span>
          </div>
        </div>

        {/* right slot — league button + streak */}
        <div className="flex items-center gap-2">
          {/* league button */}
          <div className="size-10">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white">
              <div
                className="absolute left-[3.78px] top-[2.78px] flex size-[32.437px] items-center justify-center"
              >
                <div className="-rotate-[10deg]">
                  <div className="relative size-7">
                    <img
                      src="/app-nav/league.svg"
                      alt=""
                      aria-hidden
                      className="absolute"
                      style={{ left: "6.26%", right: "6.26%", top: "14.06%", bottom: "14.06%", width: "87.48%", height: "71.88%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* streak */}
          <div className="flex flex-col items-start justify-center gap-0.5">
            <div className="relative h-10 w-[34px]">
              <img src="/app-nav/streak.svg" alt="" aria-hidden className="absolute bottom-0 left-1/2 h-10 w-[34px] -translate-x-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
