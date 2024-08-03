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

const Dialog = ({
  icon,
  title,
  text,
  setPopup,
}: DialogType & { setPopup: any }) => {
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
    icon && (
      <div
        className={dialogBackground}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog_title"
        aria-describedby="dialog_text"
        onKeyDown={handleKeyDown}
      >
        <div className={dialogContainer}>
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
            <button
              className={dialogButton}
              ref={buttonRef}
              type="button"
              onClick={(event) => {
                setPopup({ icon: "" });
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export { Dialog };
