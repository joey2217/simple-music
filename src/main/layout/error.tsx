import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router";
import icon from "../assets/icon.png";
import ThemeToggle from "./theme-toggle";

export default function Error() {
  const error = useRouteError() as { statusText: string; message: string };
  return (
    <>
      <header className="titleBarContainer">
        <div className="titleBar pr-2 flex gap-2 items-center">
          <Link to="/" id="logo" className="border-r h-10 flex items-center gap-2 justify-center">
            <img src={icon} alt="logo" className="w-8 h-8" />
            <span>轻·音乐</span>
          </Link>
          <div className="flex-1 h-full draggable"></div>
          {import.meta.env.DEV && <button onClick={() => window.devAPI.toggleDevtools()}>devtools</button>}
          <ThemeToggle />
        </div>
      </header>
      <div className="max-w-lg mx-auto text-center py-20 px-6 flex gap-2 flex-col">
        <h1 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">出错了!</h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">发生错误了,请稍后再试或向开发者反馈!</p>
        {error && (
          <p className="mt-6 italic">
            <i>{error.statusText || error.message}</i>
          </p>
        )}
        <div className="grid grid-cols-2 justify-center gap-2 mt-5">
          <Button>
            <Link className="btn" to="/">
              返回首页
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.electronAPI.openExternal("https://github.com/joey2217/simple-music/issues")}
          >
            反馈BUG
          </Button>
        </div>
      </div>
    </>
  );
}
