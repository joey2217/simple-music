import React from 'react'
import Banner from './Banner'
import PlayList from './PlayList'
import TopList from './TopList'

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <div className="page space-y-3">
        <PlayList />
        <TopList />
      </div>
    </>
  )
}

export default Home
