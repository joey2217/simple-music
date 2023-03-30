import React, { memo } from 'react'

const TitleBar: React.FC = () => {
  return (
    <div id="titleBarContainer">
      <div id="titleBar" className="draggable">
        <span className="draggable">Example PWA</span>
      </div>
    </div>
  )
}

export default memo(TitleBar)
