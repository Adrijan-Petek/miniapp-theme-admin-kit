import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </ThemeProvider>
  );
}
