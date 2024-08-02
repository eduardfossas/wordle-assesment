import { letterStyle } from "./styles.css";
import { refToArray } from "app/utils/react";

const Letter = ({ rowsArray, rowId }: { rowsArray: any; rowId: number }) => {
  return (
    <div
      className={letterStyle}
      ref={(el) => {
        refToArray(el, rowsArray.current[rowId]);
      }}
    ></div>
  );
};

export { Letter };
