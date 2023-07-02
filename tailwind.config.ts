import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{jsx,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primaryContainer: colors.cyan[800],
        secondary: colors.green[800],
        background: colors.neutral[900],
      },
    },
  },
  plugins: [],
} satisfies Config;
