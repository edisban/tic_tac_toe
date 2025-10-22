import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScoreProvider } from "./context/ScoreContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
