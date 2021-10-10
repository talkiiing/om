import { useCallback, useEffect, useMemo, useState } from 'react'
import { app } from '../../services/feathers/feathers'

const useAuth = () => {
  const patchStorage = useCallback(() => {
    app.authentication.setAccessToken(
      window.localStorage.getItem('accessToken') || '',
    )
  }, [])

  const patchStorageToken = useCallback((token: string) => {
    app.authentication.setAccessToken(token)
    app
      .authenticate({
        strategy: 'jwt',
        accessToken: token,
      })
      .then((r) => localStorage.setItem('userEmail', r?.user?.email))
  }, [])

  useEffect(() => {
    window.addEventListener('storage', patchStorage)
    return () => window.removeEventListener('storage', patchStorage)
  }, [patchStorage])

  useEffect(() => {
    if (window.localStorage.getItem('accessToken'))
      patchStorageToken(window.localStorage.getItem('accessToken') || '')
  }, [patchStorageToken])

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
    window.localStorage.removeItem('accessToken')
    app.authentication.logout()
  }, [])

  return {
    authenticated: app.authentication.authenticated,
    userGroup,
    patchStorageToken,
    login,
    logout,
  }
}

export default useAuth
