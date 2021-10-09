import { useCallback, useEffect, useMemo, useState } from 'react'
import { app } from '../../services/feathers/feathers'

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string>('')

  const patchStorage = useCallback(() => {
    setAccessToken(window.localStorage.getItem('accessToken') || '')
  }, [])

  const patchStorageToken = useCallback((token: string) => {
    app.authentication.setAccessToken(token)
    setAccessToken(token)
  }, [])

  useEffect(() => {
    window.addEventListener('storage', patchStorage)
    return () => window.removeEventListener('storage', patchStorage)
  }, [patchStorage])

  useEffect(() => {
    if (window.localStorage.getItem('accessToken'))
      patchStorageToken(window.localStorage.getItem('accessToken') || '')
  }, [patchStorageToken])

  const authenticated = useMemo((): boolean => !!accessToken, [accessToken])

  const userGroup = useMemo(() => 'dev', [])

  const login = useCallback(() => {
    window.open(
      'https://om.s.ix3.space/oauth/auth0?' +
        new URLSearchParams({
          redirect:
            '?redirect=' +
            encodeURIComponent('http://localhost:3000/auth-confirm'),
        }),
    )
  }, [])

  const logout = useCallback(() => {
    setAccessToken('')
    window.localStorage.removeItem('accessToken')
    app.authentication.logout()
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
