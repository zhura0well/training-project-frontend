import { createSlice } from '@reduxjs/toolkit'
import imagePlaceholder from '../../assets/image-placeholder.jpg'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [
      {
        title: 'Adidas shoes',
        description: 'Perfect shoes for you. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos maxime repudiandae aperiam excepturi? Accusantium quasi tempora, fuga tenetur velit commodi sed? Porro quasi maxime laborum saepe eum laboriosam unde!',
        image: imagePlaceholder,
        price: 100,
        id: 1,
        quantity: 0
      },
      {
        title: 'Nike shoes',
        description: 'Perfect shoes for you. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos maxime repudiandae aperiam excepturi? Accusantium quasi tempora, fuga tenetur velit commodi sed? Porro quasi maxime laborum saepe eum laboriosam unde!',
        image: imagePlaceholder,
        price: 50,
        id: 2,
        quantity: 0
      },
      {
        title: 'Puma shoes',
        description: 'Perfect shoes for you. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quos maxime repudiandae aperiam excepturi? Accusantium quasi tempora, fuga tenetur velit commodi sed? Porro quasi maxime laborum saepe eum laboriosam unde!',
        image: imagePlaceholder,
        price: 75,
        id: 3,
        quantity: 0
      },
    ],
    addedItems: [],
    totalPrice: 0
  },
  reducers: {
    addToCart(state, action) {
      let addedItem = state.items.find(item => item.id === action.payload.id)

      let existedItem = state.addedItems.find(item => action.payload.id === item.id)

      if (existedItem) {
        existedItem.quantity += 1
      } else {
        addedItem.quantity = 1
        state.addedItems.push(addedItem)
      }
      state.totalPrice += addedItem.price
    }
  }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer