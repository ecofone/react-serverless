import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "./components/Context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
