import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './layout/Error'
import Home from './pages/home'
import Search, { searchLoader } from './pages/search'
import About from './pages/about'
import TopPage from './pages/top'
import Artists, { artistsLoader } from './pages/artists'
import TopList, { topListLoader } from './pages/top/list'
import Artist, { artistLoader } from './pages/artist'
import ArtistSong, { artistSongLoader } from './pages/artist/song'
import ArtistAlbum, { artistAlbumLoader } from './pages/artist/album'
import Album, { albumLoader } from './pages/album'
import Song, { songLoader } from './pages/song'
import PlayListIndex, { playlistIndexLoader } from './pages/playlist'
import Playlist, { playlistLoader } from './pages/playlist/list'

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
        path: 'about',
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: 'top',
        element: <TopPage />,
        errorElement: <Error />,
        children: [
          {
            path: ':id',
            loader: topListLoader,
            element: <TopList />,
          },
        ],
      },
      {
        path: 'artists/:type/:area',
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
        path: 'playlist',
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
    ],
  },
])

export default router
