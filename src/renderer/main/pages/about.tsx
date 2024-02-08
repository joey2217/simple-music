import React, { useEffect } from 'react'

const About: React.FC = () => {
  useEffect(() => {
    console.log('##version##')
    console.table(window.versions)
  }, [])
  return (
    <div className="page text-center">
      <img src="./logo.png" alt="logo" className="w-10 h-10 mx-auto" />
      <h2 className="text-xl font-semibold my-2">视界</h2>
      <div className="my-2">
        <span>版本 : </span>
        <span>{window.versions.version}</span>
      </div>
      <div className="my-2 flex justify-center gap-4">
        <button
          onClick={window.electronAPI.checkUpdate}
          className="btn-primary btn btn-sm"
        >
          检测更新
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() =>
            window.electronAPI.openExternal(
              'https://github.com/joey2217/simple-tv/releases'
            )
          }
        >
          手动下载
        </button>
      </div>
      <div className='flex gap-4 justify-center'>
        <button
          className="btn btn-sm"
          onClick={() => window.devAPI.toggleDevtools()}
        >
          切换开发者工具
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() =>
            window.electronAPI.openExternal(
              'https://github.com/joey2217/simple-tv/issues'
            )
          }
        >
          反馈BUG
        </button>
      </div>
    </div>
  )
}

export default About
