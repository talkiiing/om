import { CogIcon } from '@heroicons/react/outline'

interface ListElemOptionProps {
  Icon: React.ElementType
  title: string
}

const ListElem = (props: ListElemOptionProps) => {
  const { Icon, title } = props
  return (
    <div className='flex w-full items-center justify-between bg-omgray2 shadow-md rounded-md py-4 pl-6 pr-4 hover:bg-omblack'>
      <h3 className='text-omwhite text-2xl cursor-pointer'>{title}</h3>

      <div className='flex items-center justify-center'>
        <Icon className='w-6 h-6 text-omwhite' />
      </div>
    </div>
  )
}

const menuOptions: ListElemOptionProps[] = [
  {
    Icon: CogIcon,
    title: 'Dataset Info',
  },
  {
    Icon: CogIcon,
    title: 'Billing Methods',
  },
]

const List = () => {
  return (
    <div className='bg-omgray min-w-80 w-1/3 h-full rounded-2xl p-3 space-y-2'>
      <h3 className='text-omwhite text-xl pl-3 pt-1'>Lists</h3>
      <div className='flex flex-col items-start gap-4'>
        {menuOptions.map((v, i) => (
          <ListElem Icon={v.Icon} title={v.title} key={v.title} />
        ))}
      </div>
    </div>
  )
}

export default List
