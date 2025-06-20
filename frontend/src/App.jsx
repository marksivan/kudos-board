import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import BoardPage from './BoardPage/BoardPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}
