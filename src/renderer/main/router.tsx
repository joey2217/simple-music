import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorPage from './pages/error'
import Rankings from './pages/rankings'
import Search from './pages/search'
import Setting from './pages/setting'
import Download from './pages/download'
import SongList from './pages/song-list'
import Singers from './pages/singers'
import Singer from './pages/singer'
import Song from './pages/singer/song'
import Album from './pages/singer/album'
import Mv from './pages/singer/mv'
import Info from './pages/singer/info'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Rankings />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'search',
        element: <Search />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'setting',
        element: <Setting />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'song-list',
        element: <SongList />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'rankings',
        element: <Rankings />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'download',
        element: <Download />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'singers',
        element: <Singers />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'singer/:singerId',
        element: <Singer />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Song />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'album',
            element: <Album />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'mv',
            element: <Mv />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'info',
            element: <Info />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
])

export default router
