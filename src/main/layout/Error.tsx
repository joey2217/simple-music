import { Button } from '@/components/ui/button'
import { Link, useRouteError } from 'react-router'

export default function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string }
  return (
    <div className="text-center py-20 px-6 flex gap-2 flex-col">
      <h1 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
        出错了!
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        发生错误了,请稍后再试或向开发者反馈!
      </p>
      {error && (
        <p className="mt-6 border-l-2 pl-6 italic">
          <i>{error.statusText || error.message}</i>
        </p>
      )}
      <div className="grid grid-cols-2 justify-center gap-2 mt-5">
        <Button>
          <Link className="btn" to="/">
            返回首页
          </Link>
        </Button>
        <Button variant="secondary" onClick={window.devAPI.toggleDevtools}>
          devtools
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            window.electronAPI.openExternal(
              'https://github.com/joey2217/simple-music/issues'
            )
          }
        >
          反馈BUG
        </Button>
      </div>
    </div>
  )
}
