import { useState } from 'react'

function App() {
  return (
    <div className="App">
      <div>chrome:{window.versions.chrome}</div>
      <div>node:{window.versions.node}</div>
      <div>electron:{window.versions.electron}</div>
    </div>
  )
}

export default App
