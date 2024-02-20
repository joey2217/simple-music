import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string }
  return (
    <div className="text-center p-10 flex gap-2 flex-col">
      <h1 className="font-semibold text-xl">出错了!</h1>
      <p>发生错误了,请稍后再试或向开发者反馈!</p>
      {error && (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      )}
      <div>
        <button className="btn">devtools</button>
        <Link className="btn" to="/">
          返回首页
        </Link>
      </div>
      {/* <div>
          <button
            className="default-btn"
            onClick={() =>
              window.electronAPI.openExternal(
                'https://github.com/joey2217/simple-music/issues'
              )
            }
          >
            反馈BUG
          </button>
        </div> */}
    </div>
  )
}
