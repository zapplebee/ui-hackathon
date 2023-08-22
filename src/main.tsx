import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { OpenAPI } from "./api/index.ts";

/**
 * OpenAPI can use a specific base url. Use the environment variable or fallback to localhost.
 */
OpenAPI.BASE = import.meta.env.VITE_VELA_API ?? "http://localhost:8080";

/**
 * OpenAPI allows a function to resolve any time it is invoked. For our token,
 * checking for an updated token on each usage is more robust.
 * @returns
 */
OpenAPI.TOKEN = async () => {
  return (
    window.localStorage.getItem("vela-access-token")?.replace("Bearer ", "") ??
    ""
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
