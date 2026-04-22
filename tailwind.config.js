/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // colors principales 
        primary: {
          DEFAULT:  "#527FF2",  // bg-primary
          hover:    "#3d6adf",  // bg-primary-hover
          active:   "#3060d0",  // bg-primary-active
          light:    "rgba(82, 127, 242, 0.08)",  // bg-primary-light
        },

        // blancos
        white: {
          DEFAULT: "#FFFFFF",   // bg-white
        },

        // fondos y superficies
        surface: {
          DEFAULT: "#F1F5F9",   // bg-surface — fondo sidebar buttons, fondo app
          dark:    "#E2E8F0",   // bg-surface-dark — hover sidebar
        },

        // texto oscuro 
        dark: {
          DEFAULT: "#111928",   // text-dark — labels, texto principal
          soft:    "#1a1a2e",   // text-dark-soft — textos ghost button
        },

        // negros
        black: {
          DEFAULT: "#000000",   // text-black — SearchInput texto y placeholder
        },

        // bordes
        stroke: {
          DEFAULT: "#DFE4EA",           // border-stroke — InputField default
          dark:    "rgba(0,0,0,0.15)",  // border-stroke-dark — ghost/sidebar button
        },

        // rojos de errores 
        red: {
          light:   "#F56060",   // border-red-light — InputField error border
          DEFAULT: "#E10E0E",   // text-red — label en error
        },

        // eficacia 
        efficacy: {
          excellent: "#1D9E75",  // EffectivenessBadge ≥90%  — verde
          good:      "#378ADD",  // EffectivenessBadge ≥75%  — azul
          fair:      "#BA7517",  // EffectivenessBadge ≥60%  — amarillo
          poor:      "#E24B4A",  // EffectivenessBadge <60%  — rojo
        },

        // grises de texto secundario 
        muted: {
          DEFAULT: "#6B7280",   // text-muted — placeholder InputField, counter TextArea
          light:   "#9CA3AF",   // text-muted-light — placeholder más suave
        },

        // hover status general 
        hover: {
          light: "#F3F4F6",     // bg-hover-light — ghost button hover
          dark:  "#E5E7EB",     // bg-hover-dark  — ghost button active
        },

        login: {
          bg: "#6B97EE",  // bg-login-background — fondo general login
        },

      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],  // font-inter
      },

      borderRadius: {
        card: "6px",   // rounded-card — border-radius universal del diseño
      },

      boxShadow: {
        search: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)", // shadow-search — SearchInput
      },
      // animación de entrada del modal
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "scale(0.95) translateY(-8px)" },
          "100%": { opacity: "1", transform: "scale(1)   translateY(0px)"   },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out forwards",
      },
    },
  },
  plugins: [],
}