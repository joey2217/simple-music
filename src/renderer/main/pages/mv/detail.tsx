import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import { mvDetailQuery, mvUrlQuery } from './store'
import { LoadingIcon, Play } from '../../components/icons'

const MvDetail: React.FC = () => {
  const { id } = useParams()
  const mvUrlLoadable = useRecoilValueLoadable(mvUrlQuery(id as string))
  const mvDetailLoadable = useRecoilValueLoadable(mvDetailQuery(id as string))

  const detail = useMemo(() => {
    switch (mvDetailLoadable.state) {
      case 'hasValue':
        const mv = mvDetailLoadable.contents
        return (
          <div>
            <div className="flex gap-4">
              <h2 className="text-xl">{mv.name}</h2>
              <div className="text-lg text-secondary leading-8">{mv.artist}</div>
            </div>
            <div className="text-secondary flex items-center gap-2">
              <Play /> <div className="label">播放量</div>
              <span>
                {mv.mvPlayCnt && Number(mv.mvPlayCnt).toLocaleString()}
              </span>
            </div>
          </div>
        )
      default:
        return null
    }
  }, [mvDetailLoadable.contents, mvDetailLoadable.state])

  if (mvUrlLoadable.state === 'hasValue') {
    return (
      <div>
        <div className="flex justify-center">
          <video
            className="w-full"
            src={mvUrlLoadable.contents}
            controls
            autoPlay
          />
        </div>
        {detail}
      </div>
    )
  }

  if (mvUrlLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl" />
      </div>
    )
  }

  return <div>MvDetail{id}</div>
}

export default memo(MvDetail)
