import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { layoutToCss, layoutToCssMobile } from "app/utils/styles";
import { vars, PRIMARY_FONT } from "app/styles/theme.css";
import { createFocusState } from "app/styles/tools.css";

const reveal = keyframes({
  "0%": { transform: "rotateX(0deg) translateZ(0)" },
  "50%": { transform: "rotateX(90deg) translateZ(0)" },
  "100%": { transform: "rotateX(0) translateZ(0)" },
});

export const letterStyle = style({
  border: `2px solid ${vars.color.incorrect}`,
  height: `${layoutToCssMobile(60)}vw`,
  padding: `${layoutToCssMobile(15)}vw`,
  fontSize: `${layoutToCssMobile(24)}vw`,
  boxSizing: "border-box",
  minWidth: 60,
  minHeight: 60,
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  aspectRatio: "1",
  fontWeight: "700",
  position: "relative",
  background: "none",
  color: vars.color.text,
  fontFamily: PRIMARY_FONT,
  textAlign: "center",
  "@media": {
    "screen and (min-width: 768px)": {
      height: `${layoutToCss(60)}vw`,
      padding: `${layoutToCss(15)}vw`,
      fontSize: `${layoutToCss(24)}vw`,
    },
  },
});

export const letter = style({ transformOrigin: "bottom center" });

const revealAnimation = {
  color: vars.color.text_reveal,
  transition: 'background-color 0s 250ms, border-color 0s 250ms',
  animation: `${reveal} 500ms`,
}

export const letterVariants = styleVariants({
  active: { borderColor: vars.color.text },
  pointers: { pointerEvents: "all" },
  noPointers: { pointerEvents: "none" },
  correct: {
    backgroundColor: vars.color.correct,
    borderColor: vars.color.correct,
    
    ...revealAnimation,
  },
  incorrect: {
    backgroundColor: vars.color.incorrect,
    borderColor: vars.color.incorrect,
    ...revealAnimation
  },
  misplaced: {
    backgroundColor: vars.color.misplaced,
    borderColor: vars.color.misplaced,
    ...revealAnimation
  },
});

createFocusState(letterStyle, letterVariants.active);
