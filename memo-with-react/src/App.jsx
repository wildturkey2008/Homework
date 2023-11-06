
import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/ Main';
import SideBar from './components/SideBar';

function App() {
  const [memos, setMemos] = useState([]);
  const [currentMemo, setCurrentMemo] = useState({
    id: null,
    title: "",
    content: "",
  });

  useEffect(() => {
    loadMemosFromStorage();
  }, []);
  
  const loadMemosFromStorage = () => {
    // LocalStorageから全てのメモIDをロードする
    const memoIDs = Object.keys(localStorage);
    // 各IDを使用してLocalStorageからメモをロードする
    const loadMemos = memoIDs.map((id) => JSON.parse(localStorage.getItem(id)) || []).sort((a, b) => b.id - a.id);
    setMemos(loadMemos);
  };

  const newButtonClicked = () => {
    setCurrentMemo({ id: null, title: "", content: "" });
  };

  const saveMemo = () => {
    const { id, title, content } = currentMemo;

    if (!title || !content) {
      alert("タイトルと内容を入力してください");
      return;
    }

    // 新しいIDを生成するか、既存のIDを使用する
    const memoID = id || Date.now().toString();
    const newMemo = {
      ...currentMemo,
      id: memoID,
    };

    // メモをLocalStorageに保存する
    localStorage.setItem(memoID, JSON.stringify(newMemo));

    // メモのリストを更新する
    const updatedMemos = id
      ? memos.map((memo) => (memo.id === id ? newMemo : memo))
      : [...memos, newMemo];

    setMemos(updatedMemos);
    // setCurrentMemo(newMemo);
    setCurrentMemo({ id: null, title: "", content: "" });

    // メモが更新された後、ロードロジックを呼び出してリストを更新する
    loadMemosFromStorage();

    
  };

  const deleteMemo = (id) => {
    if (id) {
      // LocalStorageからメモを削除する
      localStorage.removeItem(id);
      // メモリストからメモを削除する
      setMemos(memos.filter((memo) => memo.id !== id));
      setCurrentMemo({ id: null, title: "", content: "" });
      
      // メモが更新された後、ロードロジックを呼び出してリストを更新する
      loadMemosFromStorage();
    }
  };

  const onMemoSelected = (memo) => {
    setCurrentMemo(memo);
  };

  return (
    <div className="App">
      <SideBar
        newButtonClicked={newButtonClicked}
        memos={memos}
        onMemoSelected={onMemoSelected}
        currentMemo={currentMemo}
      />
      <Main
        newButtonClicked={newButtonClicked}
        currentMemo={currentMemo}
        setCurrentMemo={setCurrentMemo}
        saveMemo={saveMemo}
        deleteMemo={deleteMemo}
      />
    </div>
  );
}

export default App;
