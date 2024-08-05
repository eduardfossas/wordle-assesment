import { Form } from "@remix-run/react";
import { icon, iconButton, iconContainer } from "./styles.css";
import { motion } from "framer-motion";

type Props = {
  currentTheme: string;
};

const ToggleThemeButton = ({ currentTheme }: Props) => {
  const themeToToggleTo = currentTheme === "dark" ? "light" : "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={iconContainer}
    >
      <Form action="/preferences/theme" method="POST">
        <input type="hidden" name="theme" value={themeToToggleTo} />
        <button className={iconButton}>
          {currentTheme === "dark" ? (
            <svg className={icon}>
              <use href="#moon"></use>
            </svg>
          ) : (
            <svg className={icon}>
              <use href="#sun"></use>
            </svg>
          )}
        </button>
      </Form>
    </motion.div>
  );
};

export { ToggleThemeButton };
