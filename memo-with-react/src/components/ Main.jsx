import React from 'react'
import "./Main.css"

const  Main = ({ currentMemo, setCurrentMemo, saveMemo, deleteMemo }) => {
  // メモが選択されているかどうかを判定
  const isMemoSelected = currentMemo && currentMemo.id;

  const handleSave = () => {
    if (isMemoSelected){
      // 編集の確認
      if (window.confirm("このメモを上書きしますか？")) {
        saveMemo();
      }
    } else {
      saveMemo();      
    }
  };

  const handleDelete = () => {
    // 削除の確認
    if (window.confirm("このメモを削除しますか？")) {
      deleteMemo(currentMemo.id);
    }
  };

  return (
    <div className="main-container">

    <h2>{isMemoSelected ? '編集' : '新規作成'}</h2>

    <div className="title">Title</div>
    <input  
      id="title"   
      type="text" 
      placeholder="タイトルを入力" 
      value={currentMemo.title}
      onChange={(e) => setCurrentMemo({...currentMemo, title: e.target.value})}
    />
    <div className="title">Content</div>
    <textarea
      name="content"
      id="content"
      placeholder="本文を入力"
      value={currentMemo.content}
      onChange={(e) => setCurrentMemo({...currentMemo, content: e.target.value})}
    ></textarea>
    <div className="buttonContainer">
      <button onClick={handleSave} className="buttons">{isMemoSelected ? '上書き' : '保存'}</button>
      {isMemoSelected && (
        <button onClick={handleDelete} className="buttons">削除</button>
      )}
    </div>
  </div>
  )
}

export default  Main