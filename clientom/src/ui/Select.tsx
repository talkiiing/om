import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IUseSelect } from './utils/useSelect'
import { useClickAway } from 'react-use'

export interface IOptionModel {
  id: string
  value: string
}

interface ISelectProps {
  model: IUseSelect
  className?: string
  label?: string
  options: IOptionModel[]
  required?: boolean
  onContextMenu?: CallableFunction
}

interface IOptionProps {
  id?: string
  value?: string
  onClick: () => any
  className?: string
  checked?: boolean
}

const SelectOption = (props: IOptionProps) => {
  return (
    <div
      className={`${props.className} 
      px-4 py-3 transition-all duration-100 cursor-pointer select-none outline-none 
      dark:hover:bg-gray-900 dark:active:bg-gray-900 dark:focus:bg-gray-900
       hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:bg-gray-100`}
      onClick={() => props.onClick()}
    >
      <div className="flex flex-row justify-between items-center">
        <div>{props.value || props.id || ''}</div>
        {props.checked !== undefined && (
          <div
            className={`${
              props.checked ? 'border-0 dark:bg-gray-300 bg-blue-600' : 'border-2'
            } w-4 h-4 rounded-full border-gray-500 leading-2`}
          />
        )}
      </div>
    </div>
  )
}

const Select = (props: ISelectProps) => {
  const [labelState, setLabelState] = useState<boolean>(false)
  const [layPaper, setLayPaper] = useState<boolean>(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const processEntity = useCallback(
    (id) => {
      props.model.bind.setValue(
        props.model.multiselect
          ? props.model.bind.value.includes(id)
            ? props.model.bind.value.filter((v) => v !== id)
            : [...props.model.bind.value, id]
          : [id]
      )
    },
    [props.model.bind, props.model.multiselect]
  )
  const resetModel = useCallback(() => props.model.reset(), [props.model])
  const getOptionClickFunctionBasedOnMulti = useCallback(
    (id) => () => {
      processEntity(id)
      !props.model.multiselect && toggleForced(false)
    },
    [processEntity, props.model.multiselect]
  )

  useEffect(() => {
    setSelectedOptions(props.model.bind.value)
  }, [props.model.bind.value])

  useEffect(() => {
    setLabelState(!!selectedOptions.length)
  }, [selectedOptions.length])

  const textInterpretedValue = useMemo(
    () =>
      props.options
        .reduce(
          (acc, v) =>
            selectedOptions.includes(v.id) ? [...acc, v.value] : acc,
          [] as string[]
        )
        .join(', '),
    [props.options, selectedOptions]
  )

  const toggleForced = useCallback((forceValue: boolean) => {
    setLayPaper(forceValue)
  }, [])

  useClickAway(props.model.bind.nodeRef, () => {
    toggleForced(false)
  })

  return (
    <>
      <div
        className={`${props.className} relative`}
        onContextMenu={(e) => {
          props.onContextMenu && props.onContextMenu(e)
        }}
      >
        <div
          className={`w-full paper ring-1 dark:ring-gray-900 ring-gray-100 
      relative rounded-md flex flex-col`}
        >
          {props.label && (
            <label
              className={`transform text-gray-400 transition-all duration-50 
          absolute mx-4 pointer-events-none 
          select-none ${labelState ? 'text-xs mt-1.5' : 'text mt-3'}`}
            >
              {props.label}
            </label>
          )}
          <div
            className={`w-full paper h-12 px-4 text rounded-md 
            dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-900 dark:focus:bg-gray-900
            bg-gray-50 hover:bg-gray-100 focus:bg-gray-100
           outline-none focus:outline-none cursor-pointer
           transition-all duration-100 truncate ${props.label ? 'pt-5 pb-1.5' : 'py-3'}`}
            onClick={() => toggleForced(true)}
          >
            {textInterpretedValue}
          </div>
        </div>
        <div
          className={`paper w-full shadow-xl absolute rounded-md 
          dark:bg-gray-800 dark:ring-gray-900
           bg-white
      ring-1 ring-gray-200 overflow-hidden transition-all duration-100 z-full
       ${layPaper ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'} ${
            selectedOptions.length ? '-mt-18' : '-mt-12'
          }`}

          ref={props.model.bind.nodeRef}
        >
          <div
            className={`${
              selectedOptions.length
                ? 'h-6 opacity-100 py-1'
                : 'h-0 opacity-0 py-0'
            } text-xs overflow-hidden px-3 
            dark:text-gray-200 dark:bg-gray-900
            text-gray-600 bg-gray-100 select-none
             transition-all duration-100`}
            key={'label'}
          >
            {props.label || 'OldSelect one'}
            {!props.required && (
              <span
                className={'ml-4 underline cursor-pointer'}
                onClick={() => resetModel()}
              >
                Очистить
              </span>
            )}
          </div>
          {selectedOptions.length ? (
            <>
              <SelectOption
                id={'__selected'}
                key={'__selected'}
                value={textInterpretedValue}
                onClick={() => toggleForced(false)}
                className={'dark:text-gray-50 text-blue-600'}
              />
            </>
          ) : (
            <SelectOption
              id={''}
              key={'__not_selected'}
              value={props.label || 'OldSelect one'}
              onClick={() => toggleForced(false)}
              className={'text-gray-400'}
            />
          )}
          {props.options.map(
            (v, i) =>
              (props.model.multiselect || !selectedOptions.includes(v.id)) && (
                <SelectOption
                  id={v.id}
                  key={v.id}
                  value={v.value}
                  onClick={getOptionClickFunctionBasedOnMulti(v.id)}
                  checked={
                    props.model.multiselect
                      ? selectedOptions.includes(v.id)
                      : undefined
                  }
                  className="dark:text-gray-200 text-gray-800"
                />
              )
          )}
        </div>
      </div>
    </>
  )
}

export default Select
