import { BadgePercent, HelpCircle,  Search,  ShoppingCart,  User} from 'lucide-react'
import { SignIn } from '../loginSheet/SignIn'
import LocationBtn from '../locationButton/LocationBtn'
import { Link } from '@tanstack/react-router'


const NavList = () => {
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
                       <BadgePercent/><p> Offers <sup className='text-orange-500'>New</sup></p>
                    </div>
                </li>
                 <li>
                    <div className='flex  gap-2 text-[16px] font-semibold'>
                        <HelpCircle/> Help
                    </div>
                </li>
                 <li>
                    <div className='flex  gap-2 text-[16px] font-semibold'>
                        <User/> <SignIn/>
                    </div>
                </li>
                 <li>
                    <div className='flex  gap-2 text-[16px] font-semibold'>
                        <ShoppingCart/><Link to='/cart'>Cart</Link>
                    </div>
                </li>
            </ul>
           </div>
        </div>
  )
}

export default NavList