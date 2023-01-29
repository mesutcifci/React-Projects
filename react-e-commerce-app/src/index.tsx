import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App";

// Styles
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./index.css";
import { Provider } from "react-redux";
import { setupStore } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
