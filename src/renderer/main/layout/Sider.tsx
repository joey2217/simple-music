import * as React from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArtistsIcon,
  BrowseIcon,
  PlayCircle,
  PlaylistIcon,
  FluentArrowDownload,
  FluentSettings,
} from '../components/Icons'

const Sider: React.FC = () => {
  return (
    <nav id="menu" className="flex-shrink-0 border-r w-44">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            发现
          </h2>
          <div className="flex flex-col gap-1">
            <NavLink to="/" className="link w-full ">
              <PlayCircle className="mr-4" />
              <span>精 选</span>
            </NavLink>
            <NavLink to="/top" className="link w-full ">
              <BrowseIcon className="mr-4" />
              <span>排 行</span>
            </NavLink>
            <NavLink to="/artists" className="link w-full ">
              <ArtistsIcon className="mr-4" />
              <span>歌 手</span>
            </NavLink>
            <NavLink to="/playlists" className="link w-full ">
              <PlaylistIcon className="mr-4" />
              <span>歌 单</span>
            </NavLink>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            下载
          </h2>
          <div className="space-y-1">
            <NavLink to="/download" className="link w-full ">
              <FluentArrowDownload className="mr-4" />
              <span>下 载</span>
            </NavLink>
            <NavLink to="/settings" className="link w-full ">
              <FluentSettings className="mr-4" />
              <span>设 置</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sider
