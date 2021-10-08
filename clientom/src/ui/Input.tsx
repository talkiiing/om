import React, { useEffect, useState } from 'react'
import { IUseInput } from './utils/useInput'

interface IInputProps<T> {
  onKeyPress?: () => void
  onFocusOut?: () => any
  model: IUseInput<T>
  className?: string
  label?: string
  id?: string
  type?: 'text' | 'email' | 'password' | undefined
}

function Input<T = string>(props: IInputProps<T>) {
  const [labelState, setLabelState] = useState<boolean>(false)
  const [focus, setFocus] = useState(false)

  const handleChanges = (focusState: boolean) => {
    if ((props.model.value as unknown as string) === '') {
      setLabelState(focusState)
    } else {
      setLabelState(true)
    }
  }

  useEffect(() => handleChanges(focus), [focus, props.model.value])

  const handleAutoFill = (e: any) => {
    setLabelState(e.animationName === 'onAutoFillStart')
  }

  return (
    <div
      className={`${props.className} w-full ring-1 dark:ring-gray-900 ring-gray-100 
      relative rounded-md flex flex-col`}
    >
      <input
        id={props.id || ''}
        type={props.type ? props.type : 'text'}
        onAnimationStart={handleAutoFill}
        className={`w-full px-4 text rounded-md 
        dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-900 dark:focus:bg-gray-900
        bg-gray-50 hover:bg-gray-100 focus:bg-gray-100
           outline-none focus:outline-none 
           transition-all duration-100 ${props.label ? 'pt-5 pb-1.5' : 'py-3'}`}
        // @ts-ignore
        value={props.model.bind.value}
        onChange={props.model.bind.onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false)
          props.onFocusOut && props.onFocusOut()
        }}
        onKeyPress={
          props.onKeyPress &&
          ((e) => props.onKeyPress && e.key === 'Enter' && props.onKeyPress())
        }
      />
      {props.label && (
        <label
          className={`transform text-gray-400 transition-all duration-50 
          absolute mx-4 pointer-events-none 
          select-none ${labelState ? 'text-xs mt-1.5' : 'text mt-3'}`}
        >
          {props.label}
        </label>
      )}
    </div>
  )
}

export default Input
