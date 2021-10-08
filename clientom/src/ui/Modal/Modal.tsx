import React, { ReactElement } from 'react'
import { XIcon } from '@heroicons/react/outline'

interface IModalProps {
  onClose?: () => any
  className?: string
  children?: ReactElement
  show: boolean
}

const Modal = (props: IModalProps) => {
  return (
    <>
      <div
        className={`_cover fixed top-0 left-0 h-screen w-screen bg-black 
      bg-opacity-10 z-full transition-all duration-200 px-6 py-2 flex flex-col items-center justify-center ${
        props.show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      >
        <div className="w-full max-w-3xl transform -translate-y-6">
          <div className="w-full h-8 flex flex-row justify-end mb-3">
            <div
              className="w-12 h-8 px-3 py-1 bg-white bg-opacity-20 rounded-lg"
              onClick={() => props.onClose && props.onClose()}
            >
              <XIcon className="w-6 h-6 text-gray-800" />
            </div>
          </div>
          <div
            className="w-full ring-1 ring-gray-100 px-5 py-3 rounded-lg shadow-xl
          bg-white"
          >
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
