import Steps from './Steps'
import { useEffect, useMemo, useState } from 'react'
import { ReactComponent as CreateLogo } from '../../assets/createDataset.svg'
import { ReactComponent as SelectDSLogo } from '../../assets/selectDataset.svg'
import { ReactComponent as FinishCreating } from '../../assets/finishCreating.svg'
import SelectOmLogo from '../../assets/selectFeature.png'
import GlowButton from '../../ui/GlowButton'
import Select, { IOptionModel } from '../../ui/Select'
import useSelect from '../../ui/utils/useSelect'
import useCached from '../../ui/utils/useCached'
import { app } from '../../services/feathers/feathers'
import DatasetModel from '../../models/dataset.model'
import OmModel from '../../models/om.model'
import Input from '../../ui/Input'
import useInput, { IUseInput } from '../../ui/utils/useInput'
import usePath from '../../ui/utils/usePath'
import PipelineModel from '../../models/pipeline.model'

interface TemplateOm {
  feature: string
  meta: Record<string, string>
}

const DatasetMaster = () => {
  const [page, setPage] = useState<number>(0)
  const baseDatasetModel = useSelect('')
  const firstOmModel = useSelect('')

  const { go } = usePath()

  const { data: datasets, forceFetch: datasetRefetch } = useCached<
    DatasetModel[]
  >('datasets', () => app.service('datasets').find())

  const preparedDatasets = useMemo((): IOptionModel[] => {
    return datasets ? datasets.map((v) => ({ id: v._id, value: v.name })) : []
  }, [datasets])

  const { data: oms } = useCached<OmModel[]>('oms', () =>
    app.service('features').find(),
  )

  const { forceFetch: pipelinesFetch } = useCached<PipelineModel[]>(
    'pipelines',
    () => app.service('pipelines').find(),
  )

  const preparedOms = useMemo((): IOptionModel[] => {
    return oms ? oms.map((v) => ({ id: v._id, value: v.name })) : []
  }, [oms])

  const _omParam1 = useInput('')
  const _omParam2 = useInput('')
  const _omParam3 = useInput('')

  const omParams = useMemo(
    (): IUseInput<string>[] => [_omParam1, _omParam2, _omParam3],
    [_omParam1, _omParam2, _omParam3],
  )

  /*
steps: [
  {
    feature: objectId,
    meta: {
      expr: value
      ...
    }
  }
]
   */

  const selectedOm = useMemo(() => {
    return oms ? oms.find((v) => v._id === firstOmModel.value[0]) : undefined
  }, [firstOmModel.value, oms])

  const selectedOmMetas = useMemo(() => {
    return selectedOm?.meta?.map((v, i) => (
      <Input model={omParams[i]} label={`${v.description}: ${v.name}`} />
    ))
  }, [firstOmModel.value, omParams, oms])

  const [omCollection, setOmCollection] = useState<TemplateOm[]>([])

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
              options={preparedDatasets}
              className={'w-60 mt-12'}
              label={'Выберите набор...'}
            />
            <GlowButton
              value={'Далее...'}
              type={'solid'}
              className='w-44 mt-8'
              onClick={() => setPage((v) => v + 1)}
              disabled={!baseDatasetModel.computed}
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
              model={firstOmModel}
              options={preparedOms}
              className={'w-60 mt-12'}
              label={'Выберите Om...'}
            />
            <GlowButton
              value={'Далее...'}
              type={'solid'}
              className='w-44 mt-8'
              onClick={() => setPage((v) => v + 1)}
              disabled={!firstOmModel.computed}
            />
          </>
        )
      case 3:
        return (
          <>
            <img
              src={SelectOmLogo}
              className={`h-56 mb-14 transform -translate-x-4`}
              alt={'Configuring Om'}
            />
            <h1 className='text-white '>Настройка Om'а</h1>
            <div className='w-full flex flex-col space-y-3 mt-12'>
              {selectedOmMetas}
            </div>
            <GlowButton
              value={'Далее...'}
              type={'solid'}
              className='w-44 mt-8'
              onClick={() => {
                setPage((v) => v + 1)
                if (selectedOm) {
                  setOmCollection((c) => [
                    ...c,
                    {
                      feature: firstOmModel.computed,
                      meta: selectedOm.meta.reduce(
                        (a, v, i) => ({ ...a, [v.name]: omParams[i].value }),
                        {},
                      ),
                    },
                  ])
                }
              }}
              disabled={!firstOmModel.computed}
            />
          </>
        )
      case 4:
        return (
          <>
            <FinishCreating
              className={`h-56 py-6 mb-14 transform -translate-x-4`}
            />
            <h1 className='text-white'>Настройка успешно применена</h1>
            <div className='w-full flex flex-row space-x-3 items-center justify-center'>
              <GlowButton
                value={'Продолжить'}
                type={'outline'}
                className='w-44 mt-8'
                onClick={() => {
                  firstOmModel.reset()
                  omParams.forEach((v) => v.reset())
                  setPage((v) => 2)
                }}
                disabled={!firstOmModel.computed}
              />
              <GlowButton
                value={'Завершить настройку'}
                type={'solid'}
                className='w-60 mt-8'
                onClick={async () => {
                  const date = new Date().toLocaleString()
                  const pipeline: PipelineModel = await app
                    .service('pipelines')
                    .create({
                      initialDataset: baseDatasetModel.computed,
                      steps: omCollection,
                      name: `Pipeline-[${baseDatasetModel.computed}]-${date}`,
                    })
                  await app.service('datasets').create({
                    name: `Dataset-from-pl[${date}]`,
                    pipeline: pipeline._id,
                  })
                  await pipelinesFetch()
                  await datasetRefetch()
                  go('/pipelines')
                }}
                disabled={!firstOmModel.computed}
              />
            </div>
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
