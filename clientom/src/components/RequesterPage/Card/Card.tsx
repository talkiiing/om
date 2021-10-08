import React, { useState } from 'react'
import EntityModel, { parseType } from '../../../models/entity.model'
import { BookOpenIcon, TrashIcon, XIcon } from '@heroicons/react/outline'

interface IEntityProps extends Partial<EntityModel> {}

interface ICardProps {
  entity: IEntityProps
  active?: boolean
  onClick?: CallableFunction
  className?: string
}

const Card = (props: ICardProps) => {
  const [side, setSide] = useState(true)

  return (
    <div
      className={`${props.className} w-full ring-1 ring-gray-100 h-24 bg-white
      relative rounded-md shadow-lg flex flex-col px-3 py-2 border-l-4 ${
        props.active ? 'border-green-400' : ''
      }`}
    >
      <div
        className={`top-0 left-0 w-full flex flex-col transition-opacity 
        duration-200 ${side ? '' : 'pointer-events-none opacity-0 '}`}
        onClick={() => setSide(false)}
      >
        <div className='text-gray-800 text-xl self-start text-left'>
          {props.entity.name}
        </div>
        {props.entity.type && (
          <div className='text-gray-600 text-sm self-end'>
            Тип: {parseType(props.entity.type)}
          </div>
        )}
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full grid grid-cols-3 
        transition-opacity duration-200
        justify-items-center bg-white ${
          side ? 'pointer-events-none opacity-0 scale-50' : ''
        }`}
      >
        <button
          className='text-gray-800 w-full h-full cursor-pointer 
        hover:bg-gray-50 active:bg-gray-100 focus:outline-none outline-none
        transition-all duration-200'
          onClick={() => setSide(true)}
        >
          <XIcon className='w-6 h-6 mx-auto' />
        </button>
        <button
          className='text-blue-400 w-full h-full cursor-pointer 
        hover:bg-gray-50 active:bg-gray-100 focus:outline-none outline-none
        transition-all duration-200'
        >
          <BookOpenIcon className='w-6 h-6 mx-auto' />
        </button>
        <button
          className='text-red-400 w-full h-full cursor-pointer 
        hover:bg-gray-50 active:bg-gray-100 focus:outline-none outline-none
        transition-all duration-200'
        >
          <TrashIcon className='w-6 h-6 mx-auto' />
        </button>
      </div>
    </div>
  )
}

export default Card
