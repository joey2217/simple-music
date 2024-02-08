import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar: React.FC = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('周杰伦')

  const onSearch = () => {
    console.log(keyword)
    if (keyword !== '') {
      navigate(`/search?keyword=${keyword}`)
    //   setKeyword('')
    }
  }

  return (
    <div className="join">
      <input
        className="join-item input input-sm input-bordered"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="join-item btn btn-sm" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchBar
