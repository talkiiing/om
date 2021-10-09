import React, { ReactElement } from 'react'

interface IButtonProps {
  value?: string
  icon?: () => ReactElement
  onClick?: () => any
  className?: string
  disabled?: boolean
  type?: 'solid' | 'outline' | 'text'
}

const GlowButton = (props: IButtonProps) => {
  return (
    <button
      className={`
         ${props.disabled ? 'shadow-sm pointer-events-none opacity-50' : ''} ${
        props.className
      } ${
        !props.type || props.type === 'solid'
          ? 'bg-omblue-500 hover:bg-omblue-600 active:bg-omblue-700 focus:bg-omblue-700'
          : props.type === 'outline'
          ? 'ring-2 ring-omblue-500 hover:ring-omblue-600 active:ring-omblue-700 focus:ring-omblue-700'
          : ''
      } w-full px-4 py-2 shadow-md rounded-lg hover:shadow-sm text-gray-200
    focus:shadow-sm flex items-center justify-center select-none font-semibold
    outline-none focus:outline-none transition-all duration-100 z-10`}
      onClick={(e) => props.onClick && props.onClick()}
    >
      <div className='flex flex-row justify-center space-x-2'>
        {props.icon && <div>{props.icon()}</div>}
        {props.value && <div>{props.value || ''}</div>}
      </div>
    </button>
  )
}

export default GlowButton
