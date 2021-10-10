import { Route, Switch, useRouteMatch, Link } from 'react-router-dom'
import DatasetMaster from '../../components/DatasetMaster/DatasetMaster'
import GlowButton from '../../ui/GlowButton'
import usePath from '../../ui/utils/usePath'
import Input from '../../ui/Input'
import useInput from '../../ui/utils/useInput'
import useDebounce from '../../ui/utils/useDebounce'
import { useCallback, useMemo } from 'react'
import { app } from '../../services/feathers/feathers'
import useCached from '../../ui/utils/useCached'
import { ChevronRightIcon } from '@heroicons/react/outline'
import PipelineModel from '../../models/pipeline.model'

const Pipe = (props: { model: any }) => {
  return (
    <div
      className='bg-omgray2 rounded-2xl p-6 flex flex-row cursor-pointer
    justify-between items-center w-full hover:bg-omgray select-none'
      onClick={() =>
        window.open(
          `https://om.s.ix3.space/download/pipelines/${props.model._id}`,
        )
      }
    >
      <div>
        <h3 className='text-white text-2xl'>{props.model.name}</h3>
        <p className='text-white'>{props.model.description}</p>
      </div>
      <ChevronRightIcon className='text-white w-8 h-8' />
    </div>
  )
}

const Pipelines = () => {
  let { path, url } = useRouteMatch()

  const { go } = usePath()

  const searchModel = useInput('')
  const debSearch = useDebounce(searchModel.value, 300)

  const fetcher = useCallback(() => app.service('pipelines').find(), [])

  const { data: pipelines } = useCached('pipelines', fetcher)

  const data = useMemo(
    () =>
      debSearch
        ? pipelines.filter(
            (v: PipelineModel) =>
              (v.name &&
                v.name.toLowerCase().includes(debSearch.toLowerCase())) ||
              (v.description &&
                v.description.toLowerCase().includes(debSearch.toLowerCase())),
          )
        : pipelines,
    [debSearch, pipelines],
  )

  return (
    <Switch>
      <Route exact path={path}>
        <div className='w-full h-full flex justify-center items-start py-10'>
          <div className='w-full max-w-3xl flex flex-col items-center justify-center py-3'>
            <div className='w-full flex items-center justify-between space-x-3'>
              <GlowButton
                value={'Добавить пайп'}
                onClick={() => go(`${url}/add`)}
                type={'solid'}
                className='w-44 flex-shrink-0 h-12'
              />
              <Input
                model={searchModel}
                label={'Поиск пайпа'}
                className='flex-grow'
              />
            </div>
            <div className='flex flex-col items-start justify-start gap-6 text-white mt-6 w-full'>
              {data && data.length ? (
                data.map((v: any, i: number) => (
                  <Pipe model={v} key={v.name || i} />
                ))
              ) : (
                <h3 className='text-white px-2 py-3'>Ничего не найдено :(</h3>
              )}
            </div>
          </div>
        </div>
      </Route>
      <Route path={`${path}/add`}>
        <div className='w-full h-full flex items-center justify-center'>
          <DatasetMaster />
        </div>
      </Route>
    </Switch>
  )
}

export default Pipelines
