import React, { useState, useEffect } from "react";
import n3Words from "../data/n3_words"; // ✅ 修正: n3_words.jsの適切なインポート

// 配列をランダムに並び替える関数
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// クイズの問題を取得する関数
const getRandomQuestion = () => {
  if (n3Words.length === 0) return { correct: { japanese: "データがありません", chinese: "" }, options: [] };

  const correct = n3Words[Math.floor(Math.random() * n3Words.length)];
  let options = new Set([correct.chinese]);

  while (options.size < 4) {
    options.add(n3Words[Math.floor(Math.random() * n3Words.length)].chinese);
  }

  return { correct, options: shuffleArray(Array.from(options)) };
};

export default function N3Quiz() {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setQuestion(getRandomQuestion());
  }, []);

  const handleAnswer = (answer) => {
    if (!question) return;

    if (answer === question.correct.chinese) {
      setFeedback("✅ 正解！");
      setTimeout(() => {
        setFeedback("");
        setQuestion(getRandomQuestion());
      }, 1000);
    } else {
      setFeedback("❌ 不正解…");
    }
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">N3 単語クイズ</h1>
      <p className="quiz-question">{question.correct.japanese}</p>
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
