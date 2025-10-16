import { RouterProvider } from "react-router";
import router from "./router";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/request";

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  );
}
