import React from 'react'
import {type LoaderFunction} from 'react-router-dom'

export const songLoader: LoaderFunction = async ({request, params}) => {
    return null
}

const Song: React.FC = () => {
    return (
        <div>Song</div>
    )
}

export default Song
