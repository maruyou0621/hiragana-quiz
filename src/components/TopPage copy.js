import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TopPage.css";

function TopPage() {
  const navigate = useNavigate();

  return (
    <div className="top-page-container">
      <h1>クイズを選択してください</h1>
      <div className="quiz-selection">
        <button className="quiz-button" onClick={() => navigate("/quiz/hiragana")}>ひらがなクイズ</button>
        <button className="quiz-button" onClick={() => navigate("/quiz/n3")}>N3総合クイズ</button>
      </div>
      
      {/* AdSense 広告（バナー） */}
      <div className="ad-container">
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3664256079291682"
          data-ad-slot="8034167600"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    </div>
  );
}

export default TopPage;
