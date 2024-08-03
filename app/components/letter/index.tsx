import { FormEvent, KeyboardEventHandler, useRef, useState } from "react";
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

const WORD_LENGTH = 5;
const DAILY_WORD = "tendu";

const Letter = ({
  rowsArray,
  rowId,
  letterId,
  activeRow,
  feedbackRef,
  setActiveRow,
}: {
  rowsArray: any;
  rowId: number;
  letterId: number;
  activeRow: number;
  feedbackRef: any;
  setActiveRow: any;
}) => {
  const isActiveRow = rowId === activeRow;
  let keyPressed = "";

  const evaluateGuess = (arr: Array<string>) => {
    const guessedLetters = [] as Array<string>;
    arr.map((el, i) => {
      const currLetter = el.toLowerCase();
      const letterDiv = rowsArray.current[activeRow][i];
      if (currLetter === DAILY_WORD[i]) {
        letterDiv.classList.add(letterVariants.correct);
        guessedLetters.push(currLetter);
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
  };

  const handleEnterKey = () => {
    let word = "";
    let arr = [] as Array<string>;

    rowsArray.current[activeRow].map((element: HTMLInputElement) => {
      const letter = element.value;
      word += letter;
      arr.push(letter);
    });

    if (word.length < WORD_LENGTH) {
      feedbackRef.current.innerText = "The word is less than 5 characters long";
      feedbackRef.current.focus();
    } else {
      if (WORDS.includes(word.toLowerCase())) {
        evaluateGuess(arr);
        setActiveRow((prev: number) => prev + 1);
        if (activeRow === 4) {
          alert("you lost");
        }
        arr = [];
        rowsArray.current[activeRow + 1][0].click();
        rowsArray.current[activeRow + 1][0].focus();
      } else {
        feedbackRef.current.innerText = "This is not a word";
      }
    }
  };

  // this happens fisrt
  const handleKeyDown = (event: any) => {
    keyPressed = event.nativeEvent.key;

    if (keyPressed === "Enter") {
      handleEnterKey();
    } else if (keyPressed === "Backspace") {
      feedbackRef.current.innerText = "";
    } else if (keyPressed === "ArrowRight") {
      event.preventDefault();
      const num = clamp(letterId + 1, 0, 4);
      rowsArray.current[rowId][num].focus();
      rowsArray.current[rowId][num].select();
    } else if (keyPressed === "ArrowLeft") {
      event.preventDefault();
      const num = clamp(letterId - 1, 0, 4);
      rowsArray.current[rowId][num].focus();
      rowsArray.current[rowId][num].select();
    }
  };

  const handleOnInput = (event: any) => {
    if (keyPressed !== "Backspace") {
      const num = clamp(letterId + 1, 0, 4);
      rowsArray.current[rowId][num].click();
      rowsArray.current[rowId][num].focus();
    }
  };

  return (
    <div className={clsx(letterInactive, { [letterActive]: isActiveRow })}>
      <input
        className={letterStyle}
        onInput={handleOnInput}
        onKeyDown={handleKeyDown}
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
