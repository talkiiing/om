import { ChevronRightIcon } from '@heroicons/react/outline'
import DatasetModel from '../../models/dataset.model'

interface ListElemOptionProps extends Partial<DatasetModel> {
  onClick?: () => void
}

const ListElem = (props: ListElemOptionProps) => {
  const { name } = props
  return (
    <div
      className='flex w-full items-center justify-between bg-omgray2 shadow-md rounded-md py-4 pl-6 pr-4 hover:bg-omblack cursor-pointer'
      onClick={() =>
        window.open(`https://om.s.ix3.space/download/datasets/${props._id}`)
      }
    >
      <h3 className='text-omwhite text-2xl'>{name}</h3>

      <div className='flex items-center justify-center'>
        <ChevronRightIcon className='w-6 h-6 text-omwhite' />
      </div>
    </div>
  )
}

interface ListProps {
  elements: Partial<DatasetModel>[]
  className: string
}

const List = (props: ListProps) => {
  const { elements, className } = props

  return (
    <div className={className}>
      <div className='h-full w-full bg-omgray min-w-80 rounded-2xl p-3 space-y-2'>
        <div className='h-full flex flex-col items-start gap-4'>
          {elements.map((v, i) => (
            <ListElem name={v.name} _id={v._id} key={v._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default List
