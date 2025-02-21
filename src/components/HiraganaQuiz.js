import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { kanaList } from "../data/kanaList"; // データを外部ファイルから取得

// ランダムな問題を取得
const getRandomQuestion = () => {
  const correct = kanaList[Math.floor(Math.random() * kanaList.length)];
  let options = new Set([correct.romaji]);
  while (options.size < 4) {
    options.add(kanaList[Math.floor(Math.random() * kanaList.length)].romaji);
  }
  return { correct, options: Array.from(options).sort(() => Math.random() - 0.5) };
};

export default function HiraganaQuiz() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    if (answer === question.correct.romaji) {
      setFeedback("✅ 正解！");
      setTimeout(() => {
        setFeedback("");
        setQuestion(getRandomQuestion());
      }, 1000);
    } else {
      setFeedback("❌ 不正解…");
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">ひらがな・カタカナクイズ</h1>
      <p className="quiz-question question-text">{question.correct.kana}</p> {/* クラスを追加してサイズ調整 */}
      <div className="quiz-options">
        {question.options.map((option) => (
          <button key={option} className="quiz-button" onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      
      {/* クイズ切り替えボタン */}
      <div className="quiz-switch-buttons">
        <button className="quiz-switch-button" onClick={() => navigate("/quiz/n3")}>N3クイズへ</button>
        <button className="quiz-switch-button" onClick={() => navigate("/")}>トップページへ</button>
      </div>
      
      {/* 正解・不正解のフィードバックをクイズ切り替えボタンの下に配置 */}
      <p className="quiz-feedback">{feedback}</p>
    </div>
  );
}
