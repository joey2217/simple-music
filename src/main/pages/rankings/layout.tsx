import { fetcher } from "@/main/lib/request";
import { RankingMenu, RankingMenuItem } from "@/main/types/ranking";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useSWR from "swr";

export default function RankingsLayout() {
  const { data, isLoading, error } = useSWR<RankingMenu[]>("/api/www/bang/bang/bangMenu", fetcher);
  const [current, setCurrent] = useState<RankingMenuItem>();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div className="flex gap-2 h-full">
        <div className="mx-4 md:mx-0 w-fit shrink-0 p-4 rounded border border-slate-900/20 dark:border-slate-50/20 overflow-auto">
          {data.map((item) => (
            <div key={item.name} className="mb-1">
              <div className="pb-1 text-lg border-b border-slate-900/20 dark:border-slate-50/20">{item.name}</div>
              <div className="py-1">
                {item.list.map((bang) => (
                  <NavLink
                    key={bang.sourceid}
                    to={`/rankings/${bang.sourceid}`}
                    className={({ isActive }) =>
                      `block py-0.5 cursor-pointer hover:text-primary ${isActive ? "text-primary/90" : ""}`
                    }
                    onClick={() => setCurrent(bang)}
                  >
                    {bang.name.replace("酷我", "")}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Outlet context={current} />
      </div>
    );
  }
  return null;
}
