import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import Select, { IOptionModel } from '../../ui/Select'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import {
  EAnimationTypes,
  EColorSchemes,
  setOptions,
  SettingsModel,
} from '../../store/settings/settings'
import Modal from '../../ui/Modal/Modal'
import useSelect from '../../ui/utils/useSelect'

const Settings = () => {
  const [changesSettings, setChangesSettings] = useState(false)

  const options = useSelector(
    (state: { settings: SettingsModel }) => state.settings.options
  )
  const dispatch = useDispatch()

  const animation = useSelect('')
  const colorScheme = useSelect('')

  const [showModal, setModal] = useState(false)

  useEffect(() => {
    // Settings
    animation.setValue([options.animationType])
    colorScheme.setValue([options.colorScheme])
  }, [])

  useEffect(() => {
    if (
      options.animationType !== animation.computed ||
      options.colorScheme !== colorScheme.computed
    ) {
      setChangesSettings(true)
    } else {
      setChangesSettings(false)
    }
  }, [
    animation.computed,
    colorScheme.computed,
    options.animationType,
    options.colorScheme,
  ])

  const saveSettings = () => {
    if (changesSettings) {
      dispatch(
        setOptions({
          animationType: animation.computed,
          colorScheme: colorScheme.computed,
        })
      )
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-4 mx-auto items-center text-center">
        <h1 className="text-center mt-10 mb-2 w-full">Настройки</h1>
        <h2 className="text-center my-2 w-full">Общие</h2>
        <Select
          options={EAnimationTypes as unknown as IOptionModel[]}
          model={animation}
          label={'Тип анимации перехода'}
          className="w-full text-left"
          required={true}
        />
        <Select
          options={EColorSchemes as unknown as IOptionModel[]}
          model={colorScheme}
          label={'Цветовая схема'}
          className="w-full text-left"
          required={true}
        />
        <Button
          value="Сохранить"
          className="text-blue-500"
          onClick={() => saveSettings()}
          disabled={!changesSettings}
        />
        <Footer options={['back']} />
      </div>

      <Modal show={showModal} onClose={() => setModal(false)}>
        <div className="w-full h-76 flex flex-col space-y-2 text-left">
          <h2 className="text-center">Привет!</h2>
          <p>
            Мы заметили что Вы предпочли Telegram, возможно потому, что мы еще
            учимся уведомлять Вас здесь. В любом случае - вы в надежных руках!
          </p>
          <p>Мы советуем прямо сейчас подключиться к боту!</p>
          <p className="text-center">
            Ссылка:{' '}
            <a href={'https://t.me/planka_notify_bot'}>@planka_notify_bot</a>
          </p>
          <p className="text-sm text-gray-600">
            Помните, что только здесь находится официальный бот, все остальное
            может быть подделкой!
          </p>
        </div>
      </Modal>
    </>
  )
}

export default Settings
