import Steps from './Steps'
import { useMemo, useState } from 'react'
import { ReactComponent as CreateLogo } from '../../assets/createDataset.svg'
import { ReactComponent as SelectDSLogo } from '../../assets/selectDataset.svg'
import SelectOmLogo from '../../assets/selectFeature.png'
import { ReactComponent as ConfigureLogo } from '../../assets/createDataset.svg'
import GlowButton from '../../ui/GlowButton'
import Select from '../../ui/Select'
import useSelect from '../../ui/utils/useSelect'

const testDatasets = [
  {
    id: 'krm-mtas-1',
    value: 'krm-mtas-1',
  },
  {
    id: 'krm-mtas-2',
    value: 'krm-mtas-2',
  },
  {
    id: 'ds-mts-07',
    value: 'ds-mts-07',
  },
  {
    id: 'rtk-crpj-0',
    value: 'rtk-crpj-0',
  },
]

const DatasetMaster = () => {
  const [page, setPage] = useState<number>(0)
  const baseDatasetModel = useSelect('')
  const activePage = useMemo(() => {
    switch (page) {
      case 0:
        return (
          <>
            <CreateLogo className={`h-56 mb-14 transform -translate-x-4`} />
            <h1 className='text-white '>Создание набора данных</h1>
            <GlowButton
              value={'Начать!'}
              type={'solid'}
              className='w-44 mt-10'
              onClick={() => setPage((v) => v + 1)}
            />
          </>
        )
      case 1:
        return (
          <>
            <SelectDSLogo className={`h-56 mb-14 transform -translate-x-4`} />
            <h1 className='text-white '>Выберите базовый набор</h1>
            <Select
              model={baseDatasetModel}
              options={testDatasets}
              className={'w-60 mt-12'}
              label={'Выберите набор...'}
            />
            <GlowButton
              value={'Далее...'}
              type={'solid'}
              className='w-44 mt-8'
              onClick={() => setPage((v) => v + 1)}
            />
          </>
        )
      case 2:
        return (
          <>
            <img
              src={SelectOmLogo}
              className={`h-56 mb-14 transform -translate-x-4`}
              alt={'Adding Om'}
            />
            <h1 className='text-white '>Выберите Om</h1>
            <Select
              model={baseDatasetModel}
              options={testDatasets}
              className={'w-60 mt-12'}
              label={'Выберите набор...'}
            />
            <GlowButton
              value={'Далее...'}
              type={'solid'}
              className='w-44 mt-8'
              onClick={() => setPage((v) => v + 1)}
            />
          </>
        )
    }
  }, [baseDatasetModel, page])
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
