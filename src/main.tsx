import "./globals.css";

import ReactDOM from "react-dom/client";
import { App } from "./App";
import { SessionProvider } from "./hooks/auth";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <SessionProvider>
      <App />
    </SessionProvider>
  );
}
