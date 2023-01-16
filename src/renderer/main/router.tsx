import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorPage from './pages/error'
import Rankings from './pages/rankings'
import Search from './pages/search'
import Setting from './pages/setting'
import SongList from './pages/song-list'

const router = createBrowserRouter([
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
    ],
  },
])

export default router
