import type { MetaFunction } from "@remix-run/node";
import { Word } from "app/components/word";
import { useEffect, useRef, useState } from "react";
import { appStyle } from "app/styles/app.css";
import { Feedback } from "~/components/feedback";
import { Dialog } from "~/components/dialog/dialog";
import { DialogType } from "types/elements";
import { stagger, animate } from "framer-motion";
import { letterVariants } from "app/components/letter/styles.css";
import { RowsArrayType } from "types/elements";

export const meta: MetaFunction = () => {
  return [
    { title: "Wordle Assesment" },
    {
      name: "description",
      content: "Welcome to the Wordle Assestment for CVMaker",
    },
  ];
};

export default function Index() {
  const appRef = useRef<HTMLDivElement>(null);
  const rowsArray = useRef<RowsArrayType>([[], [], [], [], []]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [popUp, setPopup] = useState<DialogType>();
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animate(
      ".wrapper",
      { rotateX: [-90, 0], opacity: [0, 1] },
      {
        delay: stagger(0.025, { startDelay: 0.25 }),
        ease: "circInOut",
        duration: 2,
      }
    );
  }, []);

  useEffect(() => {
    if (!popUp?.icon) {
      const rows = rowsArray.current;
      rows[0][0].focus();
      for (let u = 0; u < rows.length; u++) {
        for (let v = 0; v < rows[u].length; v++) {
          rows[u][v].classList.remove(letterVariants.correct);
          rows[u][v].classList.remove(letterVariants.incorrect);
          rows[u][v].classList.remove(letterVariants.misplaced);
          rows[u][v].value = "";
        }
      }
      setActiveRow(0);
    }
  }, [popUp]);

  return (
    <>
      <div ref={appRef} className={appStyle}>
        <div>
          {rowsArray.current.map((el: Array<HTMLInputElement>, key: number) => (
            <Word
              activeRow={activeRow}
              rowsArray={rowsArray}
              feedbackRef={feedbackRef}
              setActiveRow={setActiveRow}
              setPopup={setPopup}
              key={key}
              rowId={key}
            />
          ))}
        </div>
        <Feedback feedbackRef={feedbackRef} />
      </div>
      <Dialog {...popUp} setPopup={setPopup} />
    </>
  );
}
