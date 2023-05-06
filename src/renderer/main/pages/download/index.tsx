import React, { memo, useState } from 'react'
import { useDownload, useMusicLikes, usePlaylist } from '../../store/hooks'
import {
  FluentAdd,
  FluentDelete,
  FluentHeart,
  FolderOpen,
  PlayOutline,
} from '../../components/icons'
import { Link } from 'react-router-dom'
import type { DownloadMusic, DownloadStatus } from '../../types'
import Modal from '../../components/Modal'

let current: DownloadMusic
let index = -1

const STATUS_MAP: {
  [prop in DownloadStatus]: { title: string; className: string }
} = {
  downloading: {
    title: '下载中',
    className: 'text-blue-500',
  },
  success: {
    title: '下载完成',
    className: 'text-green-500',
  },
  failed: {
    title: '下载失败',
    className: 'text-rose-500',
  },
}

const Download: React.FC = () => {
  const {
    downloadPath,
    openDownloadPath,
    selectDownloadPath,
    downloadList,
    removeDownloadMusic,
  } = useDownload()
  const { playNow, addPlaylist } = usePlaylist()
  const { musicLikeIds, addLikeMusic, removeLikeMusic } = useMusicLikes()

  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  const openDownloadMusicPath = (m: DownloadMusic) => {
    window.electronAPI.showItemInFolder(m.downloadPath)
  }

  const onRemoveItem = (i: number, m: DownloadMusic) => {
    index = i
    current = m
    setOpen(true)
    // setChecked(false)
  }

  const confirmRemoveDownload = () => {
    removeDownloadMusic(index, current, checked)
    setOpen(false)
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="label">下载路径</div>
        <div>{downloadPath}</div>
        <button className="defalut-btn" onClick={openDownloadPath}>
          打开
        </button>
        <button className="primary-btn" onClick={selectDownloadPath}>
          更改目录
        </button>
      </div>
      <table className="min-w-full divide-y-2 divide-gray-200 text-base dark:divide-gray-700">
        <thead>
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">操作</th>
            <th className="text-left py-2 w-14"></th>
            <th className="text-left py-2">歌曲</th>
            <th className="text-left py-2">歌手</th>
            <th className="text-left py-2">专辑</th>
            <th className="text-left py-2">状态</th>
            <th className="text-left py-2">时长</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {downloadList.map((m, index) => (
            <tr key={m.rid}>
              <td className="w-10 text-center">
                <div>{index + 1}</div>
              </td>
              <td className="w-24">
                <div className="flex gap-2 justify-center w-full">
                  <button
                    title="播放"
                    onClick={() => playNow(m)}
                    className="hover:text-indigo-600"
                  >
                    <PlayOutline />
                  </button>
                  <button
                    title="添加"
                    onClick={() => addPlaylist(m)}
                    className="hover:text-indigo-600"
                  >
                    <FluentAdd />
                  </button>
                  {musicLikeIds.includes(m.rid) ? (
                    <button
                      title="取消喜欢"
                      onClick={() => removeLikeMusic(m)}
                      className="text-red-400"
                    >
                      <FluentHeart />
                    </button>
                  ) : (
                    <button
                      title="喜欢"
                      onClick={() => addLikeMusic(m)}
                      className="text-neutral-400"
                    >
                      <FluentHeart />
                    </button>
                  )}
                  {m.status === 'success' && (
                    <>
                      <button
                        title="打开目录"
                        onClick={() => openDownloadMusicPath(m)}
                        className="hover:text-indigo-600"
                      >
                        <FolderOpen />
                      </button>
                      <button
                        title="删除"
                        onClick={() => onRemoveItem(index, m)}
                        className="hover:text-indigo-600"
                      >
                        <FluentDelete />
                      </button>
                    </>
                  )}
                </div>
              </td>
              <td className="py-2">
                <div>
                  <img
                    src={m.pic120}
                    alt={m.name}
                    className="w-12 aspect-square"
                  />
                </div>
              </td>
              <td>
                <Link to={'/music/' + m.rid}>
                  <span>{m.name}</span>
                </Link>
              </td>
              <td className="text-secondary">
                <Link to={'/artist/' + m.artistid}>{m.artist}</Link>
              </td>
              <td className="text-secondary">
                <Link to={'/album/' + m.albumid}>{m.album}</Link>
              </td>
              <td>
                <div className={`${STATUS_MAP[m.status].className}`}>
                  {STATUS_MAP[m.status].title}
                </div>
              </td>
              <td className="text-center text-secondary w-12">
                <div className="w-12">{m.songTimeMinutes}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="删除下载歌曲"
        footer={
          <div className="flex items-center justify-end gap-4">
            <button className="primary-btn" onClick={confirmRemoveDownload}>
              确认
            </button>
            <button className="defalut-btn" onClick={() => setOpen(false)}>
              取消
            </button>
          </div>
        }
      >
        <div className="text-base font-semibold py-2">确认删除所选歌曲?</div>
        <div>
          <label
            htmlFor="file"
            className="inline-flex items-center gap-1 text-amber-400"
          >
            <input
              type="checkbox"
              name="file"
              id="file"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>同时删除本地文件</span>
          </label>
        </div>
      </Modal>
    </div>
  )
}

export default memo(Download)
