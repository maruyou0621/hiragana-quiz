import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopPage from "./components/TopPage";
import HiraganaQuiz from "./components/HiraganaQuiz";
import N3Quiz from "./components/N3Quiz";
import ImageQuiz from "./components/ImageQuiz"; // 追加
import "./styles/App.css";

function App() {
  useEffect(() => {
    // Google AdSense スクリプトをロード
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.setAttribute("data-ad-client", "ca-pub-3664256079291682");
    document.head.appendChild(script);

    // 広告のロード
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense load error:", e);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/quiz/hiragana" element={<HiraganaQuiz />} />
          <Route path="/quiz/n3" element={<N3Quiz />} />
          <Route path="/quiz/image" element={<ImageQuiz />} /> {/* 画像クイズを追加 */}
        </Routes>

        {/* Google AdSense 広告を表示 */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <ins className="adsbygoogle"
               style={{ display: "block" }}
               data-ad-client="ca-pub-3664256079291682"
               data-ad-slot="8034167600"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    </Router>
  );
}

export default App;
