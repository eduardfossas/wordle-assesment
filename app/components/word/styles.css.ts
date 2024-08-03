import { style } from "@vanilla-extract/css";
import { layoutToCss } from "app/utils/styles";

export const wordStyle = style({
  display: "flex",
  fontFamily: "Inter",
  gridGap: `${layoutToCss(10)}vw`,
  marginBottom: `${layoutToCss(10)}vw`,
  selectors: {
    "&:last-child": {
        marginBottom: 0,
    },
  },
});
