import { Outlet } from "react-router";
import Header from "./header";
import Sider from "./sider";
import Player from "./player";
import useIPC from "../lib/ipc";

export default function Layout() {
  useIPC();
  return (
    <>
      <Header />
      <main id="main" className="flex">
        <Sider />
        <div className="grow p-2 h-full overflow-auto">
          <Outlet />
        </div>
      </main>
      <Player />
    </>
  );
}
