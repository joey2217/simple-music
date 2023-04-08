import React, { memo } from 'react'

const TitleBar: React.FC = () => {
  return (
    <div id="titleBarContainer">
      <div id="titleBar" className="draggable">
        <span className="draggable">Simple Music</span>
      </div>
    </div>
  )
}

export default memo(TitleBar)
