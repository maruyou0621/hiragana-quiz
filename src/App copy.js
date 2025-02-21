import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopPage from "./components/TopPage";
import HiraganaQuiz from "./components/HiraganaQuiz";
import N3Quiz from "./components/N3Quiz";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/quiz/hiragana" element={<HiraganaQuiz />} />
          <Route path="/quiz/n3" element={<N3Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
