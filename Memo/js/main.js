document.addEventListener("DOMContentLoaded", () => {
  const newButton = document.getElementById("newButton");
  const saveButton = document.getElementById("saveButton");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const memoList = document.querySelector(".memos");
  let currentSelectedMemoId = null;

  // （関数）メモをlocalstorageから読み込んで表示
  const loadMemos = () => {
    memoList.innerHTML = "";

    const keys = Object.keys(localStorage);

    // console.log(keys);

    // IDの降順にソート（新しいものからリストの上に来るように）
    const sortedKeys = keys.map(Number).sort((a, b) => b - a);

    sortedKeys.forEach((key) => {
      const memoData = JSON.parse(localStorage.getItem(key));
      const li = document.createElement("li");
      li.textContent = memoData.title;
      li.dataset.id = key;

      li.addEventListener("click", () => {
        currentSelectedMemoId = li.dataset.id;
        const selectedData = JSON.parse(
          localStorage.getItem(currentSelectedMemoId)
        );
        titleInput.value = selectedData.title;
        contentInput.value = selectedData.content;
      });

      memoList.appendChild(li);
      return currentSelectedMemoId;
    });
  };

  
  // (関数)メモを保存
  const saveMemo = () => {
    const title = titleInput.value;
    const content = contentInput.value;

    if (title && content) {
      // タイムスタンプからuidを生成
      const id = Date.now().toString();

      // memoオブジェウト生成
      const memo = { title, content };

      // console.log(`idは${id},コンテンツは${memo}`);
      console.log(memo);

      // localstorageへ保存
      localStorage.setItem(id, JSON.stringify(memo));

      // 入力フィールをクリアする
      titleInput.value = "";
      contentInput.value = "";

      // 画面に反映
      loadMemos();
    } else {
      alert("タイトルの内容を入力して下さい");
    }
  };


  // （関数）新規作成ボタンで初期化
  const clearContents = () => {
    // 入力フィールをクリアする
    titleInput.value = "";
    contentInput.value = "";
  };


  // （関数）メモの削除
  const deleteMemo = () => {
    if (currentSelectedMemoId != null) {
      // console.log(currentSelectedMemoId);

      const selectedLi = document.querySelector(
        `[data-id="${currentSelectedMemoId}"]`
        );

      // li要素をDOMから削除
      selectedLi.remove();

      // localStorageから該当するメモを削除
      localStorage.removeItem(currentSelectedMemoId);
      // メモリストを更新
      loadMemos();
      clearContents();
    }
  };

  // （メイン処理）

  newButton.addEventListener("click", clearContents);
  saveButton.addEventListener("click", saveMemo);
  deleteButton.addEventListener("click", deleteMemo);

  // メモの読み込み
  loadMemos();
});
