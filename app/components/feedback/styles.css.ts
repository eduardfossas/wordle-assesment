import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const feedbackContainer = style({
  position: "fixed",
  top: 20,
  display: "flex",
  width: '100%',
  alignItems: "center",
  justifyContent: "center"
});

export const feedbackText = style({
  background: vars.color.text,
  padding: 10,
  borderRadius: 5,
  color: vars.color.bg_primary,
  fontSize: 15,
  opacity: 0,
  transform: 'translateY(-10px) translateZ(0)',
  transition: 'all 300ms cubic-bezier(0.42, 0.1, 0.8, 1)'
})

export const feedbackTextVariants = styleVariants({
  visible: {transform: 'translateY(0) translateZ(0)', opacity: 1,},
})