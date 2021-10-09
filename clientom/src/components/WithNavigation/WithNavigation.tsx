import { ReactComponent as Logo } from '../../assets/logo.svg'
import Drawer from '../../ui/Drawer/Drawer'
import Input from '../../ui/Input'
import useInput from '../../ui/utils/useInput'

const WithNavigation = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const inputModel = useInput('')
  
  return (
    <>
      <div className='content pt-16 pl-12 h-full'>{children}</div>
      <Drawer />
      <div className='navBar fixed top-0 left-0 w-full h-16 bg-omheader shadow-2xl flex items-center justify-between'>
        <div className='flex flex-row items-center justify-between'>
          <Logo className='w-12 h-10 mx-3 my-2' />
        </div>
        <div className='h-full flex items-center p-3'>
          <Input model={inputModel} label={'Поиск'} />
        </div>
      </div>
    </>
  )
}

export default WithNavigation
