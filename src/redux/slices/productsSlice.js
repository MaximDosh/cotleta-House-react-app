import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk(
  'product/fetchProductStatus',
  async (params, thunkAPI) => {
    const { category, search, sort, currentPage } = params;
    const { data } = await axios.get(
      `https://6373311e0bb6b698b60492be.mockapi.io/Items?limit=8&page=${currentPage}${category}${search}&sortBy=${sort}&order=desc`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchProduct.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
