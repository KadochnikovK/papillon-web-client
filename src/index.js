import React from "react";
import { MyProvider } from "./components/ui/provider";
import store from "./app/store";
import theme from "./theme";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyProvider store={store} theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyProvider>
);
