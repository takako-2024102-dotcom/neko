/* =========================
   クイズデータ
========================= */


const seCorrect = document.getElementById("se-correct");
const seWrong = document.getElementById("se-wrong");

// 音量調整（おすすめ）
seCorrect.volume = 0.4;
seWrong.volume = 0.4;



const quizData = [
  {
    question: "猫がゴロゴロ音を出すとき、実際に確認されている効果として最も近いものは？",
    choices: ["威嚇効果", "骨や筋肉の回復促進", "体温調整"],
    answer: 1,
    explanation:
      "正解はB！\n" +
      "猫のゴロゴロ音は20〜50Hzの低周波です。\n" +
      "この周波数は骨密度の維持や筋肉回復を\n" +
      "助ける可能性が研究で示唆されています。\n" +
      "人にもリラックス効果があります。"
  },
  {
    question: "猫が高い場所を好む主な理由として正しいものは？",
    choices: ["獲物を狙うため", "安全を確保するため", "体を鍛えるため"],
    answer: 1,
    explanation:
      "正解はB！\n" +
      "高い場所は周囲を見渡せます。\n" +
      "危険を早く察知できるため、\n" +
      "猫は本能的に安心できる場所を\n" +
      "好んで選びます。"
  },
  {
    question: "猫がしっぽを小刻みに震わせる行動は何を表す？",
    choices: ["強い怒り", "興奮と期待", "恐怖"],
    answer: 1,
    explanation:
      "正解はB！\n" +
      "この行動は嬉しさや期待の表れです。\n" +
      "飼い主を見つけたときなどに\n" +
      "よく見られます。\n" +
      "怒っているわけではありません。"
  },
  {
    question: "猫が段ボール箱を好む理由として正しいものは？",
    choices: ["暗いから", "体温を保てるから", "安心できるから"],
    answer: 2,
    explanation:
      "正解はC！\n" +
      "箱は外敵から身を守れます。\n" +
      "視界が制限されることで\n" +
      "安心感が高まります。\n" +
      "ストレス軽減にもなります。"
  },
  {
    question: "猫のヒゲの正式な役割は？",
    choices: ["感情表現", "空間認識センサー", "バランス調整"],
    answer: 1,
    explanation:
      "正解はB！\n" +
      "ヒゲは非常に敏感な感覚器官です。\n" +
      "狭い場所を通れるか判断します。\n" +
      "夜間の行動にも役立ちます。\n" +
      "切ってはいけません。"
  },
  {
    question: "猫が人の顔をなめる行動の意味は？",
    choices: ["支配行動", "毛づくろいの代わり", "遊びの合図"],
    answer: 1,
    explanation:
      "正解はB！\n" +
      "仲間に行う毛づくろいの代わりです。\n" +
      "信頼関係ができている証拠です。\n" +
      "猫なりの愛情表現です。\n"
  },
  {
    question: "猫が寝ている時間が長い理由として正しいものは？",
    choices: ["退屈だから", "エネルギー温存", "習慣"],
    answer: 1,
    explanation:
      "正解はB！\n" +
      "狩りに備えて体力を温存します。\n" +
      "野生時代の名残です。\n" +
      "成長や回復にも睡眠は重要です。\n"
  }
];
let current = 0;
let score = 0;

// 要素取得
const qNum = document.getElementById("question-number");
const qText = document.getElementById("question-text");
const choicesBox = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const judgeOverlay = document.getElementById("judge-overlay");
const judgeContent = document.getElementById("judge-content");
const judgeMark = document.getElementById("judge-mark");
const judgeText = document.getElementById("judge-text");
const explainBtn = document.getElementById("explain-btn");
const explanationOverlay = document.getElementById("explanation-overlay");
const explanationText = document.getElementById("explanation-text");
const closeExplainBtn = document.getElementById("close-explain-btn");

// クイズ表示
function loadQuiz() {
  const q = quizData[current];
  qNum.textContent = `第${current + 1}問`;
  qText.textContent = q.question;
  choicesBox.innerHTML = "";
  
  // 選択肢は濃く押せる状態に戻す
  choicesBox.classList.remove("choices-disabled");

  // 次の問題ボタンは薄く
  nextBtn.disabled = true;
  nextBtn.classList.remove("highlight", "result");
  nextBtn.textContent = current === quizData.length - 1 ? "結果発表へ" : "次の問題へ";

  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(65 + i) + ". " + c;
    btn.className = "choice-btn";
    btn.onclick = () => checkAnswer(i);
    choicesBox.appendChild(btn);
  });
}

// 正誤判定
function checkAnswer(i) {
  const q = quizData[current];
  choicesBox.classList.add("choices-disabled");

  const isCorrect = i === q.answer;
  if (isCorrect) score++;

  // ★ 効果音を追加（ここだけ）
  if (isCorrect) {
    seCorrect.currentTime = 0;
    seCorrect.play();
  } else {
    seWrong.currentTime = 0;
    seWrong.play();
  }

  judgeContent.className = isCorrect ? "correct" : "wrong";
  judgeMark.textContent = isCorrect ? "○" : "×";
  judgeText.textContent = isCorrect ? "正解！" : "不正解！";
  judgeOverlay.classList.add("show");

  explainBtn.onclick = () => {
    judgeOverlay.classList.remove("show");
    explanationText.textContent = q.explanation;
    explanationOverlay.classList.add("show");
  };
}

// 解説を閉じる
closeExplainBtn.onclick = () => {
  explanationOverlay.classList.remove("show");

  // 選択肢は薄め押せない状態
  choicesBox.classList.add("choices-disabled");

  // 次の問題ボタンを強調
  nextBtn.disabled = false;
  nextBtn.classList.add("highlight");

  // 最終問題なら結果ボタン用クラスに
  if (current === quizData.length - 1) {
    nextBtn.classList.add("result");
    nextBtn.classList.remove("highlight");
  }
};

// 次の問題へボタン
nextBtn.onclick = () => {
  nextBtn.classList.remove("highlight", "result");
  current++;
  if (current < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
};

// 結果表示
function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  const overlay = document.getElementById("result-overlay");
  overlay.classList.add("show");

  document.getElementById("result-text").textContent = `${quizData.length}問中 ${score}問正解！`;

  const img = document.getElementById("result-image");
  const title = document.getElementById("result-title");

  if (score === 7) {
    title.textContent = "猫マスター";
    img.src = "images/quiz_cat_happy.gif";
  } else if (score >= 6) {
    title.textContent = "猫博士";
    img.src = "images/quiz_cat_happy.gif";
  } else if (score >= 5) {
    title.textContent = "猫上級者";
    img.src = "images/quiz_cat_normal.gif";
  } else if (score >= 3) {
    title.textContent = "猫見習い";
    img.src = "images/quiz_cat_normal.gif";
  } else {
    title.textContent = "ねこ初心者";
    img.src = "images/quiz_cat_sad.gif";
  }
};

document.getElementById("retry-btn").onclick = () => location.reload();

loadQuiz();
