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
    fournisseur: {},
    search: ""
  },
  reducers: {
    setSearch: (state, action) => {  // Add action to set search query
      state.search = action.payload;
    },
    clearSearch: (state, action) => {  // Add action to set search query
        state.search = ""
    }
  },
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

export const { setSearch, clearSearch } = FournisseurSlice.actions;
export default FournisseurSlice.reducer