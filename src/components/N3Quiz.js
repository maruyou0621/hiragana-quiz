import React, { useState } from "react";
import n3Words from "../data/n3_words";
import n3Grammar from "../data/n3_grammar"; // 文法問題のデータ

// 単語問題をランダムに取得
const getRandomWordQuestion = () => {
  const word = n3Words[Math.floor(Math.random() * n3Words.length)];
  const correctAnswer = word.kanji;

  let options = new Set([correctAnswer]);
  while (options.size < 4) {
    const randomWord = n3Words[Math.floor(Math.random() * n3Words.length)];
    options.add(randomWord.kanji);
  }

  return {
    type: "単語",
    questionText: "この画像は何？",
    correctAnswer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
    image: word.image,
  };
};

// 文法問題をランダムに取得
const getRandomGrammarQuestion = () => {
  const question = n3Grammar[Math.floor(Math.random() * n3Grammar.length)];

  return {
    type: "文法",
    questionText: question.question,
    correctAnswer: question.correct,
    options: question.options,
    image: null,
  };
};

// クイズのタイプをランダムで選択
const getRandomQuestion = () => {
  const isWordQuestion = Math.random() < 0.5;
  return isWordQuestion ? getRandomWordQuestion() : getRandomGrammarQuestion();
};

export default function N3Quiz() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (answer) => {
    if (answer === question.correctAnswer) {
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
      <h1 className="quiz-title">N3 総合クイズ</h1>

      {question.image && (
        <img
          src={question.image}
          alt={question.correctAnswer}
          className="quiz-image"
          style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "10px" }}
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

      <p className="quiz-feedback">{feedback}</p>
    </div>
  );
}
