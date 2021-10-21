import React, { useEffect, useState } from 'react'
import usePath from '../../ui/utils/usePath'
import { dispatchMessage } from '../../thru-tab'
import { requestData } from '../../thru-tab/wrappers/requestData'
import useCached from '../../ui/utils/useCached'
import crypto from 'crypto'

const listener = (event: MessageEvent) => {
  console.log('catched on Home', event.data)
}

const Home = () => {
  /*useEffect(() => {
    console.log('new value is', localforage.getItem('clicks_on_im'))
  }, [localforage])*/

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', listener)
    return () =>
      navigator.serviceWorker.removeEventListener('message', listener)
  }, [])

  const { data: cachedData, setData: setCached } = useCached('someKeyToGet')

  const { go } = usePath()
  return (
    <div className='w-full h-full flex justify-center items-start py-10'>
      <div className='w-full max-w-3xl flex flex-col items-center justify-center py-3 text-white text-2xl'>
        <p className='text-white text-[4rem] mt-12'>Приветствуем в Om</p>
        <p
          className='cursor-pointer text-omblue'
          onClick={async () => {
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
              requestData({
                requestKey: 'someKeyToGet',
              })
                .then((r) => console.log('resolved with result', r))
                .catch((e) => console.log('Cathed error with ', e))
              console.log('updated')
            }
          }}
        >
          отправить запрос
        </p>
        <p
          className='cursor-pointer text-omblue'
          onClick={() => {
            setCached('Hello from tab ' + crypto.randomBytes(5).toString('hex'))
          }}
        >
          обновить значение
        </p>
        <p
          className='cursor-pointer text-omblue'
          onClick={() => {
            console.log(cachedData)
          }}
        >
          вывести значение
        </p>
      </div>
    </div>
  )
}

export default Home
