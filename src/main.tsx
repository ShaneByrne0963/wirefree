import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/style.css";
import "./assets/css/canvas.css";
import "./assets/css/window.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
