import React, { useState } from "react";

const WORD_LENGTH = 5;
const NUMBER_OF_GUESSES = 6;
const CORRECT_WORD = "React";

const Cell = ({ letter, status }) => <div className={status}>{letter}</div>;

const WordleGame = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: NUMBER_OF_GUESSES }, () =>
      Array(WORD_LENGTH).fill(null)
    )
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      evaluateGuess();
    } else if (event.key === "Backspace" && currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (
      currentGuess.length < WORD_LENGTH &&
      /^[A-Za-z]$/.test(event.key)
    ) {
      setCurrentGuess(currentGuess + event.key);
    }
  };

  const evaluateGuess = () => {
    if (attempts >= NUMBER_OF_GUESSES || currentGuess.length !== WORD_LENGTH)
      return;

    let newGrid = [...grid];
    let newAttempts = attempts + 1;
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (currentGuess[i] === CORRECT_WORD[i]) {
        newGrid[attempts][i] = { letter: currentGuess[i], status: "correct" };
      } else if (CORRECT_WORD.includes(currentGuess[i])) {
        newGrid[attempts][i] = { letter: currentGuess[i], status: "misplaced" };
      } else {
        newGrid[attempts][i] = { letter: currentGuess[i], status: "incorrect" };
      }
    }

    setGrid(newGrid);
    setAttempts(newAttempts);
    setCurrentGuess("");
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyPress}>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((cell, cellIdx) => (
            <Cell
              key={cellIdx}
              letter={cell ? cell.letter : ""}
              status={cell ? cell.status : ""}
            />
          ))}
        </div>
      ))}
      <div>Current guess: {currentGuess}</div>
    </div>
  );
};
