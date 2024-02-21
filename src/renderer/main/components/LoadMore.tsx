import React, { useEffect, useRef } from 'react'

interface Props {
  loadMore: () => void
  finished: boolean
}

const LoadMore: React.FC<Props> = ({ loadMore, finished }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (finished) {
      observer.current?.disconnect()
      observer.current = null
    } else {
      observer.current = new IntersectionObserver(
        (entries, intersectionObserver) => {
          if (finished) {
            intersectionObserver.disconnect()
            observer.current = null
          } else if (entries[0].intersectionRatio > 0) {
            loadMore()
          }
        }
      )
      // 开始观察
      observer.current.observe(loadMoreRef.current!)
    }

    return () => {
      observer.current?.disconnect()
      observer.current = null
    }
  }, [finished, loadMore])

  return (
    <div ref={loadMoreRef} className="text-center">
      loading...
    </div>
  )
}

export default LoadMore
