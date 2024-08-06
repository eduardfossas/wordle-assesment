import { Letter } from "app/components/letter";
import { wordStyle } from "./styles.css";
import { RefObject } from "react";
import { RowsArrayTypeRef } from "types/elements";
import { AppDataType } from "types/data";

type Props = {
  rowsArray: RowsArrayTypeRef;
  rowId: number;
  activeRow: number;
  feedbackRef: RefObject<HTMLDivElement>;
  setActiveRow: Function;
  setPopup: Function;
  appData: AppDataType;
};

const Word = ({
  rowsArray,
  rowId,
  activeRow,
  feedbackRef,
  setActiveRow,
  setPopup,
  appData,
}: Props) => {
  const words = new Array(5).fill("");
  return (
    <div className={wordStyle} tabIndex={rowId !== activeRow ? -1 : 0}>
      {words.map((_, key) => (
        <Letter
          appData={appData}
          setPopup={setPopup}
          setActiveRow={setActiveRow}
          feedbackRef={feedbackRef}
          activeRow={activeRow}
          rowsArray={rowsArray}
          rowId={rowId}
          letterId={key}
          key={key}
        />
      ))}
    </div>
  );
};

export { Word };
