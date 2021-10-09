import Steps from './Steps'
import { useMemo, useState } from 'react'
import { ReactComponent as Logo } from '../../assets/createDataset.svg'
import GlowButton from '../../ui/GlowButton'

const DatasetMaster = () => {
  const [page, setPage] = useState<number>(0)
  const activePage = useMemo(() => {
    switch (page) {
      case 0:
        return (
          <>
            <Logo className={`h-56 mb-14 transform -translate-x-4`} />
            <h1 className='text-white '>Создание набора данных</h1>
            <GlowButton
              value={'Поехали!'}
              className='w-44 mt-10'
              onClick={() => setPage((v) => v + 1)}
            />
          </>
        )
    }
  }, [page])
  return (
    <div className='w-full max-w-2xl h-full py-20'>
      <div className='h-full ring-0 ring-gray-500 rounded-2xl w-full relative py-2 px-4 flex flex-col items-center'>
        {activePage}
        <Steps
          total={5}
          current={page}
          onSelect={(selected) => setPage(selected)}
          className='w-4/5 absolute bottom-4'
        />
      </div>
    </div>
  )
}

export default DatasetMaster
