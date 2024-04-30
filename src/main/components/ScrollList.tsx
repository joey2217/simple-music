import React from 'react'

interface ScrollListProps {}

const ScrollList: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ScrollListProps
> = ({ ...props }) => {
  return <div {...props}>ScrollList</div>
}

export default ScrollList
