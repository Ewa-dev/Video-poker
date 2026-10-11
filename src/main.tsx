import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Login from "./pages/Login/Login.tsx";
import Play from "./pages/Play/Play.tsx";
import Rules from "./pages/Rules/Rules.tsx";
import Header from "./components/Header/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/play" element={<Play />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);