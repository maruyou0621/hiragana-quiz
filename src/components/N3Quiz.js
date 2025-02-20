import React, { useState } from "react";
import n3Words from "../data/n3_words";
import n3Grammar from "../data/n3_grammar"; // 文法問題のデータ
import AdBannerIncorrect from "./AdBannerIncorrect"; // 不正解時の広告

// 単語問題をランダムに取得
const getRandomWordQuestion = () => {
  const word = n3Words[Math.floor(Math.random() * n3Words.length)];
  const correctAnswer = word.kanji;  // 正解を漢字に変更

  let options = new Set([correctAnswer]);
  while (options.size < 4) {
    const randomWord = n3Words[Math.floor(Math.random() * n3Words.length)];
    options.add(randomWord.kanji);  // 選択肢も漢字に
  }

  return {
    type: "単語",
    questionText: "この画像は何？",
    correctAnswer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
    image: word.image
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
    image: null
  };
};

// クイズのタイプをランダムで選択
const getRandomQuestion = () => {
  const isWordQuestion = Math.random() < 0.5;  // 50% の確率で単語問題、50% で文法問題
  return isWordQuestion ? getRandomWordQuestion() : getRandomGrammarQuestion();
};

export default function N3Quiz() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [feedback, setFeedback] = useState("");
  const [showAd, setShowAd] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === question.correctAnswer) {
      setFeedback("✅ 正解！");
      setShowAd(false);
      setTimeout(() => {
        setFeedback("");
        setQuestion(getRandomQuestion());  // 次の問題に切り替え
      }, 1000);
    } else {
      setFeedback("❌ 不正解…");
      setShowAd(true);
      window.open("https://px.a8.net/svt/ejp?a8mat=44Z2FF+E22GZ6+348+6C1VL", "広告サイト", "width=600,height=400");
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

      {showAd && <AdBannerIncorrect />}
      <p className="quiz-feedback">{feedback}</p>
    </div>
  );
}
