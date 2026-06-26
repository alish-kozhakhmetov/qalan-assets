/** @type {import('tailwindcss').Config} */
// Qalan DS — tokens wired straight to the CSS variables vendored in src/styles/tokens.css.
// Colors reference var(--…) so the [data-theme="dark"] switch keeps working. Don't invent values.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // raw brand ramp (handy for gradients / accents)
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          DEFAULT: "var(--brand-500)",
          pressed: "var(--brand-600)",
        },
        graphit: {
          50: "var(--graphit-50)",
          100: "var(--graphit-100)",
          200: "var(--graphit-200)",
          300: "var(--graphit-300)",
          400: "var(--graphit-400)",
          500: "var(--graphit-500)",
          600: "var(--graphit-600)",
          700: "var(--graphit-700)",
          800: "var(--graphit-800)",
          900: "var(--graphit-900)",
        },
        // semantic surfaces / text / borders
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        subtle: "var(--bg-subtle)",
        inverse: "var(--bg-inverse)",
        success: "var(--bg-status-success)",
        warning: "var(--bg-status-warning)",
        critical: "var(--bg-status-critical)",
        accent: {
          orange: "var(--bg-accent-orange)",
          purple: "var(--bg-accent-purple)",
          yellow: "var(--bg-accent-yellow)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",     // #0a0a0a
          secondary: "var(--text-secondary)", // #4a4a4a
          tertiary: "var(--text-tertiary)",   // #b4b4b4
          onBrand: "var(--text-on-brand-primary)",
        },
        line: {
          DEFAULT: "var(--border-default)", // #eaeaea
          strong: "var(--border-strong)",
          subtle: "var(--border-subtle)",
        },
      },
      fontFamily: {
        display: ['"Platform LC"', "system-ui", "sans-serif"],
        sans: ['"Halvar Mittelschrift"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",       // 4
        sm: "var(--radius-s)",        // 8
        DEFAULT: "var(--radius-m)",   // 12
        md: "var(--radius-m)",        // 12
        lg: "var(--radius-l)",        // 16
        xl: "var(--radius-xl)",       // 24
        full: "var(--radius-full)",   // 999
      },
      height: {
        "control-s": "30px",
        "control-m": "40px",
        "control-l": "58px",
        "control-xl": "64px",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
