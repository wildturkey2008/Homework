"use strict";

{
  // リロードした時にparagraphを同じ位置に表示する
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  document.addEventListener("DOMContentLoaded", function () {
    const toast = document.getElementById("toast");
    const closeToastBtn = document.getElementById("close-toast");
    let timeoutId;
    let isTimeoutActive = false; // setTimeoutの動作状態を示すフラグ
    let isToastVisible = false; // トーストの表示状態を追跡するフラグ
    let hasToastBeenShown = false; // トーストが表示されたかを追跡するフラグ
    let lastScrollTop = window.scrollY; // 最後のスクロール位置を保持する変数
    // 最下部から上にスクロールした時に再発火するのを防止

    // トーストを閉じる関数
    const closeToast = () => {
      toast.classList.remove("show");
      isToastVisible = false;
      // xボタンで閉じた時にはタイマーを破棄する
      if (isTimeoutActive) {
        clearTimeout(timeoutId);
        isTimeoutActive = false;
      }
    };

    window.addEventListener("scroll", function () {
      // ここで値をコンソールに出力
      // console.log("window.innerHeight:", window.innerHeight);
      // console.log("window.scrollY:", window.scrollY);
      // console.log("addition:", window.innerHeight + window.scrollY);
      // console.log("document.body.offsetHeight:", document.body.offsetHeight);

      let currentScrollTop = window.scrollY;

      // 下方向にスクロールしていることを確認
      if (currentScrollTop > lastScrollTop) {
        // スクロールが一番下に達したかどうかを確認
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
          if (!isToastVisible && !hasToastBeenShown) {
            // トーストを表示
            toast.classList.add("show");
            isToastVisible = true;
            hasToastBeenShown = true;
            // 3秒後にトーストを自動で閉じる
            timeoutId = setTimeout(closeToast, 3000);
            // alert(timeoutId);
            isTimeoutActive = true;
          } else {
            hasToastBeenShown = false;
          }
      } else {
        // 上にスクロールした場合は、トーストが再度表示されるようにフラグをリセット
        hasToastBeenShown = false;
      }
      // 現在のスクロール位置を更新
      lastScrollTop = currentScrollTop;
    });

    // バツボタンでトーストを閉じる
    closeToastBtn.addEventListener("click", closeToast);
  });
}
