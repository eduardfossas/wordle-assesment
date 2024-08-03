import { globalStyle } from "@vanilla-extract/css";
import { vars, PRIMARY_FONT } from "./theme.css";

globalStyle("html, body", {
  margin: 0,
  color: vars.color.text,
  fontFamily: PRIMARY_FONT,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: 'grayscale'
});
