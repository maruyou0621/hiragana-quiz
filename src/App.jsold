import React, { useState, useEffect } from "react";
import HiraganaQuiz from "./components/HiraganaQuiz";
import N3Quiz from "./components/N3Quiz";
import "./styles/App.css";

function App() {
  const [quizType, setQuizType] = useState("hiragana");

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3664256079291682";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };
  }, []);

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

      {/* 📢 Google AdSense 固定バナー広告（横長バナー指定） */}
      <div className="adsense-banner">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3664256079291682"
          data-ad-slot="8034167600"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}

export default App;
