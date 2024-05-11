import React, { useState, type PropsWithChildren, useEffect } from 'react'
import { downloadDir, setLocalDownloadDir } from '../store/download'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import logo from '../assets/icon.png'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useLocalStorage from '../hooks/useLocalStorage'
import { UpdateType } from '../types'
import { autoUpdate, setLocalAutoUpdate } from '../utils/app'

interface SettingsCardProps {
  title: string
}

const SettingsCard: React.FC<PropsWithChildren<SettingsCardProps>> = ({
  title,
  children,
}) => {
  return (
    <section className="p-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {title}
      </h4>
      <div>{children}</div>
    </section>
  )
}

interface SettingsItemProps {
  label: string
  id?: string
}

const SettingsItem: React.FC<PropsWithChildren<SettingsItemProps>> = ({
  children,
  label,
  id,
}) => (
  <div className="flex items-center space-x-2">
    <Label htmlFor={id}>{label}</Label>
    <div>{children}</div>
  </div>
)
const Download: React.FC = () => {
  const [dir, setDir] = useState(downloadDir)

  useEffect(() => {
    setLocalDownloadDir(dir)
  }, [dir])

  const changeDir = () => {
    window.electronAPI
      .showOpenDialog({
        title: '选择下载目录',
        properties: ['openDirectory'],
      })
      .then(({ filePaths }) => {
        const [filePath] = filePaths
        if (filePath) {
          setDir(filePath)
        }
      })
  }

  return (
    <SettingsCard title="下载">
      <SettingsItem label="下载目录">
        <Button
          title="打开目录"
          variant="link"
          onClick={() => window.electronAPI.openPath(dir)}
        >
          {dir}
        </Button>
        <Button variant="secondary" onClick={changeDir}>
          更改目录
        </Button>
      </SettingsItem>
    </SettingsCard>
  )
}

const About: React.FC = () => {
  const [update, setUpdate] = useState(autoUpdate)

  const setAutoUpdate = (val: UpdateType) => {
    setUpdate(val)
    setLocalAutoUpdate(val)
  }

  return (
    <SettingsCard title="关于">
      <div className="text-center w-80">
        <img src={logo} alt="logo" className="w-10 h-10 mx-auto" />
        <h4>轻音乐</h4>
        <div className="my-2">
          <span>版本 : </span>
          <span>{window.argv.version}</span>
        </div>
        <RadioGroup
          defaultValue={update}
          onValueChange={setAutoUpdate}
          className="flex mb-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="auto" id="auto" />
            <Label htmlFor="auto">自动更新</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hint" id="hint" />
            <Label htmlFor="hint">有新版本提醒我</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual">手动更新</Label>
          </div>
        </RadioGroup>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => window.electronAPI.checkUpdate('manual')}
            variant="secondary"
            size="sm"
          >
            检测更新
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.electronAPI.openExternal(
                'https://github.com/joey2217/simple-music/releases'
              )
            }
          >
            手动下载
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.devAPI.toggleDevtools()}
          >
            切换开发者工具
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              window.electronAPI.openExternal(
                'https://github.com/joey2217/simple-tv/issues'
              )
            }
          >
            反馈BUG
          </Button>
        </div>
      </div>
    </SettingsCard>
  )
}

const Settings: React.FC = () => {
  useEffect(() => {
    console.log('##argv##')
    console.table(window.argv)
  }, [])

  return (
    <div className="page">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        设置
      </h2>
      <Download />
      <About />
    </div>
  )
}

export default Settings
