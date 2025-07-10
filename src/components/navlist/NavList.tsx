import { BadgePercent, HelpCircle,  Search,  ShoppingCart,  User} from 'lucide-react'
import { SignIn } from '../loginSheet/SignIn'
import LocationBtn from '../locationButton/LocationBtn'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store/store'


const NavList = () => {
      const cart = useSelector((state:RootState)=>state.cart)
  return (
    <div className='flex min-w-[1200px] relative max-w-[1300px] items-center'>
        <div className='ml-30  flex h-[80px] items-center'>
            <Link to="/"><img src="https://static.vecteezy.com/system/resources/previews/050/816/833/non_2x/swiggy-transparent-icon-free-png.png" alt="swiggy-logo" className='h-19 w-19 cursor-pointer duration-300 hover:scale-110'/></Link>
            <div role='button' className='flex items-center ml-[30px] h-[30px] cursor-pointer pr-[10px] max-w-[30px] mr-30'>
              <span className='relative'>
                <LocationBtn/>
              </span>
            </div>
        </div>
           <div className='relative left-30 pl-55'>
             <ul className='flex items-center gap-15'>
                <li>
                    <div className='flex  gap-2 text-[16px] font-semibold cursor-pointer'>
                       <Search/> <Link to="/search"> Search</Link>
                    </div>
                </li>
                <li>
                    <div className='flex  gap-2 text-[16px] font-semibold'>
                     <BadgePercent/>
                      <Link to="https://www.swiggy.com/offers-near-me">
                       <p> Offers <sup className='text-orange-500'>New</sup></p>
                      </Link>
                    </div>
                </li>
                 <li>
                    <div className='flex  gap-2 text-[16px] font-semibold'>
                        <HelpCircle/><Link to="/help">Help</Link>
                    </div>
                </li>
                 <li>
                    <div className='flex  gap-2 text-[16px] font-semibold'>
                        <User/> <SignIn/>
                    </div>
                </li>
                 <li>
                    <div className='flex  gap-2 text-[16px] font-semibold'>
                      { cart.length === 0 ? <ShoppingCart/>:<span className='w-5 h-5 rounded bg-green-500 text-white font-bold text-center'>{cart.length}</span>}
                       <Link to='/cart'>Cart</Link>
                    </div>
                </li>
            </ul>
           </div>
        </div>
  )
}

export default NavList