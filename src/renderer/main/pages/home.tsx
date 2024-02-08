import React, { useState } from 'react'
import { fetchSongInfo } from '../api/migu'

const Home: React.FC = () => {
  const [data, setData] = useState('')

  const fetchData = async () => {
    fetchSongInfo()
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data, null, 2)))
  }

  return (
    <div>
      <button className="btn" onClick={fetchData}>
        fetch
      </button>
      <pre>{data}</pre>
    </div>
  )
}

export default Home
