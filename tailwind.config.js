/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "vela-cyan": "#0cf",
        "vela-lavender": "#955ea6",
        "vela-coal-dark": "#1f1f1f",
        "vela-coal": "#292929",
        "vela-coal-light": "#575757",
        "vela-offwhite": "#fafafa",
        "vela-gray": "#b3b3b3",
        "vela-gray-light": "#d9d9d9",
        "vela-red-dark": "#b5172a",
        "vela-red": "#e21d34",
        "vela-red-light": "#eb6675",
        "vela-green-dark": "#4d8116",
        "vela-green": "#7dd123",
        "vela-yellow": "#fc0",
        "vela-black": "hsl(0,0%,0)",
        "vela-white": "#fff",
        "vela-slate": "rgba(88,96,105,.5)",
      },
      backgroundImage: {
        "gradient-radial-circle":
          "radial-gradient(circle at 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
          to: { transform: "translateX(0)" },
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        },
      },
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
