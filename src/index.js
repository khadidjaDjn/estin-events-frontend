import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // <-- App.jsx
import "./styles/App.css"; // optional, your main CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
