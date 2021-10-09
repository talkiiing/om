import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import useAuth from '../ui/utils/useAuth'

const AuthConfirm = () => {
  const history = useHistory()
  const { patchStorageToken } = useAuth()

  useEffect(() => {
    console.log(history.location.hash)
    if (history.location.hash) {
      patchStorageToken(history.location.hash.split('=')[1])
      window.close()
    }
  }, [history.location.hash, patchStorageToken])

  return (
    <div className='animate-pulse mx-4 my-4 text-white text-xl'>
      Проводим авторизацию...
    </div>
  )
}

export default AuthConfirm
