import React, { memo, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { autoUpdateState } from '../../store/atom'

const About: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [autoUpdate, setAutoUpdate] = useRecoilState(autoUpdateState)

  const checkUpdate = () => {
    setLoading(true)
    window.electronAPI
      .checkUpdate()
      .then((version) => {
        console.log('新版本', version)
      })
      .catch((error) => {
        console.error(error, '检测更新错误')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    window.electronAPI.onVersionUpdate((_e, info, status) => {
      setUpdateInfo(info)
    })
  }, [])

  return (
    <div className="text-center flex flex-col gap-4">
      <div className="text-indigo-600 text-5xl flex justify-center">
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
        >
          <path
            d="M742.3 100.3l-25.6 44.3c126.2 73 204.7 208.9 204.7 354.6 0 225.7-183.6 409.3-409.3 409.3S102.8 724.8 102.8 499.1c0-145.7 78.4-281.5 204.7-354.6l-25.6-44.3c-142 82.1-230.2 235-230.2 398.8 0 253.9 206.6 460.5 460.5 460.5S972.6 753 972.6 499.1c0-163.9-88.2-316.7-230.3-398.8z"
            fill="currentColor"
          ></path>
          <path
            d="M464.2 437l-25.6-44.3c-45.3 26.2-73.5 75-73.5 127.3 0 81 65.9 147 147 147s147-65.9 147-147v-6.3L451.2 115.4h164V64.2H366.8l241 461.8c-3.1 50.1-44.8 89.9-95.6 89.9-52.8 0-95.8-43-95.8-95.8-0.1-34.1 18.2-66 47.8-83.1z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <h2 className="text-xl font-semibold">轻音乐</h2>
      <div>
        <span className="label">版本</span>
        <span>{window.versions.version}</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="form-label">更新策略</div>
        <div className="form-radio">
          <input
            type="radio"
            name="pattern"
            id="auto"
            defaultChecked={autoUpdate}
            onChange={(e) => setAutoUpdate(e.target.checked)}
          />
          <label htmlFor="auto">自动更新</label>
        </div>
        <div className="form-radio">
          <input
            type="radio"
            name="pattern"
            id="not-auto"
            defaultChecked={!autoUpdate}
            onChange={(e) => setAutoUpdate(!e.target.checked)}
          />
          <label htmlFor="not-auto">手动更新</label>
        </div>
      </div>
      {updateInfo && <div>{updateInfo} </div>}
      <div>
        <button
          disabled={loading}
          className="primary-btn mr-4"
          onClick={checkUpdate}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          <span>检测更新</span>
        </button>
        <button
          className="default-btn"
          onClick={() =>
            window.electronAPI.openExternal(
              'https://github.com/joey2217/simple-music/releases'
            )
          }
        >
          手动下载
        </button>
      </div>
      <div>
        <button
          className="default-btn"
          onClick={() =>
            window.electronAPI.openExternal(
              'https://github.com/joey2217/simple-music/issues'
            )
          }
        >
          意见反馈
        </button>
      </div>
      <div>
        <button
          className="text-btn"
          onClick={() => window.devAPI.toggleDevtools()}
        >
          切换开发者工具
        </button>
      </div>
      <div>
        <span className="label">electron</span>
        <span>{window.versions.electron}</span>
      </div>
      <div>
        <span className="label">node</span>
        <span>{window.versions.node}</span>
      </div>
      <div>
        <span className="label">chrome</span>
        <span>{window.versions.chrome}</span>
      </div>
    </div>
  )
}

export default memo(About)
