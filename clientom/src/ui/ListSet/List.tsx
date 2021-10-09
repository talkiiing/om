import { ChevronRightIcon } from '@heroicons/react/outline'

interface ListElemOptionProps {
  text: string
  onClick?: () => void
}

const ListElem = (props: ListElemOptionProps) => {
  const { text } = props
  return (
    <div className='flex w-full items-center justify-between bg-omgray2 shadow-md rounded-md py-4 pl-6 pr-4 hover:bg-omblack cursor-pointer'>
      <h3 className='text-omwhite text-2xl'>{text}</h3>

      <div className='flex items-center justify-center'>
        <ChevronRightIcon className='w-6 h-6 text-omwhite' />
      </div>
    </div>
  )
}

interface ListProps {
  elements: ListElemOptionProps[]
  className: string
}

const List = (props: ListProps) => {
  const { elements, className } = props

  return (
    <div className={ className }>
      <div className='h-full w-full bg-omgray min-w-80 rounded-2xl p-3 space-y-2'>
        <div className='h-full flex flex-col items-start gap-4'>
          {elements.map((v, i) => (
            <ListElem text={v.text} key={v.text} />
          ))} 
        </div>
      </div>
    </div>
  )
}

export default List
