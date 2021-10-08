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

  const [modal, setModal] = useState(false)

  // @ts-ignore
  return (
    <>
      <div className='grid grid-flow-row justify-items-center pt-10 gap-y-4'>
        <Logo className='mb-2 w-32 select-none' />
        <p className='my-2 text-center'>Template React App от /talkiiing</p>
        <Button
          icon={() => <QrcodeIcon className='w-6 h-6' />}
          value={'Запросы'}
          className='text-blue-500 transform'
          onClick={() =>
            //history.push(buildRoute(['requester']))
            setModal(true)
          }
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
        <Window
          show={modal}
          title={
            <div>
              <span>Content Box</span>
              <span
                className='font-light text-sm underline ml-4'
                onClick={() => console.log('Yes, I am')}
              >
                Clickable in title
              </span>
            </div>
          }
          specialActions={[
            <div
              className='w-12 h-8 px-3 py-1 flex flex-row items-center'
              onClick={() => console.log('minimize')}
            >
              <MinusIcon className='w-6 h-6 text-gray-600' />
            </div>,

            <div
              className='w-12 h-8 px-3 py-1 flex flex-row items-center'
              onClick={() => console.log('minimize')}
            >
              <DesktopComputerIcon className='w-5 h-5 text-gray-600' />
            </div>,
          ]}
          onClose={() => setModal(false)}
        >
          <div className='w-full bg-green-400'>Content</div>
          <div className='w-full bg-green-400'>Content</div>
          <div className='w-full bg-green-400'>Content</div>
          <div className='w-full bg-green-400'>Content</div>
        </Window>
        {menuInputs.contextMenu}
      </div>
      <Footer options={['settings', 'quit']} />
    </>
  )
}

export default Home
