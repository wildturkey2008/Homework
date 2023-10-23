"use strict";
{
  // サムネイル画像要素の配列を取得
const thumbnails = document.querySelectorAll(".gallery-thumbnails .thumbnail img");

// gallery-mainクラス内のメイン画像要素を取得
const mainImage = document.querySelector(".gallery-main img");

// 各サムネイルにクリックイベントリスナを追加
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", function() {
        // クリックされたサムネイルの画像のsrc属性を取得
        const clickedImageSrc = this.getAttribute("src");

        // メイン画像のsrc属性を更新
        mainImage.setAttribute("src", clickedImageSrc);
    });
});













}

