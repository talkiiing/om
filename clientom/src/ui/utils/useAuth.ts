import { useCallback, useEffect, useMemo, useState } from 'react'
import { app } from '../../services/feathers/feathers'

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  const patchStorageToken = useCallback((token: string) => {
    app
      .authenticate({
        strategy: 'jwt',
        accessToken: token,
      })
      .then((r) => {
        localStorage.setItem('userEmail', r?.user?.email)
        localStorage.setItem('accessToken', token)
        setAuthenticated(true)
      })
  }, [])

  const patchStorage = useCallback(() => {
    const token = window.localStorage.getItem('accessToken')
    if (token) {
      if (app.authentication.authenticated) {
        setAuthenticated(true)
      } else {
        patchStorageToken(token)
      }
    } else {
      setAuthenticated(false)
    }
  }, [patchStorageToken])

  useEffect(() => {
    window.addEventListener('storage', patchStorage)
    return () => window.removeEventListener('storage', patchStorage)
  }, [patchStorage])

  useEffect(() => {
    patchStorage()
  }, [patchStorage])

  const userGroup = useMemo(() => 'dev', [])

  const login = useCallback(() => {
    window.open(
      'https://om.s.ix3.space/oauth/auth0?' +
        new URLSearchParams({
          redirect:
            '?redirect=' +
            encodeURIComponent('http://om.talkiiing.ru/auth-confirm'),
        }),
    )
  }, [])

  const logout = useCallback(() => {
    app.authentication.logout()
    window.localStorage.removeItem('accessToken')
  }, [])

  return {
    authenticated,
    userGroup,
    patchStorageToken,
    login,
    logout,
  }
}

export default useAuth
