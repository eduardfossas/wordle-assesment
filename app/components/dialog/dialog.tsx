import { KeyboardEvent, useEffect, useRef } from "react";
import {
  dialogBackground,
  dialogButton,
  dialogContainer,
  dialogText,
  dialogTitle,
  iconStyle,
} from "./styles.css";
import { DialogType } from "types/elements";
import { motion } from "framer-motion";

const Dialog = ({
  icon,
  title,
  text,
  setPopup,
}: DialogType & { setPopup: Function }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  let timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timeout.current = setTimeout(() => {
      buttonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [icon]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
    const { key } = event;
    if (key === "Tab") {
      buttonRef.current?.focus();
    } else if (key === "Escape" || key === "Enter") {
      setPopup({ icon: "" });
    }
  };

  return (
    <motion.div
      key="hey"
      className={dialogBackground}
      role="alertdialog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.5 }}
      aria-modal="true"
      aria-labelledby="dialog_title"
      aria-describedby="dialog_text"
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        exit={{ y: 10, opacity: 0 }}
        className={dialogContainer}
      >
        <div className={iconStyle} aria-hidden="true">
          {icon}
        </div>
        <h3 className={dialogTitle} id="dialog_title">
          {title}
        </h3>
        <div id="dialog_text">
          <p className={dialogText}>{text}</p>
        </div>
        <div>
          <motion.button
            className={dialogButton}
            ref={buttonRef}
            type="button"
            onClick={() => {
              setPopup({ icon: "" });
            }}
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { Dialog };
