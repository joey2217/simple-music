import React, { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  total: number
  size?: number
  defalutPage?: number
  onChange?: (page: number) => void
}

const Pagination: React.FC<Props> = ({
  total,
  size = 10,
  defalutPage = 1,
  onChange,
}) => {
  const [page, setPage] = useState(defalutPage)

  const totalPage = useMemo(() => Math.ceil(total / size), [size, total])

  const disablePrevious = useMemo(() => page === 1, [page])
  const disableNext = useMemo(() => page === totalPage, [page, totalPage])

  const prevEllipsis = useMemo(() => {
    if (page === 1) {
      return null
    } else if (page <= 4) {
      return [2, 3].map((p) => (
        <PaginationItem key={p} onClick={() => setPage(p)}>
          <PaginationLink>{p}</PaginationLink>
        </PaginationItem>
      ))
    } else if (page >= 5) {
      return (
        <>
          <PaginationItem onClick={() => setPage(1)}>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => setPage((p) => (p - 5 > 0 ? p - 5 : 1))}
          >
            <PaginationEllipsis />
          </PaginationItem>
          {Array.from({ length: 2 }).map((_item, i) => (
            <PaginationItem
              key={page + i - 2}
              onClick={() => setPage((p) => p + i - 2)}
            >
              <PaginationLink>{page + i - 2}</PaginationLink>
            </PaginationItem>
          ))}
        </>
      )
    }
    return null
  }, [page])

  const prevNext = useMemo(() => {
    const toEnd = totalPage - page
    if (toEnd === 1) {
      return (
        <PaginationItem onClick={() => setPage(totalPage)}>
          <PaginationLink>{totalPage}</PaginationLink>
        </PaginationItem>
      )
    } else if (toEnd <= 4) {
      return Array.from({ length: toEnd }, (_item, i) => totalPage - i).map(
        (p) => (
          <PaginationItem key={p} onClick={() => setPage(p)}>
            <PaginationLink>{p}</PaginationLink>
          </PaginationItem>
        )
      )
    } else if (toEnd >= 5) {
      return (
        <>
          {Array.from({ length: 2 }).map((_item, i) => (
            <PaginationItem
              key={page + i - 2}
              onClick={() => setPage((p) => p + i - 2)}
            >
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            onClick={() =>
              setPage((p) => (p + 5 < totalPage ? p + 5 : totalPage))
            }
          >
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem onClick={() => setPage(totalPage)}>
            <PaginationLink>{totalPage}</PaginationLink>
          </PaginationItem>
        </>
      )
    }
    return null
  }, [page, totalPage])

  useEffect(() => {
    onChange?.(page)
  }, [onChange, page])

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={disablePrevious}
            onClick={() => setPage((p) => p - 1)}
          />
        </PaginationItem>
        {prevEllipsis}
        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>
        {prevNext}
        <PaginationItem>
          <PaginationNext
            disabled={disablePrevious}
            onClick={() => setPage((p) => p + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  )
}

export default Pagination
