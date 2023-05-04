import React, { memo } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { artistInfoState } from './store'

const Info: React.FC = () => {
  const artistInfoLoadable = useRecoilValueLoadable(artistInfoState)

  if (artistInfoLoadable.state === 'hasValue') {
    const artistInfo = artistInfoLoadable.contents
    if (artistInfo != null) {
      return (
        <div>
          <h3 className="my-4">基本信息</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="label">姓名</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: artistInfo.name || '-',
                }}
              ></span>
            </div>
            <div>
              <span className="label">译名</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: artistInfo.aartist || '-',
                }}
              ></span>
            </div>
            <div>
              <span className="label">性别</span>
              <span>{artistInfo.gener}</span>
            </div>
            <div>
              <span className="label">国籍</span>
              <span>{artistInfo.country}</span>
            </div>
            <div>
              <span className="label">国籍</span>
              <span>{artistInfo.country}</span>
            </div>
            <div>
              <span className="label">出生地</span>
              <span>{artistInfo.birthplace}</span>
            </div>
            <div>
              <span className="label">语言</span>
              <span>{artistInfo.language}</span>
            </div>
            <div>
              <span className="label">生日</span>
              <span>{artistInfo.birthday}</span>
            </div>
            <div>
              <span className="label">星座</span>
              <span>{artistInfo.constellation}</span>
            </div>
            <div>
              <span className="label">身高</span>
              <span>{artistInfo.tall}</span>
            </div>
            <div>
              <span className="label">体重</span>
              <span>{artistInfo.weight}</span>
            </div>
          </div>
          <h3 className="my-4">个人简介</h3>
          <div dangerouslySetInnerHTML={{ __html: artistInfo.info }}></div>
        </div>
      )
    }
  }
  return null
}

export default memo(Info)
