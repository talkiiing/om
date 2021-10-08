import { Transition } from '@headlessui/react'
import { forwardRef, Fragment, Ref, useCallback, useMemo } from 'react'

export interface ContextMenuOffset {
  x: number
  y: number
}

export interface ContextMenuOption {
  icon?: string | Element
  name: string
  action?: CallableFunction
  className?: string
}

export interface ContextMenuOptionSet {
  title?: string
  options: (ContextMenuOption | ContextMenuOptionSet)[]
}

export interface ContextMenuProps {
  title?: string
  options: (ContextMenuOption | ContextMenuOptionSet)[]
  offset?: ContextMenuOffset
  onBlur?: CallableFunction
  show: boolean
}

const ContextMenu = forwardRef(
  (props: ContextMenuProps, nodeRef: Ref<HTMLDivElement>) => {
    const menuBuilder = useCallback(
      (options: ContextMenuProps['options']) =>
        options.map((v, i) =>
          'name' in v ? (
            <div
              key={i}
              className={`${v.className ? v.className : ''} 
            dark:hover:text-gray-100 dark:hover:bg-gray-900 dark:active:bg-gray-900 
              dark:text-gray-300
            hover:text-blue-600 hover:bg-blue-100 active:bg-blue-200 
              text-gray-900 cursor-pointer select-none relative py-2 w-full
              pl-8 pr-4`}
              onClick={() => {
                v.action && v.action()
                props.onBlur && props.onBlur()
              }}
            >
              {v.name}
            </div>
          ) : (
            <div
              key={`section${i}`}
              className="border-t border-b dark:border-gray-900 border-gray-100"
            >
              {v.title && (
                <div
                  key={`sectiontitle${i}`}
                  className={
                    'font-bold pl-4 pr-4 ' +
                    'dark:text-gray-500 text-gray-400 cursor-default select-none relative py-1 '
                  }
                >
                  {v.title}
                </div>
              )}
              {menuBuilder(v.options)}
            </div>
          )
        ),
      []
    )

    const computedMenu = useMemo(
      () => menuBuilder(props.options),
      [props.options]
    )

    return (
      <Transition
        as={'div'}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={props.show}
        style={{
          left: props.offset?.x,
          top: props.offset?.y,
        }}
        className="w-44 absolute inline-block text-left z-full"
      >
        <div
          className="relative w-full py-0.5 mt-1 overflow-auto text-base
          dark:bg-gray-800 bg-white dark:ring-gray-600 rounded-md shadow-lg max-h-88 ring-1 ring-gray-200
          focus:outline-none sm:text-sm overflow-hidden"
          onContextMenu={(e) => e.preventDefault()}
          ref={nodeRef}
        >
          {props.title && (
            <div
              className={
                'font-bold pl-4 pr-4 ' +
                'dark:text-gray-500 text-gray-400 cursor-default select-none relative py-1 '
              }
            >
              {props.title}
            </div>
          )}
          {computedMenu}
        </div>
      </Transition>
    )
  }
)

export default ContextMenu
