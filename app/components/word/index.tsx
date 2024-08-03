import { Letter } from "app/components/letter";
import { wordStyle } from "./styles.css";

const Word = ({
  rowsArray,
  rowId,
  activeRow,
  feedbackRef,
  setActiveRow,
}: {
  rowsArray: any;
  rowId: number;
  activeRow: number;
  feedbackRef: any;
  setActiveRow: any;
}) => {
  const words = [1, 2, 3, 4, 5];
  return (
    <div className={wordStyle} tabIndex={rowId !== activeRow ? -1 : 0}>
      {words.map((_, key) => (
        <Letter
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
