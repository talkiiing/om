// @ts-nocheck
import { useDropzone } from 'react-dropzone'
import { DownloadIcon } from '@heroicons/react/outline'

import List from '../../ui/ListSet/List'
import useInput from '../../ui/utils/useInput'
import useDebounce from '../../ui/utils/useDebounce'
import { useCallback, useEffect, useMemo } from 'react'
import { app } from '../../services/feathers/feathers'
import useCached from '../../ui/utils/useCached'
import { IOptionModel } from '../../ui/Select'

const Dropzone = (props) => {
  const { onDrop } = props

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className='w-full h-full'>
      <div {...getRootProps({ className: 'flex justify-center items-center' })}>
        <input {...getInputProps()} />
        <div className='flex flex-col items-center gap-4'>
          <DownloadIcon className='w-20 h-20 text-[#8D8D8D]' />
          <p className='text-[#8D8D8D]'>
            Перетащите сюда ваши данные в формате json или csv
          </p>
        </div>
      </div>
    </div>
  )
}

const Datasets = () => {
  const fetcher = useCallback(() => app.service('datasets').find(), [])

  const { data: datasets } = useCached('datasets', fetcher)

  const preparedDatasets = useMemo(() => {
    return datasets ? datasets.map((v) => ({ name: v.name, _id: v._id })) : []
  }, [datasets])

  return (
    <div
      className='w-full h-full py-8 px-16
      flex flex-col items-center justify-between'
    >
      <div className='w-full flex flex-col items-center gap-6'>
        <p className='text-white text-3xl'>Загрузите свой набор данных</p>
        <div className='bg-omgray w-full rounded-2xl p-8 h-48'>
          <Dropzone onDrop={(files) => console.log(files)} />
        </div>
      </div>

      <div className='w-full flex flex-col items-center gap-6 mt-6'>
        <h2 className='text-white text-3xl'>Или выберите готовый</h2>
        <List className='w-full' elements={preparedDatasets || []} />
      </div>
    </div>
  )
}

export default Datasets
