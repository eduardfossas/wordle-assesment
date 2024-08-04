import { RefObject } from "react";
import { feedbackContainer, feedbackText } from "./styles.css";

type Props = {
  feedbackRef: RefObject<HTMLDivElement>;
};

const Feedback = ({ feedbackRef }: Props) => {
  return (
    <div className={feedbackContainer} role="alert">
      <div className={feedbackText} ref={feedbackRef}></div>
    </div>
  );
};

export { Feedback };
