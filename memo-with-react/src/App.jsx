
import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/ Main';
import SideBar from './components/SideBar';

function App() {
  const [memos, setMemos] = useState([]);
  const [currentMemo, setCurrentMemo] = useState({
    id: null, 
    title: '', 
    content: '', 
  });

  // メモが選択された状態か判定
  const isMemoSelected = currentMemo && currentMemo.id;

  // （関数）currentMemo初期化
  const clearMemo = () => {
    setCurrentMemo({ id: null, title: '', content: '' });
  };

  // 起動時localStorageからメモを読み込んで表示
  useEffect(() => {
    loadMemosFromStorage();
  },[]);

  //（関数）メモ読み込み
  const loadMemosFromStorage = () => {
    // localStorageからデータ読み込み
    const memoIDs = Object.keys(localStorage);
    const loadedMemos = memoIDs.map((id) => JSON.parse(localStorage.getItem(id)));

    // メモを降順にソートして表示
    sortMemos(loadedMemos);
  };

  // （関数）保存/上書きボタン
  const saveMemo = () => {
    const { id, title, content } = currentMemo;

    // メモ選択時には上書きを確認
    if (isMemoSelected){
      if (!window.confirm('メモを上書きしますか？')){ return; }
    }
    
    if (!title || !content) {
      alert('タイトルと内容を入力してください');
      return;
    }
    
    // メモが選択されていればidに値がある。なければDate関数で作成する。
    const memoId = id || Date.now().toString();

    // localStorageにメモを保存
    const newMemo = {...currentMemo, id: memoId};
    localStorage.setItem(memoId, JSON.stringify(newMemo));

    // memosの中身を更新
    const updatedMemos = id 
      ? memos.map((memo) => (memo.id === id ? newMemo : memo)) 
      : [...memos, newMemo];

    // メモを降順にソートして表示
    sortMemos(updatedMemos);

    clearMemo();  
  };

  // （関数）選択したメモ削除
  const deleteMemo = (id) => {

    if (!window.confirm('選択されたメモを削除しますか？')){ return };

    // 選択されたメモをlocalStorageから削除
    localStorage.removeItem(id);

    // memosを更新
    setMemos(memos.filter((memo) => memo.id !== id));

    clearMemo();
  };

  // （関数）メモ選択
  const onMemoSelected = (memo) => {
    setCurrentMemo(memo);
  };

  // （関数）メモを降順にソート
  const sortMemos = (memosToSort) => {
    const sortedMemos = [...memosToSort].sort((a,b) => parseInt(b.id) - parseInt(a.id));
    setMemos(sortedMemos)
  }

  return (
    <div className="App">
      <SideBar
        clearMemo={clearMemo}
        memos={memos}
        onMemoSelected={onMemoSelected}
        isMemoSelected={isMemoSelected}
        currentMemo={currentMemo}
      />
      
      <Main
        saveMemo={saveMemo}
        deleteMemo={deleteMemo}
        currentMemo={currentMemo}
        setCurrentMemo={setCurrentMemo}
        isMemoSelected={isMemoSelected}
      />
    </div>
  );
}

export default App;
