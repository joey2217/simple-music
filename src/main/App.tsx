import { RouterProvider } from "react-router";
import router from "./router";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/request";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

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
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </SWRConfig>
  );
}
