document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("bgm-player");
  const bgmSrc = player.dataset.bgm;

  const audio = new Audio(bgmSrc);
  audio.loop = true;
  audio.volume = 0.5;

  const openBtn = document.getElementById("bgm-open");
  const panel = document.getElementById("bgm-panel");

  const playBtn = document.getElementById("bgm-play");
  const playIcon = playBtn.querySelector("i");
  const playText = playBtn.querySelector("span");

  const seekBar = document.getElementById("seek-bar");
  const volumeBar = document.getElementById("volume-bar");

  let isPlaying = false;

  /* ===== 自動再生（操作済みなら成功） ===== */
  audio.play().then(() => {
    isPlaying = true;
    playIcon.className = "fa-solid fa-pause";
    playText.textContent = "再生中";
  }).catch(() => {
    // 初回TOPでは失敗する（仕様）
  });

  /* ===== ♪クリック時 ===== */
  openBtn.addEventListener("click", () => {
    panel.style.display =
      panel.style.display === "block" ? "none" : "block";

    // 🔑 初回クリックで再生を保証
    if (!isPlaying) {
      audio.play();
      isPlaying = true;
      playIcon.className = "fa-solid fa-pause";
      playText.textContent = "再生中";
    }
  });

  /* ===== 再生 / 停止 ===== */
  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playIcon.className = "fa-solid fa-play";
      playText.textContent = "停止中";
      isPlaying = false;
    } else {
      audio.play();
      playIcon.className = "fa-solid fa-pause";
      playText.textContent = "再生中";
      isPlaying = true;
    }
  });

  /* ===== 再生位置 ===== */
  audio.addEventListener("timeupdate", () => {
    seekBar.max = audio.duration || 0;
    seekBar.value = audio.currentTime;
  });

  seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
  });

  /* ===== 音量 ===== */
  volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
  });
});
