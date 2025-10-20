import { createHashRouter, redirect } from "react-router";
import Layout from "./layout";
import Error from "./layout/error";
import Rankings from "./pages/rankings/page";
import RankingsLayout from "./pages/rankings/layout";
import Home from "./pages/home/page";
import AlbumPage from "./pages/album/page";
import ArtistsPage from "./pages/artists/page";
import ArtistLayout from "./pages/artist/layout";
import ArtistPage from "./pages/artist/page";
import ArtistAlbumPage from "./pages/artist/album";
import ArtistInfoPage from "./pages/artist/info";
import ArtistMVPage from "./pages/artist/mv";
import DownloadPage from "./pages/download/page";
import MusicPage from "./pages/music/page";
import SongListPage from "./pages/song-list/page";
import LikePage from "./pages/like";
import SettingsPage from "./pages/settings/page";
import SearchPage from "./pages/search/page";
import SearchLayout from "./pages/search/layout";

const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/rankings",
        Component: RankingsLayout,
        children: [
          {
            index: true,
            loader: () => redirect("/rankings/17"),
          },
          {
            path: ":id",
            element: <Rankings />,
          },
        ],
      },
      {
        path: "album/:id",
        element: <AlbumPage />,
      },
      {
        path: "artists",
        element: <ArtistsPage />,
      },
      {
        path: "artist/:id",
        element: <ArtistLayout />,
        children: [
          {
            index: true,
            element: <ArtistPage />,
          },
          {
            path: "album",
            element: <ArtistAlbumPage />,
          },
          {
            path: "info",
            element: <ArtistInfoPage />,
          },
          {
            path: "mv",
            element: <ArtistMVPage />,
          },
        ],
      },
      {
        path: "download",
        element: <DownloadPage />,
      },
      {
        path: "music/:id",
        element: <MusicPage />,
      },
      {
        path: "song-list",
        element: <SongListPage />,
      },
      {
        path: "like",
        element: <LikePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "search",
        element: <SearchLayout />,
        children: [
          {
            index: true,
            element: <SearchPage />,
          },
          {
            path: ":type",
            element: <SearchPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
