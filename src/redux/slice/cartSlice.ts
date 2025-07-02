import { createSlice } from "@reduxjs/toolkit"

type CartItem ={
    id:number;
    Resname:string;
    price:number;
    itemName:string;
    quantity:number;
}

type InitialState=CartItem[] 

const initialState:InitialState = []


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      increaseQty: (state, action) => {
        const existingItem = state.find((item)=>item.id === action.payload.id)
        if(existingItem){
            existingItem.quantity+=1
        }
        state.push({...action.payload})
      }
    }
})


const {increaseQty}=cartSlice.actions

export default cartSlice.reducer