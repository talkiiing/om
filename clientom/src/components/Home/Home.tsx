import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Footer from '../Footer/Footer'
import UserModel from '../../models/user.model'
import {
  DesktopComputerIcon,
  MinusIcon,
  QrcodeIcon,
} from '@heroicons/react/outline'
import useSelect from '../../ui/utils/useSelect'
import Select, { IOptionModel } from '../../ui/Select'
import useContextMenu from '../../ui/ContextMenu/useContextMenu'
import Window from '../../ui/Window/Window'
import { Motion, spring } from 'react-motion'
import ActionCard from '../../ui/ActionCard/ActionCard'
import List from '../../ui/ListSet/List'

export const EOptions: IOptionModel[] = [
  { id: 'one', value: 'One' },
  { id: 'two', value: 'Two' },
  { id: 'three', value: 'Three' },
  { id: 'four', value: 'Four' },
]

const Home = () => {
  const history = useHistory()

  const [user, setUser] = useState<UserModel>()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, [])

  const single = useSelect('')
  const multi = useSelect('', { multiselect: true })

  const menuInputs = useContextMenu({
    title: 'Menu',
    options: [
      { name: 'Dismiss' },
      { name: 'Log a number', action: () => console.log(1) },
      {
        title: 'Actions',
        options: [
          { name: 'Cut element', action: () => console.log('cut') },
          { name: 'Copy element', action: () => console.log('copy') },
          { name: 'Paste element', action: () => console.log('paste') },
        ],
      },
      {
        title: 'Files',
        options: [
          { name: 'Open...', action: () => alert('Opening?') },
          { name: 'Delete...', action: () => alert('Deleting...') },
        ],
      },
      {
        name: 'Exit',
        action: () => console.log('exit'),
        className: 'text-red-400',
      },
    ],
  })

  // @ts-ignore
  return (
    <>
      <div className='pt-2 pl-12'>
        <List/>
      </div>
      <div className='hidden grid grid-flow-row justify-items-center pt-10 gap-y-4'>
        <Logo className='mb-2 w-32 select-none' />
        <p className='my-2 text-center'>Template React App от /talkiiing</p>
        <Button
          icon={() => <QrcodeIcon className='w-6 h-6' />}
          value={'Запросы'}
          className='text-blue-500 transform'
        />
        <Select
          options={EOptions as unknown as IOptionModel[]}
          model={single}
          label={'Single'}
          className='w-full text-left'
          required={false}
          {...menuInputs.inject}
        />
        <Select
          options={EOptions as unknown as IOptionModel[]}
          model={multi}
          label={'Multi'}
          className='w-44 text-left'
          required={false}
          {...menuInputs.inject}
        />
        <ActionCard
          title={'Заголовок ебанутый'}
          content={'Не менее ебанутый контент'}
          action={'*тык*'}
          onClick={() => console.log('Bip-Bup')}
        />
        {menuInputs.contextMenu}
      </div>
    </>
  )
}

export default Home
