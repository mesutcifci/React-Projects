import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  changeTheme: (value) => {},
});

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("dark");

  const changeTheme = (value) => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ changeTheme, theme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
