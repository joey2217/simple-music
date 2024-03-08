import React from 'react'
import icon from '../assets/icon.png'

const Image: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ src, ...props }) => {
  const srcUrl = src ? (src.startsWith('//') ? 'http:' + src : src) : icon
  return (
    <img
      {...props}
      src={srcUrl}
      data-src={src}
      data-srcUrl={srcUrl}
      onError={(e) => {
        (e.target as HTMLImageElement).onerror = null
        ;(e.target as HTMLImageElement).src = icon
      }}
    />
  )
}

export default Image
