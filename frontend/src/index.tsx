import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "@material-tailwind/react";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <IntlProvider locale="en-GB">
        <App />
      </IntlProvider>
    </ThemeProvider>
  </React.StrictMode>
);
