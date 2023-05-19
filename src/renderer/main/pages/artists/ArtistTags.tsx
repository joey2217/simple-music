import React, { memo } from 'react'
import { useRecoilState } from 'recoil'
import Tags from '../../components/Tags'
import { artistListParamsState } from './store'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LETTER_TAGS = [
  {
    label: '热门',
    value: '',
  },
]
  .concat(LETTERS.split('').map((s) => ({ label: s, value: s })))
  .concat({
    label: '#',
    value: '%23',
  })

const KIND_TAGS = [
  '全部',
  '华语男',
  '华语女',
  '华语组合',
  '日韩男',
  '日韩女',
  '日韩组合',
  '欧美男',
  '欧美女',
  '欧美组合',
  '其他',
].map((s, index) => ({ label: s, value: index }))

const ArtistTags: React.FC = () => {
  const [params, setParams] = useRecoilState(artistListParamsState)
  return (
    <div className="flex flex-col gap-2">
      <Tags
        defalutValue={params.prefix}
        options={LETTER_TAGS}
        onChange={(prefix) => setParams((p) => ({ ...p, prefix, page: 1 }))}
      />
      <Tags
        defalutValue={params.category}
        options={KIND_TAGS}
        onChange={(category) =>
          setParams((p) => ({ ...p, category: category, page: 1 }))
        }
      />
    </div>
  )
}

export default memo(ArtistTags)
