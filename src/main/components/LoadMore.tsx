import React, { useEffect, useRef } from 'react'
import { throttle } from '../utils/func'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  loadMore: () => void
  finished: boolean
  className?: string
}

const LoadMore: React.FC<Props> = ({ loadMore, finished, className }) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (finished) {
      observer.current?.disconnect()
      observer.current = null
    } else {
      const throttledLoadMore = throttle(loadMore, 500, { leading: false })
      observer.current = new IntersectionObserver(
        (entries, intersectionObserver) => {
          if (finished) {
            intersectionObserver.disconnect()
            observer.current = null
          } else if (entries[0].intersectionRatio > 0) {
            throttledLoadMore()
            console.log('throttledLoadMore')
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

  if (finished) {
    return null
  }

  return (
    <div ref={loadMoreRef} className={`text-center ${className}`}>
      <Skeleton className="h-10 rounded-xl bg-card" />
    </div>
  )
}

export default LoadMore
