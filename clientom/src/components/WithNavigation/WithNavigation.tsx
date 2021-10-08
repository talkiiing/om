import { ReactComponent as Logo } from '../../assets/logo.svg'
import Drawer from '../../ui/Drawer/Drawer'

const WithNavigation = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <>
      <div className='content pt-16 pl-12'>{children}</div>
      <Drawer />
      <div className='navBar fixed top-0 left-0 w-full h-16 bg-omheader shadow-2xl'>
        <div className='flex flex-row items-center justify-between'>
          <Logo className='w-8 h-12 mx-3 my-2' />
        </div>
      </div>
    </>
  )
}

export default WithNavigation
