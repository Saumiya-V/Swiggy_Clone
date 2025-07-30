import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice'
import authReducer from '../slice/authSlice'


export const store = configureStore({
	reducer:{
        cart:cartReducer,
        auth:authReducer
    },
   
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;