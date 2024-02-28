import React from 'react'
import icon from '../assets/icon.png'

const Image: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = (props) => {
  return (
    <img
      {...props}
      onError={(e) => {
        (e.target as HTMLImageElement).onerror = null
        ;(e.target as HTMLImageElement).src = icon
      }}
    />
  )
}

export default Image
