import { ReactComponent as Logo } from '../../assets/logo.svg'
import Drawer from '../../ui/Drawer/Drawer'
import Input from '../../ui/Input'
import useInput from '../../ui/utils/useInput'
import GlowButton from '../../ui/GlowButton'
import usePath from '../../ui/utils/usePath'
import { buildRoute } from '../../routes/routes'
import useAuth from '../../ui/utils/useAuth'

const WithNavigation = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const inputModel = useInput('')
  const { go } = usePath()

  const { authenticated, logout, login } = useAuth()

  return (
    <>
      <div className='content pt-16 pl-12'>{children}</div>
      <Drawer />
      <div className='navBar fixed top-0 left-0 w-full h-16 bg-omheader shadow-2xl flex items-center justify-between'>
        <div className='flex flex-row items-center justify-between'>
          <Logo className='w-12 h-10 mx-3 my-2' />
        </div>
        <div className='flex items-center p-3'>
          <Input model={inputModel} label={'Поиск'} className='mr-4' />
          {!authenticated ? (
            <GlowButton
              type={'outline'}
              value={'Войти через Auth0'}
              onClick={() => login()}
            />
          ) : (
            <GlowButton
              type={'outline'}
              value={'Завершить сессию'}
              onClick={() => {
                logout()
                go(buildRoute([]))
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default WithNavigation
