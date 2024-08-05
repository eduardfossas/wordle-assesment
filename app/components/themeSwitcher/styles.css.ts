import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const iconContainer = style({
    position: 'absolute',
    top: 20,
    right: 20,
})

export const iconButton = style({
    display: "flex",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    color: vars.color.text,
    border: `1px solid ${vars.color.text}`,
    opacity: 0.3,
    background: "none",
    cursor: 'pointer'
})

export const icon = style({
    width: 20,
    height: 20,
   
})