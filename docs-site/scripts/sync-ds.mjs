// Single-source DS sync — copies the canonical design-system assets from the
// repo root into the site's public/ds so there is exactly ONE source and zero
// manual drift. NEVER edit the copies; edit the root files (which are generated
// from Figma) instead. Runs from predev/prebuild hooks.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const root = new URL('../../', import.meta.url); // qalan-assets/
const out = new URL('../public/ds/', import.meta.url); // docs-site/public/ds/

rmSync(out, { recursive: true, force: true });
mkdirSync(new URL('fonts/', out), { recursive: true });

cpSync(new URL('tokens.css', root), new URL('tokens.css', out));
cpSync(new URL('base.css', root), new URL('base.css', out));
cpSync(new URL('fonts/', root), new URL('fonts/', out), { recursive: true });

console.log('DS assets synced → public/ds/ (tokens.css, base.css, fonts/)');
