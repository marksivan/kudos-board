import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import HomePage from "./HomePage/HomePage.jsx";
import BoardPage from "./BoardPage/BoardPage.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards/:id" element={<BoardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
