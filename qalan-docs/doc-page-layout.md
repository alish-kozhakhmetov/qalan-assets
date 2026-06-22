# Component documentation page — layout spec

> Exemplar: **Button** page (`12:195`), frame `Button — Docs` (`8989:26`).
> All future component doc pages follow this template exactly.

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
| Horizontal align | MIN (left) |

## Page organization

| Frame | Purpose |
|---|---|
| `{Component} — Docs` | Documentation frame, left side of canvas |
| `_Source` | Contains the master component set + any internal helpers. Positioned to the RIGHT of the docs frame (x = docs.width + 200). No fill, just a container. |

## Sections (order matters)

### 01 Header

- **Title**: Component name, Inter Bold 40, `text/primary`.
- **Description**: 1–2 sentences summarizing the component's purpose and variant axes. Inter Regular 18, `text/secondary`. Full width, auto-height.
- **Pills row**: Horizontal auto-layout, gap 12. Each pill: `bg/surface` fill, `border/default` stroke (hairline), full corner radius. Label in Inter Semi Bold 12 `text/tertiary` + value in Inter Medium 12 `text/primary`. Standard pills: Platform, Status, Updated — leave values `—` until confirmed.
- **Divider**: 1px rectangle, `border/default` fill, full width.

### 02 Anatomy

- **Section title**: "Anatomy", Inter Bold 28, `text/primary`.
- **Diagram container**: Horizontal auto-layout, `bg/surface` fill, corner radius `l` (16), padding 40, gap 80.
  - **Left**: A real component instance (largest size, default state, all optional slots visible) inside a plain frame with absolutely-positioned numbered callout badges.
  - **Callout badge**: 24×24 `bg/brand` circle + white bold 12 number centered.
  - **Right**: Vertical legend with numbered rows (20×20 badge + Inter Regular 14 label).

### 03 Variants

- **Section title**: "Variants", Inter Bold 28, `text/primary`.
- **Layout**: Vertical stack of **size blocks**, gap 40 between blocks.
- **Each size block**: Vertical auto-layout, `bg/surface` fill, corner radius `l`, padding 24, gap 16.
  - Block title: `"Size {X} — {height} px"`, Inter Semi Bold 18.
  - **Grid**: Vertical auto-layout, gap 12.
    - Header row: Horizontal, 90px spacer + type labels (Inter Medium 12 `text/tertiary`, each in a 130px-wide cell, centered).
    - Data rows: Horizontal, state label (Inter Medium 12 `text/secondary`, 90px wide) + one real button instance per type in a 130px fixed-width centered cell.
  - States top→bottom: Default, Pressed, Disabled, Loading.
  - Types left→right: Primary, Secondary, Tertiary, Text, Text-critical.
  - Size blocks top→bottom: L, M, S.

### 04 Usage

- **Section title**: "Usage guidelines", Inter Bold 28, `text/primary`.
- **Pairs container**: Vertical auto-layout, gap 24, full width.
- **Each pair**: Horizontal auto-layout, gap 24, full width. Two cards side by side.
  - **Card**: Vertical auto-layout, `bg/surface` fill, corner radius `m` (12), padding 20, gap 12. FILL width.
    - Badge: Horizontal pill, `bg/status/success` (Do) or `bg/status/critical` (Don't), full corner radius, padding 4/10. Text: Inter Bold 12, `text/on-brand/primary`. Content: `"✓  Do"` / `"✗  Don't"`.
    - Caption: Inter Regular 14, `text/secondary`, auto-height, full width. Prefix with `DRAFT — ` for unreviewed copy.
- Aim for 2–3 pairs covering the most common misuse patterns.

### 05 Specs

- **Section title**: "Specs", Inter Bold 28, `text/primary`.
- **Table**: Vertical auto-layout, `bg/surface` fill, corner radius `m`, `border/default` stroke (hairline), full width.
  - **Rows**: Horizontal auto-layout, padding 12/16. Bottom stroke `border/default` (hairline) on all rows except last.
  - **Header row**: Column labels in Inter Semi Bold 13, `text/tertiary`. Columns: Property, then one per size.
  - **Data rows**: Property name in Inter Medium 13 `text/primary`, values in Inter Regular 13 `text/secondary`. All cells FILL width.
- Standard properties to document: Height, Min width, Padding H, Padding V, Gap, Corner radius, Border width.

## Conventions

- **Typography**: Text styles from the DS (Platform LC headings, Halvar Mittelschrift body/label/caption). Plugin API workaround: create text with Inter, set all layout properties, then apply `textStyleId` as the LAST operation (overrides font without requiring font loading).
- **Language**: All prose in Russian (descriptions, anatomy legend, Do/Don't, section headings = Анатомия / Варианты / Использование / Характеристики). English preserved for: variant property names/values (State/Type/Default/Primary…), all layer/frame names, and spec table property names where English is standard.
- All colors, radii, spacing, and stroke weights are **variable-bound** (no raw values).
- Real component instances — never screenshots or detached copies.
- `_Source` frame keeps the master alive on the same page; never delete or detach it.
- Section names are numbered (`01`, `02`, …) so they sort predictably in the layers panel.
- **FAMILY layout** (multiple component sets on one page): ONE doc frame, each component its own titled sub-section in logical order (public first), `_internal` helpers grouped LAST with "Internal:" prefix.
- **CATALOG layout** (Content Blocks / Trainer Blocks with 15+ components): Header + catalog table listing all component sets with variant count, no full variant grids.

## Text style mapping

| Role | Style ID | Font |
|---|---|---|
| Title (component name) | `heading/l` | Platform LC Bold 32/38 |
| Section heading | `heading/s` | Platform LC Bold 24/28 |
| Description | `body/m/regular` | Halvar Mittelschrift 18/23 |
| Block title | `body/s/bold` | Halvar Mittelschrift Bold 16/21 |
| Grid / table labels | `label/m/bold` | Halvar Mittelschrift Bold 14/18 |
| Grid / table values | `label/m/regular` | Halvar Mittelschrift 14/18 |
| Pill label | `caption/m/bold` | Halvar Mittelschrift Bold 14/18 |
| Pill value | `caption/m/regular` | Halvar Mittelschrift 14/18 |
