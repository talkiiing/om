import { CogIcon } from '@heroicons/react/outline'

interface ListElemOptionProps {
  Icon: React.ElementType
  title: string
}

const ListElem = (props: ListElemOptionProps) => {
  const { Icon, title } = props
  return (
    <div className='flex w-full items-center justify-between bg-omgray2 shadow-md rounded-md my-2 px-2 hover:bg-omblack'>
      <h3 className='text-omwhite'>{title}</h3>

      <div className='w-12 h-12 flex items-center justify-center'>
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
    <div className='bg-omgray max-w-xs h-screen rounded-2xl p-3 space-y-2'>
      <h3 className='text-omwhite text-xl pl-3 pt-1'>Lists</h3>
      <div className='flex flex-col items-start'>
        {menuOptions.map((v, i) => (
          <ListElem Icon={v.Icon} title={v.title} key={v.title} />
        ))}
      </div>
    </div>
  )
}

export default List
