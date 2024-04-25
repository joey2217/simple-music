import { createHashRouter, redirect } from 'react-router-dom'
import Layout from './layout'
import Error from './layout/Error'
import Home from './pages/home'
import Search, { searchLoader } from './pages/search'
import TopPage, { topLoader } from './pages/top'
import Artists, { artistsLoader } from './pages/artists'
import TopList, { topListLoader } from './pages/top/list'
import Artist, { artistLoader } from './pages/artist'
import ArtistSong, { artistSongLoader } from './pages/artist/song'
import ArtistAlbum, { artistAlbumLoader } from './pages/artist/album'
import Album, { albumLoader } from './pages/album'
import Song, { songLoader } from './pages/song'
import PlayListIndex, { playlistIndexLoader } from './pages/playlists'
import Playlist, { playlistLoader } from './pages/playlists/list'
import Download from './pages/download'
import PlaylistPage, { playlistPageLoader } from './pages/playlist'
import Settings  from './pages/settings'
import Like from './pages/like'
import Recent from './pages/recent'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: 'search',
        loader: searchLoader,
        element: <Search />,
        errorElement: <Error />,
      },
      {
        path: 'top',
        element: <TopPage />,
        loader: topLoader,
        errorElement: <Error />,
        children: [
          {
            index: true,
            loader: () => redirect('27553319'),
          },
          {
            path: ':id',
            loader: topListLoader,
            element: <TopList />,
          },
        ],
      },
      {
        path: 'artists/:type?/:area?',
        element: <Artists />,
        loader: artistsLoader,
        errorElement: <Error />,
      },
      {
        path: 'artist/:id',
        element: <Artist />,
        loader: artistLoader,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <ArtistSong />,
            loader: artistSongLoader,
            errorElement: <Error />,
          },
          {
            path: 'album',
            element: <ArtistAlbum />,
            loader: artistAlbumLoader,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: 'album/:id',
        element: <Album />,
        loader: albumLoader,
        errorElement: <Error />,
      },
      {
        path: 'song/:copyrightId',
        element: <Song />,
        loader: songLoader,
        errorElement: <Error />,
      },
      {
        path: 'playlists',
        element: <PlayListIndex />,
        loader: playlistIndexLoader,
        errorElement: <Error />,
        children: [
          {
            path: ':tagId?',
            element: <Playlist />,
            loader: playlistLoader,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: 'playlist/:playlistId',
        element: <PlaylistPage />,
        loader: playlistPageLoader,
        errorElement: <Error />,
      },
      {
        path: 'download',
        element: <Download />,
        errorElement: <Error />,
      },
      {
        path: 'settings',
        element: <Settings />,
        errorElement: <Error />,
      },
      {
        path: 'like',
        element: <Like />,
        errorElement: <Error />,
      },
      {
        path: 'recently-played',
        element: <Recent />,
        errorElement: <Error />,
      },
    ],
  },
])

export default router
