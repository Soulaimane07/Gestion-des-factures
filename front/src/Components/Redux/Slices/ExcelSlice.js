import { createSlice } from '@reduxjs/toolkit'

export const ExcelSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
    client: null,
    fournisseur: null,
  },
  reducers: {
    setExcel: (state, action) => {  
        state.data = action.payload.data;
        state.client = action.payload.client
        state.fournisseur = action.payload.fournisseur
    },
    removeExcel: (state, action) => { 
        state.data = []
        state.client = null
        state.fournisseur = null
    }
  }
})

export const { setExcel, removeExcel } = ExcelSlice.actions;
export default ExcelSlice.reducer