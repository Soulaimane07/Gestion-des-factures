import { createSlice } from '@reduxjs/toolkit'

export const RemoveSlice = createSlice({
  name: 'user',
  initialState: {
    type: null,
    id: null,
    oppened: false
  },
  reducers: {
    openRemove: (state, action) => {
      state.type = action.payload.type
      state.id = action.payload.id
      state.oppened = true
    },
    close: (state) => {
      state.type = null
      state.id = null
      state.oppened = false
    }
  },
})

export const { openRemove, close } = RemoveSlice.actions

export default RemoveSlice.reducer