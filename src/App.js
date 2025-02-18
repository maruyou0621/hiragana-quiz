import React, { useState } from "react";
import HiraganaQuiz from "./components/HiraganaQuiz";
import N3Quiz from "./components/N3Quiz";
import "./styles/App.css";

function App() {
  const [quizType, setQuizType] = useState("hiragana");

  return (
    <div className="app-container">
      {/* A8.net テキスト広告エリア */}
      <div className="ad-container">
        <a
          href="https://px.a8.net/svt/ejp?a8mat=44Z1NL+F75DPU+5M44+5YRHE"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="ad-text"
        >
          【花西子(フローラシス)】日本でも大人気の中国コスメ
        </a>
        <img
          border="0"
          width="1"
          height="1"
          src="https://www10.a8.net/0.gif?a8mat=44Z1NL+F75DPU+5M44+5YRHE"
          alt=""
        />
      </div>

      {/* ナビゲーションボタン */}
      <div className="quiz-switcher">
        <button className={`quiz-button ${quizType === "hiragana" ? "active" : ""}`} onClick={() => setQuizType("hiragana")}>
          ひらがなクイズ
        </button>
        <button className={`quiz-button ${quizType === "n3" ? "active" : ""}`} onClick={() => setQuizType("n3")}>
          N3単語クイズ
        </button>
      </div>

      {/* クイズの表示 */}
      {quizType === "hiragana" ? <HiraganaQuiz /> : <N3Quiz />}
    </div>
  );
}

export default App;
