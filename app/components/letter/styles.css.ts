import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { layoutToCss, layoutToCssMobile } from "app/utils/styles";
import {vars, PRIMARY_FONT} from 'app/styles/theme.css'
import {createFocusState} from 'app/styles/tools.css'

export const letterStyle = style({
  border: `2px solid ${vars.color.incorrect}`,
  height: `${layoutToCssMobile(60)}vw`,
  padding: `${layoutToCssMobile(15)}vw`,
  fontSize: `${layoutToCssMobile(24)}vw`,
  boxSizing: 'border-box',
  minWidth: 60,
  minHeight: 60,
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  aspectRatio: "1",
  fontWeight: "700",
  position: 'relative',
  background: 'none',
  color: vars.color.text,
  fontFamily: PRIMARY_FONT,
  textAlign: 'center',
  '@media': {
    'screen and (min-width: 768px)': {
      height: `${layoutToCss(60)}vw`,
      padding: `${layoutToCss(15)}vw`,
      fontSize: `${layoutToCss(24)}vw`,
    }
  },
});

export const letter = style({transformOrigin: 'bottom center'})

export const letterVariants = styleVariants({
  active: { borderColor: vars.color.text},
  pointers: {pointerEvents: 'all'},
  noPointers: {pointerEvents: 'none'},
  correct: { backgroundColor: vars.color.correct, borderColor:vars.color.correct },
  incorrect: {backgroundColor: vars.color.incorrect, borderColor:vars.color.incorrect},
  misplaced: {backgroundColor: vars.color.misplaced, borderColor:vars.color.misplaced}
});

createFocusState(letterStyle, letterVariants.active)
