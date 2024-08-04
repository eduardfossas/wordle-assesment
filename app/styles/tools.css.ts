import { globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "app/styles/theme.css";

const focusPulse = keyframes({
  "0%": { opacity: 0, transform: "scale(0.85) translateZ(0)" },
  "50%": { opacity: 0.1, transform: "scale(1) translateZ(0)" },
  "100%": { opacity: 0, transform: "scale(0.85) translateZ(0)" },
});

export const createFocusState = (mainClass: string, activeClass: string) => {
  globalStyle(`${mainClass}:before`, {
    content: "",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: vars.color.text,
    opacity: 0,
  });

  globalStyle(`${activeClass}:before`, {
    opacity: 0.1,
    animation: `${focusPulse} 1500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite`,
  });
};
