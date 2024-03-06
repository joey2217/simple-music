import React, { useEffect } from 'react'
import logo from '../assets/icon.png'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useApp } from '../context/AppContext'

const About: React.FC = () => {
  const { toast } = useToast()
  const { confirm } = useApp()

  useEffect(() => {
    console.log('##version##')
    console.table(window.argv.version)
  }, [])

  return (
    <div className="page text-center">
      <img src={logo} alt="logo" className="w-10 h-10 mx-auto" />
      <h2 className="text-xl font-semibold my-2">轻音乐</h2>
      <div className="my-2">
        <span>版本 : </span>
        <span>{window.argv.version}</span>
      </div>
      <div className="my-2 flex justify-center gap-4">
        <Button
          onClick={window.electronAPI.checkUpdate}
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
              'https://github.com/joey2217/simple-tv/releases'
            )
          }
        >
          手动下载
        </Button>
      </div>
      <div className="flex gap-4 justify-center">
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
        <Button
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up ',
              description: 'Friday, February 10, 2023 at 5:57 PM',
            })
          }}
        >
          toast
        </Button>
        <Button
          onClick={() => {
            confirm({
              title: 'Are you sure?',
              message: 'message',
            })
              .then(console.log)
              .catch(console.error)
          }}
        >
          confirm
        </Button>
      </div>
    </div>
  )
}

export default About
