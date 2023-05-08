import React, { memo, useState } from 'react'

const About: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<string>('')
  const [disabled, setDisabled] = useState(false)

  const checkUpdate = () => {
    setDisabled(false)
    setUpdateInfo('检测更新中...')
    window.electronAPI
      .checkUpdate()
      .then((res) => {
        if (res) {
          setUpdateInfo(`新版本:${res.updateInfo.version}更新中...`)
        } else {
          setUpdateInfo('当前已经是最新版本')
        }
      })
      .catch((error) => {
        setUpdateInfo('检测更新出错了')
        console.error(error, '检测更新错误')
      })
      .finally(() => {
        setDisabled(false)
      })
  }

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
      <p>
        <span className="label">版本</span>
        <span>{window.versions.version}</span>
      </p>
      {updateInfo && <p>{updateInfo}</p>}
      <p>
        <button
          disabled={disabled}
          className="primary-btn mr-4"
          onClick={checkUpdate}
        >
          检测更新
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
      </p>
      <p>
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
      </p>
      <p>
        <button
          className="text-btn"
          onClick={() => window.devAPI.toggleDevtools()}
        >
          切换开发者工具
        </button>
      </p>
      <p>
        <span className="label">electron</span>
        <span>{window.versions.electron}</span>
      </p>
      <p>
        <span className="label">node</span>
        <span>{window.versions.node}</span>
      </p>
      <p>
        <span className="label">chrome</span>
        <span>{window.versions.chrome}</span>
      </p>
    </div>
  )
}

export default memo(About)
