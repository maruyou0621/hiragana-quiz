import React, { useState, useEffect } from "react";
import HiraganaQuiz from "./components/HiraganaQuiz";
import N3Quiz from "./components/N3Quiz";
import AdBannerFixed from "./components/AdBannerFixed"; // クイズの下に表示する広告
import "./styles/App.css";

function App() {
  const [quizType, setQuizType] = useState("hiragana");

  return (
    <div className="app-container">
      {/* 🔘 クイズ切り替えボタン */}
      <div className="nav-buttons">
        <button
          className={`nav-button ${quizType === "hiragana" ? "active" : ""}`}
          onClick={() => setQuizType("hiragana")}
        >
          ひらがなクイズ
        </button>
        <button
          className={`nav-button ${quizType === "n3" ? "active" : ""}`}
          onClick={() => setQuizType("n3")}
        >
          N3総合クイズ
        </button>
      </div>

      {/* 🎮 クイズ本体 */}
      {quizType === "hiragana" ? <HiraganaQuiz /> : <N3Quiz />}

      {/* 📢 クイズの下に常時表示するA8.net広告 */}
      <AdBannerFixed />
    </div>
  );
}

export default App;
