"use strict";

{
  const dts = document.querySelectorAll("dt");

  dts.forEach((dt) => {
    dt.addEventListener("click", () => {
      // dtの親要素にappearクラスがあったら削除
      dts.forEach((el) => el.parentNode.classList.remove("appear"));
      // クリックされたdtの親要素にappearクラスを追加
      dt.parentNode.classList.toggle("appear");
    });
  });
}
