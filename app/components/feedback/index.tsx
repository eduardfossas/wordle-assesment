import { RefObject } from "react";
import { feedbackContainer } from "./styles.css";

type Props = {
  feedbackRef: RefObject<HTMLDivElement>;
};

const Feedback = ({ feedbackRef }: Props) => {
  return (
    <div className={feedbackContainer} role="alert">
      <div ref={feedbackRef}></div>
    </div>
  );
};

export { Feedback };
