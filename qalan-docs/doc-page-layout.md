# Qalan DS — стандарт документации компонентов

> Документация организована вокруг решений читателя, а не внутренней структуры компонента.
> Включай только те секции, которые применимы. Порядок фиксирован.

## Принцип

Читатель приходит с вопросом «какой компонент использовать и как». Документация отвечает:
1. Что это и когда использовать (Header + When to use)
2. Какие типы бывают и когда какой (Types — только если типы реальные)
3. Как выглядит в продукте (Examples in context)
4. Из чего состоит (Anatomy)
5. Какие состояния и поведение (States)
6. Полная матрица вариантов (Variants — справочник)
7. Размеры и отступы (Specs)
8. Что менялось (Changelog)

---

## Outer frame

| Property | Value |
|---|---|
| Name | `{Component} — Docs` |
| Layout | Vertical auto-layout |
| Width | 1440 (FIXED) |
| Height | HUG |
| Padding | 80 all sides |
| Item spacing | 64 between sections |
| Fill | `bg/canvas` variable |
| Content max width | ~1040 (padding constrains; text/tables never full-bleed) |

## Page organization

| Frame | Contents |
|---|---|
| `{Component} — Docs` | Doc frame, left side of canvas |
| `_Source` | Master component set + internal helpers. Right of doc frame (x = doc.width + 200). No fill. Internal components (_Prefix, _Suffix, _Tab-component, _Affix, _Calendar day, _Progress-indicator…) live here, NOT in the doc as co-equal sections. |

---

## Sections (include only what applies; order fixed)

### 01 Header

- **Title**: Component name, `heading/l` (Platform LC Bold 32/38), `text/primary`.
- **Purpose**: One line in Russian — what it is and what it does. `body/m/regular` (Halvar 18/23), `text/secondary`.
- **Pills row**: H auto-layout, gap 12. **Always filled, never blank.**
  - Platform: `iOS` / `Android` / `Web` (as applicable)
  - Status: `Stable` / `Beta` / `Draft`
  - Updated: date (e.g. `22.06.2026`)
  - Pill: `bg/surface` fill, `border/default` stroke (hairline), `radius/full`. Label `caption/m/bold` `text/tertiary` + value `caption/m/regular` `text/primary`.
- **Divider**: 1px rect, `border/default`, full width.

### 02 When to use

- **Heading**: `heading/s`, `text/primary`.
- **Body**: 1–3 short RU paragraphs. `body/m/regular`, `text/secondary`, auto-height, max-width ~1040.
  - What it's for.
  - When to reach for it.
  - When NOT to use it / the alternative (e.g. "Для бинарного вкл/выкл — Switch, не Checkbox").

### 03 Types (ONLY for components with genuinely different types)

Include ONLY if the component has types that change BEHAVIOR or USE CASE — not mere visual variants.
Examples: List Item (Checkbox / Radio / Navigation / Profile), Text Field (Text Field / Multiline),
Tabs (Segmented / Underlined), Banner (Info / Error / Warning / Neutral), Top Nav (Main / Sub).

Do NOT include for atoms without real types: Divider, Scrollbar, Avatar, Checkbox, Radio, Switch, Label.

- Each type: real instance + RU "когда использовать" line.
- A type with no "use when" rationale is not a type — drop it.

### 04 Examples in context

- Real Qalan content, not "Label" / "Placeholder" dummies.
- Examples: List Item → "Арманжан · 3 класс · Premium"; Banner → "Подписка истекает через 3 дня".
- Pull real strings, avatars, icon names from the product.
- 2–4 examples showing the component in typical Qalan use.

### 05 Anatomy

- **Heading**: "Анатомия", `heading/s`.
- **COMPLETE** — inspect the actual component and label every real part (e.g. Label includes its ICON,
  not just text; List Item includes prefix/suffix/content/divider).
- Diagram: `bg/surface` card, `radius/l`, padding 40, gap 80.
  - Left: real instance (largest size, default state, all optional slots visible) in a plain frame
    with absolutely-positioned callout badges (24×24 `bg/brand` circle + white `caption/m/bold` number).
  - Right: vertical legend — numbered rows (20×20 badge + `label/m/regular` RU label).

### 06 States / behavior

- Include only states that exist and matter.
- Brief RU explanation for each state: what triggers it, what changes visually.
- Clean grid: state label left + instance right, one row per state.

### 07 Variants

- Full grid for completeness — this is REFERENCE, not the spine of the page.
- Block per axis with the fewest values (e.g. Size), inside: rows × columns grid.
- Labels: `label/m/bold` (headers), `label/m/regular` (row labels).
- Real instances in centered fixed-width cells.
- Wrap rows; never overflow/clip.

### 08 Specs

- **Table width**: constrained to ~720–840 px (NOT full-bleed 1280).
- **Header row**: `label/m/bold`, `text/tertiary`.
- **Data rows**: property name `label/m/bold` `text/primary`, values `label/m/regular` `text/secondary`.
- **Row separators**: `border/default` hairline, included in layout.
- **Padding**: 12 top/bottom, 16 left/right.
- Standard properties: Height, Min width, Padding, Gap, Corner radius, Border width.

### 09 Changelog (per page)

- Short list: `дата · что изменилось · тип (Added / Changed / Fixed / Deprecated)`.
- Seeds from git history + manual notes.

---

## Typography (CRITICAL)

Every text node MUST have `textStyleId` bound to a published style. No raw Inter, no unbound Halvar.

| Role | Text style | Resolves to |
|---|---|---|
| Title | `heading/l` | Platform LC Bold 32/38 |
| Section heading | `heading/s` | Platform LC Bold 24/28 |
| Body / description / "when to use" | `body/m/regular` | Halvar Mittelschrift 18/23 |
| Block title | `body/s/bold` | Halvar Mittelschrift Bold 16/21 |
| Grid / table header | `label/m/bold` | Halvar Mittelschrift Bold 14/18 |
| Grid / table value | `label/m/regular` | Halvar Mittelschrift 14/18 |
| Pill label | `caption/m/bold` | Halvar Mittelschrift Bold 14/18 |
| Pill value | `caption/m/regular` | Halvar Mittelschrift 14/18 |

**Plugin API workaround**: create text with Inter (loadable), set all layout properties (textAutoResize, resize, textAlignHorizontal), then apply `textStyleId` as the LAST step. Verify after build: read `textStyleId` on every text node — any unbound or Inter-resolving node is a bug.

## Language

- **Russian** for all prose: purpose, when-to-use, anatomy legend, state descriptions, type rationale, changelog entries, section headings (Анатомия / Варианты / Использование / Характеристики / Когда использовать / Типы / Примеры / Состояния / Журнал изменений).
- **English** for: variant property names/values (State / Type / Default / Primary…), layer/frame names, spec property names where English is standard.

## Internal helpers

`_Prefix`, `_Suffix`, `_Tab-component`, `_Affix`, `_Calendar day`, `_Progress-indicator`, `_Dot-indicator`, `_Bottom-tab` etc. are NOT family members. They live in `_Source` or a clearly separated "Internal" appendix at the very end of the doc (never co-equal sections).

**Reclassification:**
- **SINGLE + internals** (doc as one component; internals in appendix): Pill, Text Field, Tabs, Progress Bar, Date Picker, Dots Indicator, Switch, Checkbox, Radio, Label, Avatar, Banner, Divider, Scrollbar, State Icon, Status Bar, Keyboard.
- **FAMILY** (each genuine component gets its own sub-section with where/when): List Item page (List Item + List + Dropdown), Bottom Navigation (Bottom Nav + CTA Dock + Chat Input Dock + Navigation Safe-area), Top Navigation (Main page bar + Sub page bar).

## Patterns pages (Content Blocks / Trainer Blocks)

Do NOT dump in a flat stack. Structure:
1. **Index table** at top — component name, variant count, short purpose.
2. **Grouped sections by job/purpose** — e.g. "Персонажи" (Character Image + Card + Label + Badge + Full-view), "Чат" (Speech Bubble + _Bubble Button + Video), "Прогресс" (Streak + Streak Item + Streak Report).
3. Each group: titled block with RU description of what it is and where it appears in the product, then its component instances.

## Verification checklist (per page)

- [ ] All text nodes have `textStyleId` set (not empty, not Inter)
- [ ] All instances fit their containers (no clipping/overflow)
- [ ] Pills filled (Platform, Status, Updated — never blank)
- [ ] Tables constrained width (~720–840), not full-bleed
- [ ] Internal helpers in _Source or appendix, not co-equal sections
- [ ] Component model checked — if broken, fixed before documenting
- [ ] Real Qalan content in examples (not "Label" / "Placeholder")
