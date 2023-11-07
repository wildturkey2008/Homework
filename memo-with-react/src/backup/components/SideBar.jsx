import React from 'react'
import "./SideBar.css"

const SideBar = ({ newButtonClicked, memos, onMemoSelected, currentMemo }) => {
  return (
    <div className="side-container">
      <div className='sidebar-header'>
        <h1>Memo</h1>
        <button id="newButton" className="buttons" onClick={newButtonClicked} >新規作成</button>
      </div>

      <div className='memos-area'>
        <ul className="memos">
          { memos.map(memo => ( 
            <li key={memo.id} 
                onClick={() => onMemoSelected(memo)}
                className={currentMemo && currentMemo.id === memo.id ? 'selected' : ''}
            >
              {memo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar