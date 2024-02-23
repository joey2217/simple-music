import React from 'react'
import { type LoaderFunction } from 'react-router-dom'

export const albumLoader: LoaderFunction = async ({ request, params }) => {
  return null
}

const Album: React.FC = () => {
  return <div>Album</div>
}

export default Album
