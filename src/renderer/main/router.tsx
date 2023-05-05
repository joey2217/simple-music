import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './pages/error'
import Home from './pages/home'
import RankingList from './pages/ranking'
import Artists from './pages/artists'
import Artist from './pages/artist'
import Song from './pages/artist/song'
import Album from './pages/artist/album'
import Mv from './pages/artist/mv'
import Info from './pages/artist/info'
import SongList from './pages/song-list'
import SongListDetail from './pages/song-list/detail'
import MvPage from './pages/mv'
import MvDetail from './pages/mv/detail'
import Like from './pages/like'
import LikeMusic from './pages/like/music'
import LikeArtist from './pages/like/artist'
import Music from './pages/music'
import AlbumPage from './pages/album'
import Search from './pages/search'
import SearchSong from './pages/search/song'
import SearchAlbum from './pages/search/album'
import SearchArtist from './pages/search/artist'
import SearchMv from './pages/search/mv'
import SearchSongList from './pages/search/song-list'
import Download from './pages/download'
import Setting from './pages/setting'
import About from './pages/setting/about'

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
        path: 'ranking',
        element: <RankingList />,
        errorElement: <Error />,
      },
      {
        path: 'artists',
        element: <Artists />,
        errorElement: <Error />,
      },
      {
        path: 'song-list',
        element: <SongList />,
        errorElement: <Error />,
      },
      {
        path: 'song-list/detail/:id',
        element: <SongListDetail />,
        errorElement: <Error />,
      },
      {
        path: 'mv',
        element: <MvPage />,
        errorElement: <Error />,
      },
      {
        path: 'mv/detail/:id',
        element: <MvDetail />,
        errorElement: <Error />,
      },
      {
        path: 'artist/:id',
        element: <Artist />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Song />,
            errorElement: <Error />,
          },
          {
            path: 'album',
            element: <Album />,
            errorElement: <Error />,
          },
          {
            path: 'mv',
            element: <Mv />,
            errorElement: <Error />,
          },
          {
            path: 'info',
            element: <Info />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: 'music/:id',
        element: <Music />,
        errorElement: <Error />,
      },
      {
        path: 'album/:id',
        element: <AlbumPage />,
        errorElement: <Error />,
      },
      {
        path: 'search',
        element: <Search />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <SearchSong />,
            errorElement: <Error />,
          },
          {
            path: 'album',
            element: <SearchAlbum />,
            errorElement: <Error />,
          },
          {
            path: 'artist',
            element: <SearchArtist />,
            errorElement: <Error />,
          },
          {
            path: 'mv',
            element: <SearchMv />,
            errorElement: <Error />,
          },
          {
            path: 'song-list',
            element: <SearchSongList />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: 'like',
        element: <Like />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <LikeMusic />,
            errorElement: <Error />,
          },
          {
            path: 'artist',
            element: <LikeArtist />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: 'download',
        element: <Download />,
        errorElement: <Error />,
      },
      {
        path: 'setting',
        element: <Setting />,
        errorElement: <Error />,
        children: [
          {
            path: 'about',
            element: <About />,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
])

export default router
