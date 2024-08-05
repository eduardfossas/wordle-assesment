import { createGlobalTheme, createTheme } from "@vanilla-extract/css";

export const PRIMARY_FONT = "'Inter', sans-serif";

export const [darkTheme, vars] = createTheme({
  color: {
    correct: "#538D4E",
    misplaced: "#BEA11F",
    incorrect: "#3A3A3C",
    text: "#FFFFFF",
    text_reveal: "#FFFFFF",
    bg_primary: "#000000",
    bg_secondary: "#212226",
    bg_dialog: "#282525",
    
  },
});

export const lightTheme = createTheme(vars, {
  color: {
    correct: "#538D4E",
    misplaced: "#BEA11F",
    incorrect: "#3A3A3C",
    text: "#000000",
    text_reveal: "#FFFFFF",
    bg_primary: "#ffffff",
    bg_secondary: "#ffffff",
    bg_dialog: "#282525",
  },
});
