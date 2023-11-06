
import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/ Main';
import SideBar from './components/SideBar';

function App() {
  const [memos, setMemos] = useState([]);
  const [currentMemo, setCurrentMemo] = useState({id: null, title: '', content: ''});

  useEffect(() => {
    const loadMemos = JSON.parse(localStorage.getItem('memos')) || [];
    setMemos(loadMemos);
  },[]);


  const newButtonClicked = () => {
    setCurrentMemo({id: null, title: '', content: ''});
  };

  const saveMemo= () => {    
    const { id, title, content} = currentMemo;
    
    if (!title || !content) {
      alert('タイトルと内容を入力してください');
      return;
    }
    
    // 入力されたメモを取得
    const newMemo = {
      ...currentMemo,
      id: id || Date.now().toString(),
    };
    
    // console.log(newMemo);

    localStorage.setItem(newMemo.id, JSON.stringify(newMemo));

    // const updatedMemos = id ? memos.map(memo => memo.id === id ? newMemo : memo) : [...memos, newMemo];
    // setMemos(updatedMemos.sort((a, b) => parseInt(b.id) - parseInt(a.id)));
    // setCurrentMemo({id: null, title: '', content: ''});

    const updatedMemos = id ? memos.map(memo => memo.id === id ? newMemo : memo) : [...memos, newMemo];
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
    setMemos(updatedMemos);
    setCurrentMemo({id: null, title: '', content: ''});
    
  };

  const deleteMemo = (id) => {
    if (id) {
      console.log(id);
      localStorage.removeItem(id);
      setMemos(memos.filter(memo => memo.id !== id));
      setCurrentMemo({id: null, title: '', content: ''});
    };
  }

  const onMemoSelected = memo => {
    setCurrentMemo(memo);
  };

  return (
    <div className="App">
      <SideBar 
        newButtonClicked={newButtonClicked}
        memos={memos} 
        onMemoSelected={onMemoSelected} 
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
