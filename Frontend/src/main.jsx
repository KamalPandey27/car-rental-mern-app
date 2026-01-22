import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BookProvider } from "./context/BookProvider.jsx";
import { AuthProvider } from "./context/authContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BookProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </BookProvider>
  </AuthProvider>,
);
