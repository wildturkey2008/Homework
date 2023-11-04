document.addEventListener("DOMContentLoaded", () => {
  const newButton = document.getElementById("newButton");
  const saveButton = document.getElementById("saveButton");
  const deleteButton = document.getElementById("deleteButton");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const memoList = document.querySelector(".memos");
  const h2value = document.querySelector("h2");

  let currentSelectedMemoId = null; //メモが選択された状態かどうかのフラグ

  // （関数）メモをlocalstorageから読み込んで表示
  const loadMemos = () => {
    memoList.innerHTML = "";

    const keys = Object.keys(localStorage);

    // IDの降順にソート（新しいものからリストの上に来るように）
    const sortedKeys = keys.map(Number).sort((a, b) => b - a);

    sortedKeys.forEach((key) => {
      const memoData = JSON.parse(localStorage.getItem(key));
      const li = document.createElement("li");
      li.textContent = memoData.title;
      li.dataset.id = key;
      memoList.appendChild(li);

      // 既存のメモをクリックしたときのイベントリスナー
      li.addEventListener("click", handleMemoClick);
    });
  };

  // (関数)メモを保存
  const saveMemo = () => {
    const title = titleInput.value;
    const content = contentInput.value;
    // memoオブジェクト生成
    const memo = { title, content };

    // currentSelectedMemoIDがnullなら新規作成、nullでなければ編集
    if (currentSelectedMemoId === null) {
      if (title && content) {
        // タイムスタンプからuidを生成
        const id = Date.now().toString();

        // localstorageへ保存
        localStorage.setItem(id, JSON.stringify(memo));

        // 入力フィールをクリアする
        titleInput.value = "";
        contentInput.value = "";
      } else {
        alert("タイトルの内容を入力して下さい");
      }
    } else {
      // localstorageへ保存
      if (confirm("データを上書きしますか？")) {
        localStorage.setItem(currentSelectedMemoId, JSON.stringify(memo));
      }
    }

    // 画面に反映
    loadMemos();
  };

  // （関数）新規作成ボタンで初期化
  const clearContents = () => {
    currentSelectedMemoId = null;
    saveButton.textContent = "保存";
    h2value.textContent = "新規作成";
    // 入力フィールをクリアする
    titleInput.value = "";
    contentInput.value = "";
    showDeleteButton();
  };

  // （関数）既存のメモがクリックされた時の処理
  const handleMemoClick = (event) => {
    const li = event.target;
    currentSelectedMemoId = li.dataset.id;
    const selectedData = JSON.parse(
      localStorage.getItem(currentSelectedMemoId)
    );
    titleInput.value = selectedData.title;
    contentInput.value = selectedData.content;
    saveButton.textContent = "上書き";
    h2value.textContent = "編集";
    showDeleteButton();
  };

  // （関数）メモの削除
  const deleteMemo = () => {
    if (confirm("メモを削除しますか？")) {
      // 削除対象のli要素を取得
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

  // （関数）削除ボタンの表示切り替え
  const showDeleteButton = () => {
    if (currentSelectedMemoId === null) {
      deleteButton.style.display = "none";
    } else {
      deleteButton.style.display = "block";
    }
  };

  // （メイン処理）
  newButton.addEventListener("click", clearContents);
  saveButton.addEventListener("click", saveMemo);
  deleteButton.addEventListener("click", deleteMemo);

  // メモの読み込み
  loadMemos();

  // 削除ボタンの表示/非表示切り替え
  showDeleteButton();
});
