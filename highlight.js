document.querySelectorAll('.ranking-table a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href').replace('#', '');
    const targetCard = document.getElementById(targetId);
    if (!targetCard) return;

    // ① すでに付いている強調をすべて消す
    document.querySelectorAll('.type-card')
      .forEach(card => card.classList.remove('is-active'));

    // ② 対象カードまでスクロール
    targetCard.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // ③ 少し待ってから強調（保持される）
    setTimeout(() => {
      targetCard.classList.add('is-active');
    }, 400);
  });
});
