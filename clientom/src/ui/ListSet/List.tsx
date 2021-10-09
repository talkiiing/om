import { CogIcon } from '@heroicons/react/outline'

interface ListElemOptionProps {
  title: string
}

const ListElem = (props: ListElemOptionProps) => {
  const { title } = props
  return (
    <div className='flex w-full items-center justify-between bg-omgray2 shadow-md rounded-md py-4 pl-6 pr-4 hover:bg-omblack'>
      <h3 className='text-omwhite text-2xl cursor-pointer'>{title}</h3>

      <div className='flex items-center justify-center'>
        <CogIcon className='w-6 h-6 text-omwhite' />
      </div>
    </div>
  )
}

const menuOptions: ListElemOptionProps[] = [
  {
    title: 'Dataset Info',
  },
  {
    title: 'Billing Methods',
  },
]

const List = () => {
  return (
    <div className='bg-omgray min-w-80 w-1/3 rounded-2xl p-3 space-y-2'>
      <h3 className='text-omwhite text-xl pl-3 pt-1'>Lists</h3>
      <div className='flex flex-col items-start gap-4'>
        {menuOptions.map((v, i) => (
          <ListElem title={v.title} key={v.title} />
        ))}
      </div>
    </div>
  )
}

export default List
