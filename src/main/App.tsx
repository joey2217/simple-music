import { RouterProvider } from "react-router";
import router from "./router";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/request";
import useIPC from "./lib/ipc";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  useIPC();
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
      <Toaster richColors />
    </SWRConfig>
  );
}
