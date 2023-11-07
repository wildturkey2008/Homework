import React from 'react'
import "./SideBar.css"

const SideBar = ({ clickNewButton, memos, onMemoSelected }) => {
  return (
    <div className="side-container">
      <div className='sidebar-header'>
        <h1>Memo</h1>
        <button 
          id="newButton" 
          className="buttons"
          onClick={clickNewButton}
        >
          新規作成
        </button>
      </div>

      <div className='memos-area'>
        <ul className="memos">
          { memos.map(memo => (
            <li 
              key={memo.id}
              onClick={() => onMemoSelected(memo)}
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