import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { RoundClose } from '../icons'

function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
  footer,
}: {
  children: ReactNode
  closeOnClickOutside: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus()
    }
  }, [])

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose()
      }
    }
    if (modalRef.current !== null) {
      modalOverlayElement = modalRef.current?.parentElement
      if (modalOverlayElement !== null) {
        modalOverlayElement?.addEventListener('click', clickOutsideHandler)
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler)
      }
    }
  }, [closeOnClickOutside, onClose])

  return (
    <div
      className="fixed h-full w-full overflow-hidden top-0 bottom-0 left-0 right-0 bg-black/50 grow-0 shrink z-50"
      role="dialog"
    >
      <div
        className="min-h-[100px] min-w-[300px] mt-[10vh] w-fit ml-auto mr-auto flex grow-0 bg-white dark:bg-neutral-900 flex-col relative shadow-lg rounded-xl"
        ref={modalRef}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-50/50">
          <h2 className="font-bold">{title}</h2>
          <button aria-label="Close modal" type="button" onClick={onClose}>
            <RoundClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">{children}</div>
        {footer != null && (
          <div className="p-4 border-t border-slate-50/50">{footer}</div>
        )}
      </div>
    </div>
  )
}

export default function Modal({
  open,
  onClose,
  children,
  title,
  closeOnClickOutside = true,
  footer,
}: {
  open: boolean
  children: ReactNode
  closeOnClickOutside?: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
}) {
  if (open) {
    return createPortal(
      <PortalImpl
        onClose={onClose}
        title={title}
        closeOnClickOutside={closeOnClickOutside}
        footer={footer}
      >
        {children}
      </PortalImpl>,
      document.body
    )
  }
  return null
}
