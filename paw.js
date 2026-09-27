document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.className = "paw-container";
  document.body.appendChild(container);

  const startY = 120;
  const stepX = 26;
  const intervalTime = 420;

  // ⭐ 前回位置を復元
  let x = Number(sessionStorage.getItem("pawX")) || -40;
  let step = Number(sessionStorage.getItem("pawStep")) || 0;

  function createPaw() {
    const paw = document.createElement("div");
    paw.className = "paw";

    const offsetY = step % 2 === 0 ? 0 : 8;
    const rotate = step % 2 === 0 ? -15 : 15;

    paw.style.left = x + "px";
    paw.style.top = startY + offsetY + "px";
    paw.style.transform = `rotate(${rotate}deg)`;

    container.appendChild(paw);

    x += stepX;
    step++;

    // 保存（← ページ遷移対策）
    sessionStorage.setItem("pawX", x);
    sessionStorage.setItem("pawStep", step);

    setTimeout(() => paw.remove(), 2500);

    if (x > window.innerWidth + 50) {
      x = -40;
      step = 0;
      sessionStorage.setItem("pawX", x);
      sessionStorage.setItem("pawStep", step);
    }
  }

  // ⭐ 即1個表示
  createPaw();

  setInterval(createPaw, intervalTime);
});
