import React from 'react'
import useCached from '../../ui/utils/useCached'
import crypto from 'crypto'
import { useSharedData } from '../../tash/react'

const Home = () => {
  const { requestData, syncData } = useSharedData()

  const { data: cachedData, setData: setCached } = useCached('someKeyToGet')

  return (
    <div className='w-full h-full flex justify-center items-start py-10'>
      <div className='w-full max-w-3xl flex flex-col items-center justify-center py-3 text-white text-2xl'>
        <p
          className='cursor-pointer text-omblue'
          onClick={async () => {
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
              requestData('someKeyToGet', 5000)
                .then((r) => {
                  console.log('resolved with result', r)
                  setCached(r)
                })
                .catch((e) => console.log('Error while getting info ', e))
            }
          }}
        >
          отправить запрос
        </p>
        <p
          className='cursor-pointer text-omblue'
          onClick={async () => {
            syncData('someKeyToGet', cachedData)
          }}
        >
          сихронизировать
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
        <p className='text-white'>{cachedData}</p>
      </div>
    </div>
  )
}

export default Home
