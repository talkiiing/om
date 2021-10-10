import React, { useEffect, useState } from 'react'
import usePath from '../../ui/utils/usePath'

const Home = () => {
  const { go } = usePath()
  return (
    <div className='w-full h-full flex justify-center items-start py-10'>
      <div className='w-full max-w-3xl flex flex-col items-center justify-center py-3'>
        <p className='text-white text-[4rem] mt-12'>Приветствуем в Om</p>
        <p className='text-white mt-6 text-2xl'>
          Вы можете{' '}
          <span
            className='cursor-pointer text-omblue'
            onClick={() => go('/datasets')}
          >
            импортировать
          </span>{' '}
          датасет, или{' '}
          <span
            className='cursor-pointer text-omblue'
            onClick={() => go('/pipelines')}
          >
            создать новый
          </span>
        </p>
      </div>
    </div>
  )
}

export default Home
