import React, { useState } from "react";
import n3Words from "../data/n3_words";  // ✅ 実際のファイル名に合わせる！

const getRandomQuestion = () => {
  const word = n3Words[Math.floor(Math.random() * n3Words.length)];
  
  // 問題を漢字・ひらがな・カタカナのどれかで出題
  const questionType = Math.floor(Math.random() * 3);
  let questionText = word.kanji; // デフォルトは漢字
  if (questionType === 1) questionText = word.hiragana;
  if (questionType === 2) questionText = word.katakana;

  // 正解の中国語を取得
  const correctAnswer = word.chinese;

  // ランダムに3つの別の単語の中国語を選択肢に加える
  let options = new Set([correctAnswer]);
  while (options.size < 4) {
    const randomWord = n3Words[Math.floor(Math.random() * n3Words.length)];
    options.add(randomWord.chinese);
  }

  return { questionText, correctAnswer, options: Array.from(options).sort(() => Math.random() - 0.5) };
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
      <h1 className="quiz-title">N3 単語クイズ</h1>
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
