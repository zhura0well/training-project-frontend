import { configureStore } from '@reduxjs/toolkit'
import allUsersReducer from './reducers/allUsersReducer'
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'

export default configureStore({
  reducer: {
    userInfo: userReducer,
    allUsers: allUsersReducer,
    cart: cartReducer
  }
})