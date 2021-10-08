import React, { useState } from 'react'
import useInput from '../../ui/utils/useInput'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { Link } from 'react-router-dom'
import TextLink from '../../ui/TextLink'
import backly from '../../services/backly/backly'
import ErrorLine from '../../ui/ErrorLine'
import { useHistory } from 'react-router-dom'
import MultiSelect from '../../ui/MultiSelect'
import useMultiSelect from '../../ui/utils/useMultiSelect'

const options = [
  { id: 'one', value: 'Один' },
  { id: 'two', value: 'Дважды' },
  { id: 'director', value: 'Управляющий' },
  { id: 'staff', value: 'Сотрудник' },
]

const In = () => {
  const nickname = useInput('')
  const pass = useInput('')
  const [error, setError] = useState('')

  const multi = useMultiSelect(['two'])

  const history = useHistory()

  const login = () => {
    backly.auth.login(
      {
        login: nickname.value,
        password: pass.value,
      },
      async () => {
        const res = await backly.app.get('authentication')
        backly.app.authentication.setAccessToken(res.accessToken)
        history.replace('/')
      },
      (e: any) => {
        console.warn('Authentication failed', e)
        setError(e.message)
      }
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-center">Войти</h1>
      <div className="flex flex-row space-x-2 justify-center mb-3">
        <p>Нет аккаунта?</p>
        <Link replace to={`/auth/up`}>
          <TextLink value="Создать!" />
        </Link>
      </div>
      <Input
        model={nickname}
        label={'Никнейм'}
        id={'nickname'}
        onKeyPress={() => login()}
      />
      <Input
        model={pass}
        label={'Пароль'}
        type={'password'}
        onKeyPress={() => login()}
      />
      <Button value={'Войти'} onClick={() => login()} />
      {error && <ErrorLine value={error} />}
    </div>
  )
}

export default In
