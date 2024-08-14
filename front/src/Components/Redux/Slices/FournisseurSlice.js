import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ServerUrl } from '../../Variables';
import axios from 'axios';

export const fetchFournisseurs = createAsyncThunk('fournisseur/fetchFournisseur', async (_, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${ServerUrl}/fournisseurs`);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});

export const fetchFournisseur = createAsyncThunk('fournisseur/fetchClient', async (fournisseurid, { rejectWithValue }) => {
  try {
      const response = await axios.get(`${ServerUrl}/fournisseurs/${fournisseurid}`);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});


export const FournisseurSlice = createSlice({
  name: 'fournisseurs',
  initialState: {
    data: [],
    fournisseur: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchFournisseurs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
  })
  .addCase(fetchFournisseur.fulfilled, (state, action) => {
      state.loading = false;
      state.fournisseur = action.payload;
  })
  },
})

export default FournisseurSlice.reducer