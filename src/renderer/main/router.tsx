import { createHashRouter, redirect } from 'react-router-dom'
import Layout from './layout'
import Error from './layout/Error'
import Home from './pages/home'
import Search from './pages/search'
import About from './pages/about'
import TopPage from './pages/top'
import Artists, { artistsLoader } from './pages/artists'
import TopList, { topListLoader } from './pages/top/list'
import Artist, { artistLoader } from './pages/artist'
import ArtistSong, { artistSongLoader } from './pages/artist/song'

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
            loader: () => redirect('song'),
          },
          {
            path: 'song/:page?',
            element: <ArtistSong />,
            loader: artistSongLoader,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
])

export default router
