import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { layoutToCss } from "app/utils/styles";
import {vars} from 'app/styles/theme.css'
import {createFocusState} from 'app/styles/tools.css'

export const letterStyle = style({
  border: `2px solid ${vars.color.incorrect}`,
  height: `${layoutToCss(60)}vw`,
  minWidth: 60,
  minHeight: 60,
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  aspectRatio: "1",
  fontSize: `${layoutToCss(32)}vw`,
  fontWeight: "700",
  position: 'relative',
});

export const letterVariants = styleVariants({
  active: { borderColor: vars.color.text},
  correct: {backgroundColor: vars.color.correct, borderColor:vars.color.correct },
  incorrect: {backgroundColor: vars.color.incorrect, borderColor:vars.color.incorrect},
  misplaced: {backgroundColor: vars.color.misplaced, borderColor:vars.color.misplaced}
});

createFocusState(letterStyle, letterVariants.active)
