import { useCallback, useEffect, useMemo, useState } from 'react'
import useInput from '../../ui/utils/useInput'

import { ChevronRightIcon } from '@heroicons/react/outline'
import Input from '../../ui/Input'
import useCached from '../../ui/utils/useCached'
import useDebounce from '../../ui/utils/useDebounce'
import { app } from '../../services/feathers/feathers'
import OmModel from '../../models/om.model'

interface OmProps {
  om: OmModel
}

const OmItem = (props: OmProps) => {
  const { om } = props

  return (
    <div
      className='bg-omgray2 rounded-2xl p-6 flex flex-row
    justify-between items-center hover:bg-omgray cursor-pointer'
      onClick={() =>
        window.open(`https://om.s.ix3.space/download/features/${om._id}`)
      }
    >
      <div>
        <h3 className='text-white text-2xl'>{om.name}</h3>
        <p className='text-white'>{om.description}</p>
      </div>
      <ChevronRightIcon className='text-white w-8 h-8' />
    </div>
  )
}

const Oms = () => {
  const searchModel = useInput('')
  const debSearch = useDebounce(searchModel.value, 300)

  const fetcher = useCallback(() => app.service('features').find(), [])

  const { data: oms } = useCached('oms', fetcher)

  const data = useMemo(
    () =>
      debSearch
        ? oms.filter(
            (v: OmModel) =>
              v.name.toLowerCase().includes(debSearch.toLowerCase()) ||
              v.description.toLowerCase().includes(debSearch.toLowerCase()),
          )
        : oms,
    [debSearch, oms],
  )

  return (
    <div
      className='w-full h-full py-8 px-16
      flex flex-col items-center'
    >
      <p className='text-white w-full text-left px-10 text-[4rem] font-semibold'>
        Om Market
      </p>
      <div className='flex flex-col gap-6 w-full items-center px-10 mt-[20%]'>
        <div className='w-full'>
          <Input model={searchModel} label='Найти' />
        </div>
        <div className='w-full grid gap-6 grid-cols-3'>
          {data && data.length ? (
            data.map((o: any) => <OmItem om={o} key={o.name} />)
          ) : (
            <h3 className='text-white px-2 py-3'>Ничего не найдено :(</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default Oms
