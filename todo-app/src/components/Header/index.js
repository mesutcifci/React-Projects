import style from "./styles.module.css";
import ThemeSwitcher from "../ThemeSwitcher";

const Header = () => {
  return (
    <header>
      <h1 className={style.heading}>TODO APP</h1>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
