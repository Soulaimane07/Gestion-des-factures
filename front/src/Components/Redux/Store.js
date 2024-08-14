import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Redux/Slices/UserSlice"
import fournisseurReducer from "../Redux/Slices/FournisseurSlice"
import clientReducer from "../Redux/Slices/ClientSlice"
import removeReducer from "../Redux/Slices/RemoveSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    fournisseurs: fournisseurReducer,
    clients: clientReducer,
    remove: removeReducer,
  },
})