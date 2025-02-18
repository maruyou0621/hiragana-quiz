import React, { useState } from "react";
import HiraganaQuiz from "./components/HiraganaQuiz";
import N3Quiz from "./components/N3Quiz";
import "./styles/App.css"; // スタイルを適用

function App() {
  // 表示するクイズを切り替えるための状態
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
        {/* A8.net のトラッキング用透明画像 */}
        <img 
          border="0" 
          width="1" 
          height="1" 
          src="https://www10.a8.net/0.gif?a8mat=44Z1NL+F75DPU+5M44+5YRHE" 
          alt="" 
        />
      </div>

      {/* クイズ選択ボタン */}
      <div className="quiz-selection">
        <button onClick={() => setQuizType("hiragana")}>
          ひらがなクイズ
        </button>
        <button onClick={() => setQuizType("n3")}>
          N3単語クイズ
        </button>
      </div>

      {/* 選択されたクイズを表示 */}
      {quizType === "hiragana" ? <HiraganaQuiz /> : <N3Quiz />}
    </div>
  );
}

export default App;
