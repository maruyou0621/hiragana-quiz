import React, { useState } from "react";
import { kanaList } from "../data/kanaList"; // ← データを外部ファイルから取得！

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
      <p className="quiz-question">{question.correct.kana}</p>
      <div className="quiz-options">
        {question.options.map((option) => (
          <button key={option} className="quiz-button" onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <p className="quiz-feedback">{feedback}</p>
    </div>
  );
}
