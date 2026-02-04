import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      // Check if item already exists in cart
      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        // If exists, update the new info (like new quantity)
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        // If not, push it to the array
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer