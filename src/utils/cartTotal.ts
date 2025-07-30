import type { RootState } from "@/redux/store/store"
import { useSelector } from "react-redux"

  const cart = useSelector((state:RootState)=>state.cart)
  
const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
 const deliveryFee = 2800 
 const totalWithDelivery = total + deliveryFee