/* Turn the exported Spine player HTML files (in ~/Downloads) into embeddable
 * character widgets under landing/public/characters/:
 *  - transparent canvas (alpha), no controls, fills its iframe
 *  - animation chosen via ?anim=Hello|LevelUp|Idle… (default Indiv)
 *  - optional ?skin= override
 * Source files are large (2–3.6MB, base64 skel/atlas/texture) — copied verbatim
 * except the small config block.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const DL = join(homedir(), "Downloads");
const OUT = join(process.cwd(), "landing", "public", "characters");
mkdirSync(OUT, { recursive: true });

const MAP = { "BUDDY.html": "buddy.html", "Tamina.html": "tamina.html", "Bbot.html": "bibot.html" };

const helper = "const q=(k,d)=>new URLSearchParams(location.search).get(k)||d;\n\tfunction run() {";

for (const [src, dst] of Object.entries(MAP)) {
  let h = readFileSync(join(DL, src), "utf8");
  h = h
    .replace(
      "#spine-container{width:90vw;height:90vh;max-width:1200px;max-height:900px}",
      "#spine-container{width:100vw;height:100vh}"
    )
    .replace("background:#1a1a1a", "background:transparent")
    .replace("function run() {", helper)
    .replace("animation: 'Indiv'", "animation: q('anim','Indiv')")
    .replace("skin: ['A3']", "skin: [q('skin','A3')]")
    .replace("backgroundColor: '#f5f5f5'", "backgroundColor: '#00000000'")
    .replace("alpha: false", "alpha: true")
    .replace("showControls: true", "showControls: false")
    // viewport padding override via ?pl=&pr=&pt=&pb= (fraction; smaller = character fills more)
    .replace(
      "debug: false",
      "debug: false,\n\t\tviewport: { padLeft:+q('pl','0.05'), padRight:+q('pr','0.05'), padTop:+q('pt','0.05'), padBottom:+q('pb','0.05') }"
    );
  writeFileSync(join(OUT, dst), h);
  console.log("wrote", dst, (h.length / 1024 / 1024).toFixed(1) + "MB");
}
