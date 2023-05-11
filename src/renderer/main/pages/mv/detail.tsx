import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import { mvDetailQuery, mvUrlQuery } from './store'
import { LoadingIcon, Play } from '../../components/icons'
import PageHeader from '../../components/PageHeader'

const MvDetail: React.FC = () => {
  const { id } = useParams()
  const mvUrlLoadable = useRecoilValueLoadable(mvUrlQuery(id as string))
  const mvDetailLoadable = useRecoilValueLoadable(mvDetailQuery(id as string))

  const mvVideo = useMemo(() => {
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
        </div>
      )
    } else if (mvUrlLoadable.state === 'loading') {
      return (
        <div className="min-h-[650px] flex justify-center items-center">
          <LoadingIcon className="text-4xl text-indigo-600" />
        </div>
      )
    }
    return null
  }, [mvUrlLoadable.contents, mvUrlLoadable.state])

  if (mvDetailLoadable.state === 'hasValue') {
    const mv = mvDetailLoadable.contents
    return (
      <div>
        <PageHeader title={'MV : ' + mv.name} />
        {mvVideo}
        <div className="flex gap-4">
          <h2 className="text-xl">{mv.name}</h2>
          <div className="text-lg text-secondary leading-8">{mv.artist}</div>
        </div>
        <div className="text-secondary flex items-center gap-2">
          <Play /> <div className="label">播放量</div>
          <span>{mv.mvPlayCnt && Number(mv.mvPlayCnt).toLocaleString()}</span>
        </div>
      </div>
    )
  }
  if (mvDetailLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }

  return <PageHeader title="未知MV" />
}

export default memo(MvDetail)
