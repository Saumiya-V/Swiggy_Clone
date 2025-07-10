import type { cartItem } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

type CartItemWithQuantity = cartItem & { quantity: number }

type InitialState = CartItemWithQuantity[]

const initialState: InitialState = []

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      const existingItem = state.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.push({ ...action.payload, quantity: 1 })
        toast.success("Item added to cart")
      }
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload)
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.find(i => i.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          return state.filter(i => i.id !== action.payload)
        }
      }
    }
  }
})

export const { addToCart, decreaseQty, deleteFromCart } = cartSlice.actions
export default cartSlice.reducer
