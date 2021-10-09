import React, { useEffect, useMemo, useState } from 'react'
import {
  DatabaseIcon,
  CodeIcon,
  MapIcon,
} from '@heroicons/react/outline'
import useQuery from '../utils/useQuery'
import usePath from '../utils/usePath'

interface DrawerOptionProps {
  Icon: React.ElementType
  title: string
  badge?: string
  expanded?: boolean
  onClick?: CallableFunction
}

const DrawerOption = (props: DrawerOptionProps) => {
  const { Icon, title } = props
  return (
    <div
      className='flex w-full h-12 items-center hover:bg-gray-600 space-x-3 text-gray-50'
      onClick={() => props.onClick && props.onClick()}
    >
      <div className='!w-12 h-12 p-3'>
        <Icon className='w-6 h-6' />
      </div>
      <div className={`${props.expanded ? 'opacity-100' : 'opacity-0'} text`}>
        {title}
      </div>
    </div>
  )
}

const Drawer = () => {
  const [expanded, setExpanded] = useState(false)

  const [mouseOn, setMouseOn] = useState(false)

  const { query, queryPush, queryPatch } = useQuery()

  const { go } = usePath()

  useEffect(() => {
    console.log(query.toString())
  }, [query])

  const menuOptions: DrawerOptionProps[] = useMemo(
    () => [
      {
        Icon: DatabaseIcon,
        title: 'Наборы данных',
        onClick: () => go('/datasets'),
      },
      {
        Icon: CodeIcon,
        title: 'Om-ы',
        onClick: () => go('/oms'),
      },
      {
        Icon: MapIcon,
        title: 'Мои пайплайны',
        onClick: () => go('/pipelines'),
      },
    ],
    [queryPatch, queryPush],
  )

  useEffect(() => {
    if (mouseOn) {
      return () => setExpanded(false)
    } else {
      return () => setExpanded(true)
    }
  }, [mouseOn])

  return (
    <div
      className={`${
        expanded ? 'w-60' : 'w-12'
      } transition-all duration-100 drawer fixed top-16 left-0 h-[calc(100%-4rem)] bg-gray-700 overflow-x-hidden`}
      onMouseEnter={() => setMouseOn(true)}
      onMouseLeave={() => setMouseOn(false)}
    >
      <div className='flex flex-col items-start'>
        {menuOptions.map((v, i) => (
          <DrawerOption
            Icon={v.Icon}
            title={v.title}
            key={v.title}
            expanded={expanded}
            onClick={v.onClick}
          />
        ))}
      </div>
    </div>
  )
}
export default Drawer
