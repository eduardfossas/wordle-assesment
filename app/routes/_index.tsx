import type { MetaFunction } from "@remix-run/node";
import { Word } from "app/components/word";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { WORDS } from "data/words";
import { appStyle } from "app/styles/app.css";
import { letterVariants } from "app/components/letter/styles.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const WORD_LENGTH = 5;
const DAILY_WORD = "tendu";

export default function Index() {
  const appRef = useRef<HTMLDivElement>(null);
  const rowsArray = useRef<any>([[], [], [], [], []]);
  const arrTracker = useRef<Array<string>>([]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const counterRef = useRef<number>(0);
  const feedbackRef = useRef<any | { innerText: string }>({
    innerText: "",
  });

  useEffect(() => {
    const currRow = rowsArray.current[activeRow];
    if (appRef.current) {
      appRef.current.focus();
      currRow[counterRef.current].classList.add(letterVariants.active);
    }
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    const currRow = rowsArray.current[activeRow];

    if (key === "Enter") {
      handleEnterKey();
    } else if (key === "Backspace" && counterRef.current !== 0) {
      counterRef.current -= 1;
      currRow[counterRef.current].innerText = "";
      currRow[
        counterRef.current < WORD_LENGTH - 1
          ? counterRef.current + 1
          : counterRef.current
      ].classList.remove(letterVariants.active);
      currRow[counterRef.current].classList.add(letterVariants.active);
      feedbackRef.current.innerText = "";
    } else if (/^[A-Za-z]$/.test(key) && counterRef.current < WORD_LENGTH) {
      currRow[counterRef.current].innerText = key;
      currRow[
        counterRef.current < WORD_LENGTH - 1
          ? counterRef.current + 1
          : counterRef.current
      ].classList.add(letterVariants.active);
      currRow[counterRef.current].classList.remove(letterVariants.active);
      counterRef.current += 1;
    }
  };

  const evaluateGuess = (arr: Array<string>) => {
    console.log(arr);
    arr.map((el, i) => {
      const currLetter = el.toLowerCase();
      const letterDiv = rowsArray.current[activeRow][i];
      if (currLetter === DAILY_WORD[i])
        letterDiv.classList.add(letterVariants.correct);
      else if (DAILY_WORD.includes(currLetter))
        return letterDiv.classList.add(letterVariants.misplaced);
      else return letterDiv.classList.add(letterVariants.incorrect);
    });
  };

  const handleEnterKey = () => {
    let word = "";

    if (counterRef.current < WORD_LENGTH) {
      if (feedbackRef.current)
        feedbackRef.current.innerText =
          "The word is less than 5 characters long";
    } else {
      rowsArray.current[activeRow].map((element: HTMLDivElement) => {
        const letter = element.innerText;
        word += letter;
        arrTracker.current.push(letter);
      });
      if (WORDS.includes(word.toLowerCase())) {
        setActiveRow((prev) => prev + 1);
        evaluateGuess(arrTracker.current);
        arrTracker.current = [];
        counterRef.current = 0;
        rowsArray.current[activeRow + 1][counterRef.current].classList.add(
          letterVariants.active
        );
      } else {
        feedbackRef.current.innerText = "this is not a word";
      }
    }
  };

  return (
    <div
      ref={appRef}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      className={appStyle}
    >
      <div>
        {rowsArray.current.map((el: any, key: number) => (
          <Word rowsArray={rowsArray} key={key} rowId={key} />
        ))}
      </div>
      <div ref={feedbackRef}></div>
    </div>
  );
}
