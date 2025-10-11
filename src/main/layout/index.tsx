import { Outlet } from "react-router";
import Header from "./header";
import Sider from "./sider";
import Player from "./player";

export default function Layout() {
  return (
    <div>
      <Header />
      <main id="main" className="flex">
        <Sider />
        <div id="content" className="grow p-2">
          <Outlet />
        </div>
      </main>
      <Player />
    </div>
  );
}
