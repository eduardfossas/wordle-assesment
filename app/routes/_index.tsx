import type { MetaFunction } from "@remix-run/node";
import { Word } from "app/components/word";
import { useEffect, useRef, useState } from "react";
import { appStyle } from "app/styles/app.css";
import { Feedback } from "~/components/feedback";
import { Dialog } from "~/components/dialog/dialog";
import { DialogType } from "types/elements";

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
  const rowsArray = useRef<any>([[], [], [], [], []]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [popUp, setPopup] = useState<DialogType>();
  const [reset, setReset] = useState();
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popUp?.icon) {
      rowsArray.current[0][0].focus();
      setActiveRow(0);
    }
  }, [popUp]);

  return (
    <>
      <div ref={appRef} className={appStyle}>
        <div>
          {rowsArray.current.map((el: any, key: number) => (
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
