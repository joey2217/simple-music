import React, { memo, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Avatar, Skeleton } from 'antd'
import { fetchSingerDetail } from '../../api/singer'
import { SingerDetail } from '../../types'

const Singer: React.FC = () => {
  const { singerId } = useParams()
  const [singerDetail, setSingerDetail] = useState<SingerDetail | undefined>(
    undefined
  )
  useEffect(() => {
    fetchSingerDetail(singerId as string).then((data) => {
      setSingerDetail(data)
    })
  }, [singerId])

  if (singerDetail == null) {
    return <Skeleton active />
  }

  return (
    <div>
      <div className="flex gap-4">
        <Avatar size={160} shape="square" src={singerDetail.pic300} />
        <div>
          <h2 className="font-semibold  text-2xl">{singerDetail.name}</h2>
          <div className="flex flex-wrap text-xl mb-2 gap-2">
            <div>
              <span>单曲：</span>
              <span>{singerDetail.musicNum}</span>
            </div>
            <div>
              <span>专辑：</span>
              <span>{singerDetail.albumNum}</span>
            </div>
            <div>
              <span>MV：</span>
              <span>{singerDetail.mvNum}</span>
            </div>
            <div>
              <span>粉丝：</span>
              <span>{singerDetail.artistFans}</span>
            </div>
          </div>
          <div className="flex flex-wrap text-base gap-2">
            <div>
              <span>英文名：</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: singerDetail.aartist || '-',
                }}
              ></span>
            </div>
            <div>
              <span>国籍：</span>
              <span>{singerDetail.country}</span>
            </div>
            <div>
              <span>语言：</span>
              <span>{singerDetail.language || '-'}</span>
            </div>
            <div>
              <span>出生地：</span>
              <span>{singerDetail.birthplace || '-'}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(Singer)
