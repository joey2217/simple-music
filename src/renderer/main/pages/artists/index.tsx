import React, { memo, useMemo } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import ArtistTags from './ArtistTags'
import { artistListParamsState, artistListState } from './store'
import { LoadingIcon } from '../../components/icons'
import ArtistCard from '../../components/ArtistCard'
import Pagination from '../../components/Pagination'

const Artists: React.FC = () => {
  const artistListLoadable = useRecoilValueLoadable(artistListState)
  const [params, setParams] = useRecoilState(artistListParamsState)

  const artistList = useMemo(() => {
    switch (artistListLoadable.state) {
      case 'hasValue':
        const { list, total } = artistListLoadable.contents
        return (
          <div>
            <div className="my-4 grid grid-cols-4 sm:col-span-4 md:grid-cols-6 lg:col-span-8 xl:col-span-10 gap-2 md:gap-4">
              {list.map((a) => (
                <ArtistCard key={a.id} artist={a} />
              ))}
            </div>
            <div>
              <Pagination
                total={total}
                current={params.pn}
                size={60}
                hideOnSinglePage
                onChange={(page) => setParams((p) => ({ ...p, pn: page }))}
              />
            </div>
          </div>
        )
      case 'loading':
        return (
          <div className="h-screen flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return null
    }
  }, [
    artistListLoadable.contents,
    artistListLoadable.state,
    params.pn,
    setParams,
  ])
  return (
    <div>
      <ArtistTags />
      {artistList}
    </div>
  )
}

export default memo(Artists)
