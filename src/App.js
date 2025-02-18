import React from "react";
import HiraganaQuiz from "./components/HiraganaQuiz"; 
import "./App.css";

function App() {
  return (
    <div>
      {/* A8.net テキスト広告エリア */}
      <div className="ad-container">
        <a href="https://px.a8.net/svt/ejp?a8mat=44Z1NL+F75DPU+5M44+5YRHE" 
           rel="nofollow" target="_blank" rel="noopener noreferrer" className="ad-text">
          【花西子(フローラシス)】日本でも大人気の中国コスメ
        </a>
        <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=44Z1NL+F75DPU+5M44+5YRHE" alt="" />
      </div>

      {/* ひらがなクイズ */}
      <HiraganaQuiz />
    </div>
  );
}

export default App;
