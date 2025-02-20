import React, { useState } from "react";
import { kanaList } from "../data/kanaList"; // データを外部ファイルから取得
import AdBannerIncorrect from "./AdBannerIncorrect"; // 不正解時の広告

// ローマ字をひらがなに変換する関数
const romajiToHiragana = (romaji) => {
  const romajiToHiraganaMap = {
    "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",
    "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
    "sa": "さ", "shi": "し", "su": "す", "se": "せ", "so": "そ",
    "ta": "た", "chi": "ち", "tsu": "つ", "te": "て", "to": "と",
    "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
    "ha": "は", "hi": "ひ", "fu": "ふ", "he": "へ", "ho": "ほ",
    "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
    "ya": "や", "yu": "ゆ", "yo": "よ",
    "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
    "wa": "わ", "wo": "を", "n": "ん"
  };

  return romaji.split(/(?=[A-Z])/).map((syllable) => romajiToHiraganaMap[syllable.toLowerCase()] || syllable).join('');
};

// 音声を再生する関数
const speakText = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ja-JP";  // 日本語の音声で発音
  window.speechSynthesis.speak(msg);  // テキストを音声に変換
};

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
  const [showAd, setShowAd] = useState(false);

  const handleAnswer = (answer) => {
    const hiraganaAnswer = romajiToHiragana(answer); // ローマ字をひらがなに変換して音声で読み上げ
    speakText(hiraganaAnswer);  // クリックした選択肢を音声で読み上げ

    if (answer === question.correct.romaji) {
      setFeedback("✅ 正解！");
      setShowAd(false);
      setTimeout(() => {
        setFeedback("");
        setQuestion(getRandomQuestion());
      }, 1000);
    } else {
      setFeedback("❌ 不正解…");
      setShowAd(true);

      // 🔥 ポップアップウィンドウで広告を開く
      window.open("https://px.a8.net/svt/ejp?a8mat=44Z2FF+E22GZ6+348+6C1VL", "広告サイト", "width=600,height=400");
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

      {/* 🔥 不正解時にA8.net広告を表示 */}
      {showAd && <AdBannerIncorrect />}
    </div>
  );
}
