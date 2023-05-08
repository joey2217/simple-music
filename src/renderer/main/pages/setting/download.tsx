import React, { memo } from 'react'
import { useRecoilState } from 'recoil'
import { useDownload } from '../../store/hooks'
import type { DownloadMusicPattern } from '../../types'
import { downloadSettingState } from '../../store/atom'

const DOWNLOAD_MUSIC_PATTERN: { value: DownloadMusicPattern; label: string }[] =
  [
    {
      label: '歌手-歌曲名',
      value: 'artist_name',
    },
    {
      label: '歌曲名-歌手',
      value: 'name_artist',
    },
    {
      label: '歌曲名',
      value: 'name',
    },
  ]

const Download: React.FC = () => {
  const { downloadPath, openDownloadPath, selectDownloadPath } = useDownload()
  const [downloadSetting, setDownloadSetting] =
    useRecoilState(downloadSettingState)
  return (
    <div>
      <form>
        <div className="form-item">
          <label className="w-40 label">下载路径</label>
          <span>{downloadPath}</span>
          <button className="default-btn ml-2" onClick={openDownloadPath}>
            打开
          </button>
        </div>
        <div className="form-item">
          <label className="w-40 label">更改下载目录</label>
          <button className="primary-btn" onClick={selectDownloadPath}>
            更改目录
          </button>
        </div>
        <div className="form-item">
          <div className="w-40 label">音乐命名格式</div>
          <div className="inline-flex gap-4 items-center">
            {DOWNLOAD_MUSIC_PATTERN.map((p) => (
              <div key={p.value} className="form-radio">
                <input
                  type="radio"
                  id={p.value}
                  name="pattern"
                  value={p.value}
                  defaultChecked={downloadSetting.pattern === p.value}
                  onChange={(e) =>
                    setDownloadSetting((p) => ({
                      ...p,
                      pattern: e.target.value as DownloadMusicPattern,
                    }))
                  }
                />
                <label htmlFor={p.value}>{p.label}</label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(Download)
