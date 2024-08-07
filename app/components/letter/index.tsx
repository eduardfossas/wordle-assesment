import { KeyboardEvent, RefObject } from "react";
import { useKeyboard } from "react-aria";
import { letterStyle, letterVariants, letter } from "./styles.css";
import { refToArray } from "app/utils/react";
import { clsx } from "clsx";
import { clamp } from "app/utils/math";
import { POPUP_TEXT } from "data/text";
import { RowsArrayTypeRef, ArrayStringType } from "types/elements";
import { animate, motion, useMotionValue } from "framer-motion";
import { WORD_LENGTH } from "constants/game";
import { feedbackTextVariants } from "../feedback/styles.css";
import { AppDataType } from "types/data";

type Props = {
  rowsArray: RowsArrayTypeRef;
  rowId: number;
  letterId: number;
  activeRow: number;
  feedbackRef: RefObject<HTMLElement>;
  setActiveRow: Function;
  setPopup: Function;
  appData: AppDataType;
};

const Letter = ({
  rowsArray,
  rowId,
  letterId,
  activeRow,
  feedbackRef,
  setActiveRow,
  setPopup,
  appData,
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
    const letters = [] as Array<{
      letter: string;
      status: "correct" | "misplaced" | "incorrect";
    }>;
    const guessedLetters = [] as ArrayStringType;
    const correctLeters = [] as ArrayStringType;

    arr.map((el, i) => {
      const currLetter = el.toLowerCase();
      if (currLetter === appData.selectedWord[i]) {
        letters.push({ letter: currLetter, status: "correct" });
        correctLeters.push(currLetter);
        guessedLetters.push(currLetter);
      } else if (
        appData.selectedWord.includes(currLetter) &&
        !guessedLetters.includes(currLetter)
      ) {
        letters.push({ letter: currLetter, status: "misplaced" });
      } else {
        letters.push({ letter: currLetter, status: "incorrect" });
      }
    });

    letters.map(({ letter, status }, i) => {
      const letterDiv = rowsArray.current![activeRow][i];
      if (correctLeters.includes(letter) && status === "misplaced")
        status = "incorrect";

      letterDiv.classList.add(letterVariants[`${status}`]);
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
      if (appData.words.includes(word.toLowerCase())) {
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
      } else if (currKey !== "Tab") {
        animate(scale, 0.9, { duration: 0.1 });
      }
    },
    onKeyUp: (event: KeyboardEvent) => {
      let currKey = event.key;

      if (currKey === "Enter") return;

      if (currKey === "Backspace") {
        activeLetter(letterId - 1, rowId);
      } else if (currKey !== "Tab") {
        animate(scale, 1, { duration: 0.1 });
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
