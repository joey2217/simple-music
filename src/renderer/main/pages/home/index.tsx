import React from 'react'
import Banner from './Banner'
import PlayList from './PlayList'
import { Button } from '@/components/ui/button'

const Home: React.FC = () => {
  return (
    <div>
      <Button>Button</Button>
      <Banner />
      <PlayList />
    </div>
  )
}

export default Home
