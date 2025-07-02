
import NavList from '../navlist/NavList'

const Header = () => {
  return (
    <div>
        <header className='fixed bg-white top-0 left-0 right-0 h-[80px] z-1000 py-0 px-[20px] shadow-lg'>
            <NavList/>
        </header>
    </div>
  )
}

export default Header