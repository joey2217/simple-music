import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from './icons'

interface Props {
  title?: string
  backPath?: string
}

const PageHeader: React.FC<Props> = ({ title, backPath }) => {
  const navigate = useNavigate()
  const back = () => {
    if (backPath) {
      navigate(backPath)
    } else {
      navigate(-1)
    }
  }
  return (
    <div className="flex items-center mb-4">
      <button
        onClick={back}
        className="w-16 flex items-center gap-1 text-lg hover:text-indigo-600"
      >
        <ChevronLeft />
        <span>返回</span>
      </button>
      <div className="flex-1 text-center text-lg font-semibold">{title}</div>
      <div className="w-16 h-5"></div>
    </div>
  )
}

export default memo(PageHeader)
