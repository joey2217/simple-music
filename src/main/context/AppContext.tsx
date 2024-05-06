import React, {
  useState,
  type PropsWithChildren,
  useCallback,
  useEffect,
} from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPrimitiveCancel,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDownloadListStore } from '../store/download'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DialogContentData {
  open: boolean
  title: string
  message: string
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
}

interface AppContextProps {
  confirm: (
    config: Omit<DialogContentData, 'resolve' | 'reject' | 'open'>
  ) => Promise<unknown>
}

const AppContext = React.createContext<AppContextProps>({
  confirm: () => Promise.resolve(),
})

export function useApp() {
  return React.useContext(AppContext)
}

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const updateDownloadItem = useDownloadListStore((s) => s.updateDownloadItem)

  const [dialogConfig, setDialogConfig] = useState<DialogContentData>({
    open: false,
    title: '',
    message: '',
    resolve: () => {},
    reject: () => {},
  })

  const confirm = useCallback(
    (config: Omit<DialogContentData, 'resolve' | 'reject' | 'open'>) =>
      new Promise<unknown>((resolve, reject) => {
        setDialogConfig({
          ...config,
          open: true,
          resolve,
          reject,
        })
      }).finally(() => {
        setDialogConfig((c) => ({ ...c, open: false }))
      }),
    []
  )

  useEffect(() => {
    const removeListener = window.messageAPI.onUpdateDownload((info) => {
      updateDownloadItem(info)
    })
    return removeListener
  }, [updateDownloadItem])

  return (
    <AppContext.Provider
      value={{
        confirm,
      }}
    >
      {children}
      <AlertDialog
        open={dialogConfig.open}
        onOpenChange={(open) => setDialogConfig((c) => ({ ...c, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <AlertDialogTitle>{dialogConfig.title}</AlertDialogTitle>
              <AlertDialogPrimitiveCancel onClick={dialogConfig.reject}>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <X />
                </Button>
              </AlertDialogPrimitiveCancel>
            </div>
            <AlertDialogDescription>
              {dialogConfig.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={dialogConfig.reject}>
              取 消
            </AlertDialogCancel>
            <AlertDialogAction onClick={dialogConfig.resolve}>
              确 定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppContext.Provider>
  )
}
