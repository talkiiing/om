import React, { ReactElement, Ref } from 'react'
import { XIcon } from '@heroicons/react/outline'

interface IModalProps {
  onClose?: () => any
  className?: string
  children?: ReactElement[] | ReactElement
  title?: string | ReactElement
  specialActions?: ReactElement[] | ReactElement
  show: boolean
  bodyRef?: Ref<HTMLDivElement>
  handleRef?: Ref<HTMLDivElement>
}

const Window = (props: IModalProps) => {
  return (
    <>
      <div
        className={`_cover fixed top-0 left-0 h-screen w-screen bg-black 
      bg-opacity-10 z-full transition-all duration-200 px-6 py-2 flex flex-col items-center justify-center ${
        props.show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
        ref={props.bodyRef}
      >
        <div
          className="w-full max-w-3xl transform -translate-y-6 ring-1 ring-gray-100 px-5 py-3 rounded-lg shadow-xl
          bg-white "
        >
          <div
            className="w-full h-10 relative flex flex-row justify-between mb-2 pb-2 border-b-2 border-gray-200"
            ref={props.handleRef}
          >
            <div className="h-8 align-baseline py-1 px-1 text-gray-700 font-bold">
              {props.title && props.title}
            </div>
            <div className="actionHandler h-8 flex flex-row space-x-2">
              {props.specialActions && props.specialActions}
              <div
                className="w-12 h-8 px-3 py-1 flex flex-row items-center"
                onClick={() => props.onClose && props.onClose()}
              >
                <XIcon className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          </div>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  )
}

export default Window
