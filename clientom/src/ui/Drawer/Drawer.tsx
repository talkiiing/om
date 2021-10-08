import { useState } from 'react'
import { CogIcon, UserIcon } from '@heroicons/react/outline'

interface DrawerOptionProps {
  Icon: React.ElementType
  title: string
  badge?: string
  expanded?: boolean
}

const DrawerOption = (props: DrawerOptionProps) => {
  const { Icon, title } = props
  return (
    <div className='flex w-full h-12 items-center hover:bg-gray-600 space-x-3'>
      <div className='w-12 h-12 flex items-center justify-center'>
        <Icon className='w-6 h-6' />
      </div>
      {props.expanded ? <div className='cursor-pointer'>{title}</div> : null}
    </div>
  )
}

const menuOptions: DrawerOptionProps[] = [
  {
    Icon: UserIcon,
    title: 'User',
  },
  {
    Icon: CogIcon,
    title: 'Settings',
  },
]

const Drawer = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`${
        expanded ? 'w-80' : 'w-12'
      } drawer fixed top-16 left-0 h-[calc(100%-4rem)] bg-gray-700`}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className='flex flex-col items-start'>
        {menuOptions.map((v, i) => (
          <DrawerOption
            Icon={v.Icon}
            title={v.title}
            key={v.title}
            expanded={expanded}
          />
        ))}
      </div>
    </div>
  )
}
export default Drawer
