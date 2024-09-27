import React, { useEffect, useRef } from 'react'
import logo from '../assets/icon.png'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholderSrc?: string
}

export default function LazyImage({
  placeholderSrc = logo,
  src,
  ...props
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null!)

  useEffect(() => {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement
          if (src) {
            lazyImage.src = src.startsWith('//') ? 'http:' + src : src
          }
          observer.unobserve(lazyImage) // 观察一次后停止观察
          observer.disconnect() // 停止观察
        }
      })
    })
    const imgEl = imgRef.current
    lazyImageObserver.observe(imgEl)
    return () => {
      lazyImageObserver.disconnect()
    }
  }, [src])

  return (
    <img
      {...props}
      ref={imgRef}
      src={placeholderSrc}
      data-src={src}
      onError={(e) => {
        (e.target as HTMLImageElement).onerror = null
        ;(e.target as HTMLImageElement).src = placeholderSrc
      }}
    />
  )
}
