import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import n3Grammar from "../data/n3_grammar";
import n3Sentences from "../data/n3_sentences";

// 配列をシャッフルする関数
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// 文法問題をランダムに取得（前回と重複しない）
const getRandomGrammarQuestion = (previousQuestion) => {
  let question;
  do {
    question = n3Grammar[Math.floor(Math.random() * n3Grammar.length)];
  } while (previousQuestion && previousQuestion.questionText === question.question);

  return {
    type: "文法",
    questionText: question.question,
    correctAnswer: question.correct,
    options: shuffleArray([...question.options]),
    image: null,
  };
};

// 文章問題をランダムに取得（前回と重複しない）
const getRandomSentenceQuestion = (previousQuestion) => {
  let question;
  do {
    question = n3Sentences[Math.floor(Math.random() * n3Sentences.length)];
  } while (previousQuestion && previousQuestion.questionText === question.question);

  return {
    type: "文章",
    questionText: question.question,
    correctAnswer: question.correct,
    options: shuffleArray([...question.options]),
    image: null,
  };
};

// クイズのタイプをランダムで選択（単語問題を削除）
const getRandomQuestion = (previousQuestion) => {
  return Math.random() < 0.5
    ? getRandomGrammarQuestion(previousQuestion)
    : getRandomSentenceQuestion(previousQuestion);
};

export default function N3Quiz() {
  const [question, setQuestion] = useState(getRandomQuestion(null));
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    if (answer === question.correctAnswer) {
      setFeedback("✅ 正解！");
      setTimeout(() => {
        setFeedback("");
        setQuestion(getRandomQuestion(question));
      }, 1000);
    } else {
      setFeedback("❌ 不正解…");
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">N3 総合クイズ</h1>
      <p className="quiz-question">{question.questionText}</p>
      <div className="quiz-options">
        {question.options.map((option) => (
          <button key={option} className="quiz-button" onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className="quiz-switch-buttons">
        <button className="quiz-switch-button" onClick={() => navigate("/quiz/hiragana")}>ひらがなクイズへ</button>
        <button className="quiz-switch-button" onClick={() => navigate("/")}>トップページへ</button>
      </div>
      <p className="quiz-feedback">{feedback}</p>
    </div>
  );
}
