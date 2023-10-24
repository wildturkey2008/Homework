'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progressBar");
  const modal = document.getElementById("modal");
  const mask = document.getElementById("mask");
  const startButton = document.getElementById("startButton");
  const progressContainer = document.getElementById("progressContainer");

  startButton.addEventListener("click", () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');

    // プログレスバーのコンテナを表示
    progressContainer.style.display = "block";

    // クリックイベントを無効化
    modal.style.pointerEvents = "none";
    mask.style.pointerEvents = "none";
    startButton.style.pointerEvents = "none";

    // プログレスバーの進行をシミュレート
    let width = 0;
    const progress = document.getElementById('progress');
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        // クリックイベントを有効化
        modal.style.pointerEvents = "auto";
        mask.style.pointerEvents = "auto";
        startButton.style.pointerEvents = "auto";
      } else {
        width++;
        progressBar.style.width = width + "%";
        progress.textContent = `ダウンロード中 ${width}%`;        
      }
    }, 50); // 50ミリ秒ごとに更新
  });

  modal.addEventListener("click", () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener("click", () => {
    modal.click();
  });

});
