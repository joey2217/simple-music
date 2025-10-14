import { ArrowDownToLine, Heart, ListOrdered, ListVideo, MicVocal, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router";

export default function Sider() {
  return (
    <nav id="menu" className="flex-shrink-0 border-r w-44 scrollbar overflow-auto select-none">
      <div className="space-y-2 py-1">
        <div className="px-3 py-1">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">发现</h2>
          <div className="flex flex-col gap-1">
            <NavLink to="/" className="nav-link">
              <Sparkles size={18} />
              <span>精 选</span>
            </NavLink>
            <NavLink to="/rankings" className="nav-link">
              <ListOrdered size={18} />
              <span>排 行</span>
            </NavLink>
            <NavLink to="/artists" className="nav-link">
              <MicVocal size={18} />
              <span>歌 手</span>
            </NavLink>
            <NavLink to="/song-lists" className="nav-link">
              <ListVideo size={18} /> <span>歌 单</span>
            </NavLink>
          </div>
        </div>
        <div className="px-3 py-1">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">我的</h2>
          <div className="space-y-1">
            <NavLink to="/download" className="nav-link">
              <ArrowDownToLine size={18} />
              <span>下 载</span>
            </NavLink>
          </div>
          <div className="space-y-1">
            <NavLink to="/like" className="nav-link">
              <Heart size={18} />
              <span>喜 欢</span>
            </NavLink>
          </div>
        </div>
        <div className="px-3 py-1">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">设置</h2>
          <div className="space-y-1">
            <NavLink to="/settings" className="nav-link">
              <Settings size={18} />
              <span>设 置</span>
            </NavLink>
          </div>
        </div>
        {/* <div className="px-3 py-1">
          <div className="flex items-center justify-between mb-2 px-4">
            <h2
              className="text-lg font-semibold tracking-tight flex items-center cursor-pointer"
            >
              <span>歌 单</span>
              <ChevronDownIcon className={`${expanded ? "rotate-180" : ""} text-xl ml-1`} />
            </h2>
            <Button className="h-6 w-6 p-0" variant="outline" onClick={() => createPlaylist()}>
              <PlusIcon />
            </Button>
          </div>
          <div className={`${expanded ? "h-auto" : "h-0 overflow-hidden"}`}>
            <NavLink to="/recently-played" className="nav-link w-full ">
              <PlaylistIcon className="mr-4" />
              <span>最近播放</span>
            </NavLink>
            {playlistList.map((p) => (
              <NavLink key={p.id} to={`/playlist/${p.id}`} className="nav-link w-full ">
                <PlaylistIcon className="mr-4" />
                <span>{p.title}</span>
              </NavLink>
            ))}
          </div>
        </div> */}
      </div>
    </nav>
  );
}
