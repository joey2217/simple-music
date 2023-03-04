import React, { memo, useCallback } from 'react'
import { Button, Space, Table } from 'antd'
import { FolderOpenOutlined, SettingOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { DownloadItem } from '../../types'
import { useDownloadList } from '../../store/hooks'
import { showItemInFolder, openPath, showOpenDialog } from '../../utils/ipc'

const Download: React.FC = () => {
  const { downloadList, downloadPath, setDownloadPath } = useDownloadList()

  const showSetDownloadPath = useCallback(() => {
    showOpenDialog({
      title: '设置下载目录',
      defaultPath: downloadPath,
      properties: ['openDirectory'],
    }).then(({ filePaths }) => {
      if (filePaths[0]) {
        setDownloadPath(filePaths[0])
      }
    })
  }, [downloadPath, setDownloadPath])

  const columns: ColumnsType<DownloadItem> = [
    {
      title: '#',
      key: 'rid',
      width: 40,
      align: 'center',
      render(value, record, index) {
        return index + 1
      },
    },
    {
      title: '操作',
      key: 'rid',
      width: 100,
      align: 'center',
      dataIndex: 'id',
      render(value, record, index) {
        return (
          <Space>
            <FolderOpenOutlined
              className="cursor-pointer text-base"
              title="打开下载目录"
              onClick={() => showItemInFolder(record.path)}
            />
          </Space>
        )
      },
    },
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'rid',
    },
    {
      title: '歌手',
      dataIndex: 'artist',
      key: 'rid',
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'rid',
    },
  ]
  return (
    <div>
      <div>
        <Space>
          <span>存储目录 : {downloadPath}</span>
          <Button
            type="link"
            icon={<FolderOpenOutlined />}
            onClick={() => openPath(downloadPath)}
          >
            打开下载目录
          </Button>
          <Button
            type="link"
            icon={<SettingOutlined />}
            onClick={showSetDownloadPath}
          >
            设置下载目录
          </Button>
        </Space>
      </div>
      <Table
        size="middle"
        scroll={{ y: 'calc(100vh - 416px)' }}
        columns={columns}
        dataSource={downloadList}
        pagination={false}
      />
    </div>
  )
}

export default memo(Download)
