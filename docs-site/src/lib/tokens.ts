// Foundations are NOT hand-written — they read the real tokens.css (the
// canonical, Figma-generated source at the repo root) and render them. This
// util parses that file at build time and resolves var() chains to final hex so
// swatches show the true values. It never hardcodes a token value.
// Read the canonical tokens.css as a raw string at build time. We import the
// synced copy (scripts/sync-ds.mjs mirrors the repo-root tokens.css into
// public/ds before predev/prebuild), so this stays bundler-safe and references
// the single source — no runtime fs, no cwd assumptions.
import css from '../../public/ds/tokens.css?raw';

function parseBlock(selector: string): Map<string, string> {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = css.match(new RegExp(esc + '\\s*\\{([\\s\\S]*?)\\}'));
  const map = new Map<string, string>();
  if (!m) return map;
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let pair: RegExpExecArray | null;
  while ((pair = re.exec(m[1]))) map.set(pair[1].trim(), pair[2].trim());
  return map;
}

const root = parseBlock(':root');
const dark = parseBlock('[data-theme="dark"]');

// resolve var(--x) chains against the primitives (which live in :root)
function resolve(value: string, depth = 0): string {
  if (depth > 12) return value;
  const m = value.match(/^var\((--[\w-]+)\)$/);
  if (m) {
    const ref = root.get(m[1]);
    return ref !== undefined ? resolve(ref, depth + 1) : value;
  }
  return value;
}

export interface Token { token: string; value: string; }
export interface SemanticToken { token: string; light: string; dark: string; }

export const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export const PRIMITIVE_FAMILIES = [
  'brand', 'orange', 'graphit', 'red', 'green', 'yellow', 'purple',
];

export function getRamp(family: string): Token[] {
  return RAMP_STEPS
    .map((step) => `--${family}-${step}`)
    .filter((token) => root.has(token))
    .map((token) => ({ token, value: resolve(root.get(token)!) }));
}

// semantic tokens by prefix, with light + dark resolved values
export function getSemantic(prefix: 'bg' | 'text' | 'border'): SemanticToken[] {
  const out: SemanticToken[] = [];
  for (const [token, val] of root) {
    if (!token.startsWith(`--${prefix}-`)) continue;
    if (token.startsWith('--system-')) continue;
    const light = resolve(val);
    const darkRaw = dark.get(token);
    const darkVal = darkRaw !== undefined ? resolve(darkRaw) : light;
    out.push({ token, light, dark: darkVal });
  }
  return out;
}

// a --prefix ramp sorted by numeric px value (spacing / radius / size)
export function getScale(prefix: string): Token[] {
  const out: Token[] = [];
  for (const [token, val] of root) {
    if (!token.startsWith(prefix)) continue;
    out.push({ token, value: resolve(val) });
  }
  return out.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
}

export function px(value: string): number {
  return parseFloat(value) || 0;
}
