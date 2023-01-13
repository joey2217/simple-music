import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
// import ErrorPage from './pages/error'
import Search from './pages/search'
import Setting from './pages/setting'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Search />,
        // errorElement: <ErrorPage />,
      },
      {
        path: 'setting',
        element: <Setting />,
        // errorElement: <ErrorPage />,
      },
    ],
  },
])

export default router
