import { style } from "@vanilla-extract/css";
import { vars } from "app/styles/theme.css";

export const dialogBackground = style({
  position: "fixed",
  inset: 0,
  background: " rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: 'blur(5px)'
});

export const dialogContainer = style({
  width: "100%",
  padding: 20,
  borderRadius: 10,
  backgroundColor: vars.color.bg_dialog,
  height: "fit-content",
  textAlign: "center",
  maxWidth: 320,
  fontWeight: 400,
});

export const iconStyle = style({
  fontSize: 64,
  marginBottom: '1rem'
});

export const dialogTitle = style({
  fontSize: 18,
  margin: "0 0 1em 0",
  fontWeight: 700,
});

export const dialogText = style({
    fontSize: 15,
    margin: "0 0 2em 0",
    fontWeight: 400,
})

export const dialogButton = style({
    width: '100%',
    background: "linear-gradient(0deg, #007AFF, #3995f9)",
    height: 32,
    padding: 0,
    border: 'none',
    borderRadius: 5,
    color: vars.color.text,
    fontSize: 15,
    cursor: 'pointer',
})
