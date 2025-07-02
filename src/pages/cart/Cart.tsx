import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'



const Cart = () => {
  
  return (
    <div className='mt-50 flex flex-col justify-center items-center'>
        <img className='w-60 h-60 mb-5' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="cartEmptyImage" />
        <p>Your Cart is empty</p>
        <p>You can go to home page to view more restaurants</p>
       <Link to='/'>
        <Button className='bg-orange-500 text-white font-semibold rounded-none mt-10 cursor-pointer'>SEE RESTAURANTS NEAR YOU</Button>
       </Link>
    </div>
  )
}

export default Cart