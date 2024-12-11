import React, { useMemo } from 'react'
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Link } from 'react-router'

interface Props {
  total: number
  urlFormat: (p: number) => string
  size?: number
  current?: number
}

const Pagination: React.FC<Props> = ({
  total,
  size = 10,
  current = 1,
  urlFormat,
}) => {
  const totalPage = useMemo(() => Math.ceil(total / size), [size, total])

  const disablePrevious = useMemo(() => current === 1, [current])
  const disableNext = useMemo(() => current === totalPage, [current, totalPage])

  const pageNumbers = useMemo(
    () =>
      Array.from({ length: totalPage > 5 ? 5 : totalPage }, (_item, i) => {
        if (current < 3) {
          return i + 1
        } else if (totalPage - current < 3) {
          return totalPage - 4 + i
        } else {
          return current + i - 2
        }
      }),
    [current, totalPage]
  )

  const midPage = useMemo(
    () =>
      pageNumbers.length % 2 === 0
        ? pageNumbers[Math.floor(pageNumbers.length / 2)] - 0.5
        : pageNumbers[Math.floor(pageNumbers.length / 2)],
    [pageNumbers]
  )

  const pages = useMemo(() => {
    return pageNumbers.map((p) => (
      <PaginationItem key={p}>
        <PaginationLink
          isActive={current === p}
          disabled={current === p}
          to={urlFormat(p)}
        >
          {p}
        </PaginationLink>
      </PaginationItem>
    ))
  }, [current, pageNumbers, urlFormat])

  const prevEllipsis = useMemo(() => {
    if (midPage < 3 || totalPage <= 5) {
      return null
    } else if (midPage === 4) {
      return (
        <PaginationItem>
          <PaginationLink to={urlFormat(1)}>1</PaginationLink>
        </PaginationItem>
      )
    } else if (midPage > 4) {
      return (
        <>
          <PaginationItem>
            <PaginationLink to={urlFormat(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <Link
              title="前6页"
              to={urlFormat(current - 5 > 1 ? current - 5 : 1)}
            >
              <PaginationEllipsis />
            </Link>
          </PaginationItem>
        </>
      )
    }
  }, [current, midPage, totalPage, urlFormat])

  const nextEllipsis = useMemo(() => {
    const toEnd = totalPage - midPage
    if (toEnd < 2 || totalPage <= 5) {
      return null
    } else if (toEnd === 3) {
      return (
        <PaginationItem>
          <PaginationLink to={urlFormat(totalPage)}>{totalPage}</PaginationLink>
        </PaginationItem>
      )
    } else if (toEnd > 3) {
      return (
        <>
          <PaginationItem>
            <Link
              title="后5页"
              to={urlFormat(current + 5 < totalPage ? current + 5 : totalPage)}
            >
              <PaginationEllipsis />
            </Link>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to={urlFormat(totalPage)}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        </>
      )
    }
  }, [current, midPage, totalPage, urlFormat])

  if (totalPage === 1) {
    return null
  }

  return (
    <PaginationRoot className="select-none py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={disablePrevious}
            to={urlFormat(current - 1)}
            className={disablePrevious ? 'cursor-not-allowed' : ''}
          />
        </PaginationItem>
        {prevEllipsis}
        {pages}
        {nextEllipsis}
        <PaginationItem>
          <PaginationNext
            disabled={disableNext}
            to={urlFormat(current + 1)}
            className={disableNext ? 'cursor-not-allowed' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  )
}

export default Pagination
