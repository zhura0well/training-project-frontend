import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [

    ],
    addedItems: [],
    totalPrice: 0
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items
    },

    addToCart(state, action) {
      const addedItem = state.items.find(item => item._id === action.payload._id)

      const existedItem = state.addedItems.find(item => action.payload._id === item._id)

      if (existedItem) {
        existedItem.quantity += 1
      } else {
        addedItem.quantity = 1
        state.addedItems.push(addedItem)
      }
      state.totalPrice += addedItem.price
    },

    addQuantity(state, action) {
      const addedItem = state.addedItems.find(item => item._id === action.payload._id)

      addedItem.quantity += 1
      state.totalPrice += addedItem.price
    },

    subQuantity(state, action) {
      const addedItem = state.addedItems.find(item => item._id === action.payload._id)

      if (addedItem.quantity === 1) {
        const newItems = state.addedItems.filter(item => action.payload._id !== item._id)

        state.addedItems = newItems
        state.totalPrice -= addedItem.price
      } else {
        addedItem.quantity -= 1

        state.totalPrice -= addedItem.price
      }
    },
  }
})

export const { setItems, addToCart, addQuantity, subQuantity } = cartSlice.actions

export default cartSlice.reducer