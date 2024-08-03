import { createGlobalTheme } from "@vanilla-extract/css";

export const PRIMARY_FONT = "'Inter', sans-serif";

export const vars = createGlobalTheme(":root", {
  color: {
    correct: "#538D4E",
    misplaced: "#BEA11F",
    incorrect: "#3A3A3C",
    text: "#FFFFFF",
    bg_primary: "#000000",
    bg_secondary: "#212226",
    bg_dialog: "#282525",
  },
});
