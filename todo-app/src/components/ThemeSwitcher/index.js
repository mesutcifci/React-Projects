import style from "./styles.module.css";
import { ThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

const ThemeSwitcher = () => {
  const { changeTheme, theme } = useContext(ThemeContext);
  return (
    <div className={`${style.switch} ${theme === "dark" && style.switchNeon}`}>
      <div
        className={`${style.circle} ${
          theme === "dark" ? style.circleDark : style.circleLight
        }`}
      >
        {theme === "dark" ? (
          <img
            src="./images/sun.svg"
            onClick={() => changeTheme("light")}
            alt="moon icon"
          />
        ) : (
          <img
            src="./images/moon.svg"
            onClick={() => changeTheme("dark")}
            alt="sun"
          />
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
