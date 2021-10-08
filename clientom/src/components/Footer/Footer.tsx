import React, { useEffect, useState } from 'react'
import { buildRoute } from '../../routes/routes'
import Button from '../../ui/Button'
import backly from '../../services/backly/backly'
import { useHistory } from 'react-router-dom'
import { CogIcon } from '@heroicons/react/outline'

type FooterButtonTypes = 'settings' | 'back' | 'quit'

interface FooterProps {
  options: FooterButtonTypes[]
}

function Footer(props: FooterProps) {
  const [confirmQuit, setConfirmQuit] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timerId, setTimerId] = useState<any>()

  const logout = () => {
    clearTimeout(timerId)
    backly.auth.logout()
    history.push(buildRoute(['auth']))
  }
  const history = useHistory()

  useEffect(() => {
    if (confirmQuit) {
      setTimer(3)
    }
  }, [confirmQuit])

  useEffect(() => {
    if (timer > 0) {
      setTimerId(setTimeout(() => setTimer(timer - 1), 1000))
    } else setConfirmQuit(false)

  }, [timer])

  useEffect(() => {
    return () => {
      clearTimeout(timerId)
      setTimer(0)
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-3xl p-6 z-50 bg-gradient-to-t from-white">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-4">
          {props.options.includes('settings') && (
            <button
              className={`w-16 px-4 py-3 shadow-md rounded-lg bg-gray-50 
    hover:shadow-sm hover:bg-gray-100 active:bg-gray-200 text-blue-500
    focus:bg-gray-100 focus:shadow-sm flex items-center justify-center select-none 
    outline-none focus:outline-none transition-all duration-100 z-10`}
              onClick={(e) => history.push(buildRoute(['settings']))}
            >
              <CogIcon className="w-6 h-6" />
            </button>
          )}

          {props.options.includes('quit') && (
            <Button
              value={
                confirmQuit ? `Подтвердите (${timer})` : 'Выйти из системы'
              }
              onClick={() => {
                if (confirmQuit) {
                  logout()
                } else {
                  setConfirmQuit(true)
                }
              }}
              className="text-red-400 font-medium"
            />
          )}
          {props.options.includes('back') && (
            <Button
              value="Назад"
              onClick={() => history.goBack()}
              className="text-blue-500 font-bold"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Footer
