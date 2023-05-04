import React, { memo, useCallback, useMemo, useState } from 'react'
import { DoubleArrowLeft, DoubleArrowRight } from '../icons'

interface Props {
  total?: number
  current?: number
  size?: number
  hideOnSinglePage?: boolean
  onChange?: (page: number) => void
}

const Pagination: React.FC<Props> = ({
  total = 0,
  current = 1,
  size = 10,
  hideOnSinglePage = false,
  onChange,
}) => {
  const [page, setPage] = useState(current)

  const pageNum = useMemo(() => {
    if (total > 0 && size > 0) {
      return Math.ceil(total / size)
    }
    return 0
  }, [size, total])

  const disabledPrev = useMemo(() => {
    return pageNum === 0 || page === 1
  }, [page, pageNum])

  const disabledNext = useMemo(() => {
    return pageNum === 0 || page === pageNum
  }, [page, pageNum])

  const onPageChange = useCallback(
    (p: number) => {
      setPage(p)
      onChange && onChange(p)
    },
    [onChange]
  )

  const onPageJump = useCallback(
    (dir: 'next' | 'prev') => {
      if (dir === 'next') {
        setPage((p) => {
          const n = p + 5 < pageNum ? p + 5 : pageNum
          onChange && onChange(n)
          return n
        })
      } else {
        setPage((p) => {
          const n = p > 5 ? p - 5 : 1
          onChange && onChange(n)
          return n
        })
      }
    },
    [onChange, pageNum]
  )

  const pages = useMemo(() => {
    if (pageNum === 0) {
      return (
        <li>
          <button disabled>0</button>
        </li>
      )
    } else if (pageNum <= 5) {
      return Array.from({ length: pageNum }).map((_item, index) => (
        <li key={index}>
          <button
            title={`${index + 1}`}
            onClick={() => onPageChange(index + 1)}
            className={`${page === index + 1 ? 'current' : ' '}`}
          >
            {index + 1}
          </button>
        </li>
      ))
    } else {
      const showFirst = page > 3
      const showPrev5 = page >= 5
      const showLast = page < pageNum - 2
      const showNext5 = page <= pageNum - 4
      let pageArr: number[] = []
      if (page < 4) {
        pageArr = [1, 2, 3, 4, 5]
      } else if (page < pageNum - 2) {
        pageArr = Array.from({ length: 5 }).map(
          (_item, index) => index + page - 2
        )
      } else {
        pageArr = Array.from({ length: 5 }).map(
          (_item, index) => pageNum + index - 4
        )
      }
      return (
        <>
          {showFirst && (
            <li>
              <button
                title="1"
                onClick={() => onPageChange(1)}
                className={`${page === 1 ? 'current' : ' '}`}
              >
                1
              </button>
            </li>
          )}
          {showPrev5 && (
            <li>
              <button title="向前5页" onClick={() => onPageJump('prev')}>
                <DoubleArrowLeft />
              </button>
            </li>
          )}
          {pageArr.map((p) => (
            <li key={p}>
              <button
                title={`${p}`}
                onClick={() => onPageChange(p)}
                className={`${page === p ? 'current' : ' '}`}
              >
                {p}
              </button>
            </li>
          ))}
          {showNext5 && (
            <li>
              <button title="向后5页" onClick={() => onPageJump('next')}>
                <DoubleArrowRight />
              </button>
            </li>
          )}
          {showLast && (
            <li>
              <button
                title={`${pageNum}`}
                onClick={() => onPageChange(pageNum)}
                className={`${page === pageNum ? 'current' : ' '}`}
              >
                {pageNum}
              </button>
            </li>
          )}
        </>
      )
    }
  }, [onPageChange, onPageJump, page, pageNum])

  if (hideOnSinglePage && pageNum === 1) {
    return null
  }

  return (
    <ol className="pagination flex justify-center gap-1 text-sm overflow-hidden" >
      <li>
        <button
          disabled={disabledPrev}
          title="上一页"
          onClick={() => setPage((p) => p - 1)}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      {pages}

      <li>
        <button
          title="下一页"
          disabled={disabledNext}
          onClick={() => setPage((p) => p + 1)}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  )
}

export default memo(Pagination)
