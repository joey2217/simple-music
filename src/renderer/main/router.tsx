import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './layout/Error'
import Home from './pages/home'
import Search from './pages/search'
import About from './pages/about'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
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
    ],
  },
])

export default router
