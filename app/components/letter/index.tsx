import { KeyboardEvent, RefObject } from "react";
import { useKeyboard } from "react-aria";
import { letterStyle, letterVariants, letter } from "./styles.css";
import { refToArray } from "app/utils/react";
import { clsx } from "clsx";
import { WORDS } from "data/words";
import { clamp } from "app/utils/math";
import { POPUP_TEXT } from "data/text";
import {
  RowsArrayType,
  RowsArrayTypeRef,
  ArrayStringType,
} from "types/elements";
import { animate, motion, useMotionValue } from "framer-motion";
import { WORD_LENGTH, DAILY_WORD } from "constants/game";
import { feedbackTextVariants } from "../feedback/styles.css";

type Props = {
  rowsArray: RowsArrayTypeRef;
  rowId: number;
  letterId: number;
  activeRow: number;
  feedbackRef: RefObject<HTMLElement>;
  setActiveRow: Function;
  setPopup: Function;
};

const Letter = ({
  rowsArray,
  rowId,
  letterId,
  activeRow,
  feedbackRef,
  setActiveRow,
  setPopup,
}: Props) => {
  const isActiveRow = rowId === activeRow;
  const scale = useMotionValue(1);

  const activeLetter = (number: number, rowId: number) => {
    const num = clamp(number, 0, 4);
    const row = clamp(rowId, 0, 4);
    rowsArray.current![row][num].focus();
    rowsArray.current![row][num].select();
  };

  const evaluateGuess = (arr: ArrayStringType) => {
    const guessedLetters = [] as ArrayStringType;
    const correctLeters = [] as ArrayStringType;

    arr.map((el, i) => {
      const currLetter = el.toLowerCase();
      const letterDiv = rowsArray.current![activeRow][i];
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
      feedbackRef.current?.classList.add(feedbackTextVariants.visible);
    } else {
      if (WORDS.includes(word.toLowerCase())) {
        evaluateGuess(arr);
        setActiveRow((prev: number) => prev + 1);
        if (activeRow === 4) {
          setPopup(POPUP_TEXT.LOSER);
        }
        arr = [];
        activeLetter(0, activeRow + 1);
        feedbackRef.current?.classList.remove(feedbackTextVariants.visible);
      } else {
        feedbackRef.current!.innerText = "This is not a word";
        feedbackRef.current?.classList.add(feedbackTextVariants.visible);
      }
    }
  };

  let { keyboardProps } = useKeyboard({
    onKeyDown: (event: KeyboardEvent) => {
      let currKey = event.key;
      if (currKey === "Enter") {
        handleEnterKey();
      } else if (currKey === "Backspace") {
        activeLetter(letterId, rowId);
        feedbackRef.current?.classList.remove(feedbackTextVariants.visible);
        return;
      } else {
        animate(scale, 0.9, { duration: 0.1 });
      }
    },
    onKeyUp: (event: KeyboardEvent) => {
      let currKey = event.key;

      if (currKey === "Enter") {
        return;
      } else {
        animate(scale, 1, { duration: 0.1 });
      }

      if (currKey === "Backspace") {
        activeLetter(letterId - 1, rowId);
      } else if (currKey !== "Tab") {
        activeLetter(letterId + 1, rowId);
      }
    },
  });

  return (
    <motion.div
      style={{ scale }}
      className={clsx(
        letter,
        { [letterVariants.noPointers]: !isActiveRow },
        { [letterVariants.pointers]: isActiveRow },
        "wrapper"
      )}
    >
      <input
        className={letterStyle}
        {...keyboardProps}
        type="text"
        minLength={1}
        maxLength={1}
        tabIndex={isActiveRow ? 0 : -1}
        ref={(el) => {
          refToArray(el, rowsArray.current![rowId]);
        }}
      ></input>
    </motion.div>
  );
};

export { Letter };
