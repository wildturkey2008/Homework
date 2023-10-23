document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const progressBar = document.getElementById("progressBar");
  const progressContainer = document.getElementById("progressContainer");

  startButton.addEventListener("click", () => {
    // プログレスバーのコンテナを表示
    progressContainer.style.display = "block";

    // プログレスバーの進行をシミュレート
    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
      } else {
        width++;
        progressBar.style.width = width + "%";
      }
    }, 50); // 50ミリ秒ごとに更新
  });
});
