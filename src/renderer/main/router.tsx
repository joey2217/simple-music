import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorPage from './pages/error'
import Rankings from './pages/rankings'
import Search from './pages/search'
import Setting from './pages/setting'
import Download from './pages/download'
import SongList from './pages/song-list'
import Singers from './pages/singers'
import Singer from './pages/singers/singer'

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
      },
    ],
  },
])

export default router
