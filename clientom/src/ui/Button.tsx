import React, { ReactElement } from 'react'

interface IButtonProps {
  value?: string
  icon?: () => ReactElement
  onClick?: () => any
  className?: string
  disabled?: boolean
}

const Button = (props: IButtonProps) => {
  return (
    <button
      className={`
         ${
           props.disabled
             ? 'shadow-sm bg-gray-800 pointer-events-none opacity-50'
             : ''
         } ${props.className} w-full px-4 py-3 shadow-md rounded-lg bg-gray-700 
    hover:shadow-sm hover:bg-gray-800 active:bg-gray-900 text-gray-200
    focus:bg-gray-100 focus:shadow-sm flex items-center justify-center select-none 
    outline-none focus:outline-none transition-all duration-100 z-10`}
      onClick={(e) => props.onClick && props.onClick()}
    >
      <div className="flex flex-row justify-center space-x-2">
        {props.icon && <div>{props.icon()}</div>}
        {props.value && <div>{props.value || ''}</div>}
      </div>
    </button>
  )
}

export default Button
