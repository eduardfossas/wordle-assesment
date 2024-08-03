import { Letter } from "app/components/letter";
import { wordStyle } from "./styles.css";

const Word = ({ rowsArray, rowId }: { rowsArray: any; rowId: number }) => {
  const words = [1, 2, 3, 4, 5];
  return (
    <div className={wordStyle}>
      {words.map((_, key) => (
        <Letter rowsArray={rowsArray} rowId={rowId} key={key} />
      ))}
    </div>
  );
};

export { Word };
