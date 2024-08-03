import type { MetaFunction } from "@remix-run/node";
import { Word } from "app/components/word";
import { useEffect, useRef, useState } from "react";
import { appStyle } from "app/styles/app.css";
import { Feedback } from "~/components/feedback";

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
  const feedbackRef = useRef<any | { innerText: string }>({
    innerText: "",
  });

  useEffect(() => {
    rowsArray.current[0][0].focus();
  }, []);

  return (
    <div ref={appRef} tabIndex={0} className={appStyle}>
      <div>
        {rowsArray.current.map((el: any, key: number) => (
          <Word
            activeRow={activeRow}
            rowsArray={rowsArray}
            feedbackRef={feedbackRef}
            setActiveRow={setActiveRow}
            key={key}
            rowId={key}
          />
        ))}
      </div>
      <Feedback feedbackRef={feedbackRef} />
    </div>
  );
}
