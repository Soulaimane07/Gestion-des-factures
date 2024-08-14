import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    logged: false
  },
  reducers: {
    login: (state, action) => {
      state.data = action.payload
      state.logged = true
      localStorage.setItem("kerkashi-user", JSON.stringify(action.payload))
    },
    logout: (state) => {
      localStorage.removeItem("kerkashi-user")
      state.data = null
      state.logged = false
    }
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer