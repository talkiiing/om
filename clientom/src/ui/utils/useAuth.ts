import { useCallback, useEffect, useMemo, useState } from 'react'

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string>('')

  const patchStorage = useCallback(() => {
    setAccessToken(window.localStorage.getItem('accessToken') || '')
  }, [])

  const patchStorageToken = useCallback((token: string) => {
    window.localStorage.setItem('accessToken', token)
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

  return {
    authenticated,
    userGroup,
    patchStorageToken,
  }
}

export default useAuth
