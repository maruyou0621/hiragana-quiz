import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import n3Words from "../data/n3_words"; // 画像問題のデータ

// 画像問題をランダムに取得
const getRandomImageQuestion = () => {
  const word = n3Words[Math.floor(Math.random() * n3Words.length)];
  const correctAnswer = word.kanji;

  let options = new Set([correctAnswer]);
  while (options.size < 4) {
    const randomWord = n3Words[Math.floor(Math.random() * n3Words.length)];
    options.add(randomWord.kanji);
  }

  return {
    questionText: "この画像は何？",
    correctAnswer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
    image: word.image,
  };
};

export default function ImageQuiz() {
  const [question, setQuestion] = useState(getRandomImageQuestion());
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    if (answer === question.correctAnswer) {
      setFeedback("✅ 正解！");
      setTimeout(() => {
        setFeedback("");
        setQuestion(getRandomImageQuestion());
      }, 1000);
    } else {
      setFeedback("❌ 不正解…");
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">画像クイズ</h1>

      {question.image && (
        <img
          src={question.image}
          alt={question.correctAnswer}
          className="quiz-image"
          style={{
            width: "100%",
            maxWidth: "200px",
            height: "auto",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            borderRadius: "5px",
            display: "block",
            margin: "0 auto",
          }}
        />
      )}

      <p className="quiz-question">{question.questionText}</p>

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

      {/* 正解・不正解のフィードバック */}
      <p className="quiz-feedback">{feedback}</p>
    </div>
  );
}
