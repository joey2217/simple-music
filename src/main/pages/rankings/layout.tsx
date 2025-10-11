import { fetcher } from "@/main/lib/request";
import { RankingMenu } from "@/main/types/ranking";
import { NavLink, Outlet } from "react-router";
import useSWR from "swr";

export default function RankingsLayout() {
  const { data, isLoading, error } = useSWR<RankingMenu[]>("/api/www/bang/bang/bangMenu", fetcher);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div className="flex">
        <div>
          {data.map((item) => (
            <div key={item.name}>
              <div>{item.name}</div>
              <div>
                {item.list.map((bang) => (
                  <NavLink key={bang.sourceid} to={`/rankings/${bang.sourceid}`}>
                    <div>{bang.name}</div>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    );
  }
  return null;
}
