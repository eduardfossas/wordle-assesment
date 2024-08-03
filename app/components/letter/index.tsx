import {
  FormEvent,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { useKeyboard } from "react-aria";
import {
  letterActive,
  letterInactive,
  letterStyle,
  letterVariants,
} from "./styles.css";
import { refToArray } from "app/utils/react";
import { clsx } from "clsx";
import { WORDS } from "data/words";
import { clamp } from "app/utils/math";
import { POPUP_TEXT } from "data/text";
import { RowsArrayType, ArrayStringType } from "types/elements";

const WORD_LENGTH = 5;
const DAILY_WORD = "tendu";

const Letter = ({
  rowsArray,
  rowId,
  letterId,
  activeRow,
  feedbackRef,
  setActiveRow,
  setPopup,
}: {
  rowsArray: RowsArrayType;
  rowId: number;
  letterId: number;
  activeRow: number;
  feedbackRef: RefObject<HTMLElement>;
  setActiveRow: any;
  setPopup: any;
}) => {
  const isActiveRow = rowId === activeRow;

  const evaluateGuess = (arr: ArrayStringType) => {
    const guessedLetters = [] as ArrayStringType;
    const correctLeters = [] as ArrayStringType;

    arr.map((el, i) => {
      const currLetter = el.toLowerCase();
      const letterDiv = rowsArray.current[activeRow][i];
      if (currLetter === DAILY_WORD[i]) {
        letterDiv.classList.add(letterVariants.correct);
        guessedLetters.push(currLetter);
        correctLeters.push(currLetter);
      } else if (
        DAILY_WORD.includes(currLetter) &&
        !guessedLetters.includes(currLetter)
      ) {
        letterDiv.classList.add(letterVariants.misplaced);
        guessedLetters.push(currLetter);
      } else {
        letterDiv.classList.add(letterVariants.incorrect);
      }
    });

    if (correctLeters.length === 5) {
      setPopup(POPUP_TEXT.WINNER);
    }
  };

  const handleEnterKey = () => {
    let word = "";
    let arr = [] as ArrayStringType;
    if (!rowsArray.current) return;

    rowsArray.current[activeRow].map((element: HTMLInputElement) => {
      const letter = element.value;
      word += letter;
      arr.push(letter);
    });

    if (word.length < WORD_LENGTH) {
      feedbackRef.current!.innerText =
        "The word is less than 5 characters long";
    } else {
      if (WORDS.includes(word.toLowerCase())) {
        evaluateGuess(arr);
        setActiveRow((prev: number) => prev + 1);
        if (activeRow === 4) {
          setPopup(POPUP_TEXT.LOSER);
        }
        arr = [];
        rowsArray.current[activeRow + 1][0].click();
        rowsArray.current[activeRow + 1][0].focus();
      } else {
        feedbackRef.current!.innerText = "This is not a word";
      }
    }
  };

  let { keyboardProps } = useKeyboard({
    onKeyDown: (event: any) => {
      let currKey = event.key;

      if (currKey === "Enter") {
        handleEnterKey();
      } else if (currKey === "Backspace") {
        feedbackRef.current!.innerText = "";
      }
    },
    onKeyUp: (event: any) => {
      let currKey = event.key;

      if (currKey === "Enter") return;

      if (currKey === "Backspace") {
        const num = clamp(letterId - 1, 0, 4);
        rowsArray.current[rowId][num].focus();
        rowsArray.current[rowId][num].select();
      } else if (currKey !== "Tab") {
        const num = clamp(letterId + 1, 0, 4);
        rowsArray.current[rowId][num].focus();
        rowsArray.current[rowId][num].select();
      }
    },
  });

  return (
    <div className={clsx(letterInactive, { [letterActive]: isActiveRow })}>
      <input
        className={letterStyle}
        {...keyboardProps}
        type="text"
        minLength={1}
        pattern="[A-Za-z]+"
        maxLength={1}
        tabIndex={isActiveRow ? 0 : -1}
        ref={(el) => {
          refToArray(el, rowsArray.current[rowId]);
        }}
      ></input>
    </div>
  );
};

export { Letter };
