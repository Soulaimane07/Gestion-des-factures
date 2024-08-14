import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ServerUrl } from '../../Variables';
import axios from 'axios';

export const fetchClients = createAsyncThunk('clients/fetchClients', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${ServerUrl}/clients`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchClient = createAsyncThunk('clients/fetchClient', async (clientId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${ServerUrl}/clients/${clientId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const ClientSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [],
    client: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchClients.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchClient.fulfilled, (state, action) => {
            state.loading = false;
            state.client = action.payload;
        })
  }
})

export default ClientSlice.reducer