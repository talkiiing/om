import ContextMenu, { ContextMenuProps } from './ContextMenu'
import { useMemo, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

const preparePositions = (event: MouseEvent) => {
  return {
    x: event.clientX - 20,
    y: event.clientY - 30,
  }
}

const useContextMenu = (
  contextMenuSettings: Omit<ContextMenuProps, 'show' | 'nodeRef'>
) => {
  const [positions, setPositions] = useState<any>()
  const [show, setShow] = useState<boolean>(false)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  useClickAway(contextMenuRef, () => {
    setShow(false)
  })

  const contextMenu = useMemo(() => {
    return (
      <ContextMenu
        {...contextMenuSettings}
        onBlur={() => setShow(false)}
        offset={positions}
        ref={contextMenuRef}
        show={show}
      />
    )
  }, [contextMenuSettings, positions])

  return {
    inject: {
      onContextMenu: (e: MouseEvent) => {
        e.preventDefault()
        setPositions(preparePositions(e))
        setShow(true)
      },
    },
    contextMenu,
  }
}

export default useContextMenu
