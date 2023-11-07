import React from 'react'
import "./Main.css"

const  Main = ({ saveMemo, currentMemo, setCurrentMemo, deleteMemo }) => {


  return (
    <div className="main-container">

    <h2>新規作成</h2>

    <div className="title">Title</div>
    <input  
      id="title"   
      type="text" 
      placeholder="タイトルを入力" 
      value={currentMemo.title}
      onChange={(e) => setCurrentMemo({...currentMemo, title: e.target.value}) }
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
      <button className="buttons" onClick={saveMemo}>保存</button>
        <button className="buttons" onClick={() => deleteMemo(currentMemo.id)}>削除</button>

    </div>
  </div>
  )
}

export default  Main