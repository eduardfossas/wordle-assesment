import { Letter } from "app/components/letter";
import { wordStyle } from "./styles.css";
import { RefObject } from "react";

const Word = ({
  rowsArray,
  rowId,
  activeRow,
  feedbackRef,
  setActiveRow,
  setPopup,
}: {
  rowsArray: any;
  rowId: number;
  activeRow: number;
  feedbackRef: RefObject<HTMLDivElement>;
  setActiveRow: any;
  setPopup: any;
}) => {
  const words = new Array(5).fill("");
  return (
    <div className={wordStyle} tabIndex={rowId !== activeRow ? -1 : 0}>
      {words.map((_, key) => (
        <Letter
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
