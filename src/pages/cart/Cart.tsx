import { Button } from '@/components/ui/button'
import { CDN_URL } from '@/constants/url/URL'
import { addToCart, decreaseQty } from '@/redux/slice/cartSlice'
import type { RootState } from '@/redux/store/store'
import type { cartItem } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import { formatter } from '../menu/Menu'
import VerticalStepper from '@/components/stepper/VerticalStepper'
import { Link } from '@tanstack/react-router'


const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
 

  const handleIncrease = (item: cartItem) => {
    dispatch(addToCart(item))
  }

  const handleDecrease = (id: string) => {
    dispatch(decreaseQty(id))
  }

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const deliveryFee = 2800 
  const totalWithDelivery = total + deliveryFee


  if (cart.length === 0) {
    return (
     (<div className='absolute left-150 top-50 flex flex-col justify-center items-center'>
        <img className='w-60 h-60 mb-5' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="cartEmptyImage" />
        <p>Your Cart is empty</p>
        <p>You can go to home page to view more restaurants</p>
       <Link to='/'>
        <Button className='bg-orange-500 text-white font-semibold rounded-none mt-10 cursor-pointer'>SEE RESTAURANTS NEAR YOU</Button>
       </Link>
    </div>)
    )
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-100 p-10 gap-6">

      <div className="w-2/3 bg-white rounded p-6 shadow-md space-y-6 mt-30">
        <VerticalStepper />
      </div>

      <div className="w-1/3 bg-white rounded shadow-md p-6 mt-30">
        <h3 className="font-semibold text-lg mb-4">{'Your Order'}</h3>
        {cart.map(item => (
          <div key={item.id} className="grid grid-cols-3 gap-2 items-center py-3 border-b">
            <div className="flex items-center gap-3">
              <img
                src={`${CDN_URL}${item.imageId}`}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <h4 className="text-sm font-medium">{item.name}</h4>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center border rounded px-2 w-20 justify-between text-green-600">
                <button onClick={() => handleDecrease(item.id)} className="font-bold">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item)} className="font-bold">+</button>
              </div>
            </div>
            <div className="text-right font-medium text-gray-700">
              {formatter.format((item.price * item.quantity) / 100)}
            </div>
          </div>
        ))}


        <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
          <div className="font-bold">Bill Details</div>
          <div className="flex justify-between">
            <span>Item Total</span>
            <span>{formatter.format(total / 100)}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Delivery Fee</span>
            <span>{formatter.format(deliveryFee / 100)}</span>
          </div>
          <div className="flex justify-between font-semibold text-black">
            <span>To Pay</span>
            <span>{formatter.format(totalWithDelivery / 100)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
