import { NavLink, Outlet } from "react-router";

export default function LikeLayout() {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <NavLink className="link" to="/like" end>
          单曲
        </NavLink>
        <NavLink className="link" to="/like/artist">
          歌手
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}
