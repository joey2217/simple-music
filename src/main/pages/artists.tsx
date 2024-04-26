import React, { useMemo, useState } from 'react'
import {
  useLoaderData,
  type LoaderFunction,
  Link,
  NavLink,
  redirect,
} from 'react-router-dom'
import { fetchArtistList } from '../api/migu'
import type { ArtistContent, ArtistType, ArtistArea } from '../types/migu'
import LazyImage from '../components/LazyLoadImage'
import { Option } from '../types'

export const artistsLoader: LoaderFunction = async ({ params }) => {
  const { type, area } = params
  if (type === undefined || area === undefined) {
    return redirect('/artists/nan/huayu')
  }
  return fetchArtistList(type, area).then((data) => ({
    data,
    type,
    area,
  }))
}

const TYPES: Option<string, ArtistType>[] = [
  {
    label: '男歌手',
    value: 'nan',
  },
  {
    label: '女歌手',
    value: 'nv',
  },
  {
    label: '组合',
    value: 'group',
  },
]
const AREAS: Option<string, ArtistArea>[] = [
  {
    label: '华语',
    value: 'huayu',
  },
  {
    label: '欧美',
    value: 'oumei',
  },
  {
    label: '日韩',
    value: 'rihan',
  },
]

const Artists: React.FC = () => {
  const { data, type, area } = useLoaderData() as {
    data: ArtistContent[]
    type: ArtistType
    area: ArtistArea
  }
  const [keyword, setKeyword] = useState('')

  const filterList = useMemo(() => {
    if (keyword !== '') {
      return data.filter((item) => item.txt.includes(keyword))
    }
    return data
  }, [data, keyword])

  return (
    <div className="page">
      <div className="flex items-center gap-10 mb-4 px-2">
        <h1 className="font-semibold text-lg">歌手</h1>
        <div>
          {TYPES.map(({ label, value }) => (
            <NavLink
              to={`/artists/${value}/${area}`}
              key={value}
              className="nav-link"
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div>
          {AREAS.map(({ label, value }) => (
            <NavLink
              to={`/artists/${type}/${value}`}
              key={value}
              className="nav-link"
            >
              {label}
            </NavLink>
          ))}
        </div>
        <label className="input input-bordered input-sm flex items-center gap-2 ml-auto">
          <input
            className="grow"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="筛选歌手"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="grid gap-2 grid-cols-12">
        {filterList.map((a, i) => (
          <Link
            to={`/artist/${a.resId}`}
            key={a.viewId + i}
            className="flex flex-col items-center gap-2"
          >
            <LazyImage
              src={a.img}
              alt={a.txt}
              className="w-16 h-16 rounded-lg"
              placeholderSrc="https://d.musicapp.migu.cn/prod/file-service/file-down/bcb5ddaf77828caee4eddc172edaa105/5ee9d2cf3f59411a217e83e6c8f691fd/d877668fc78107df5a67758ebd282674"
            />
            <div className="truncate w-full text-center">{a.txt}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Artists
