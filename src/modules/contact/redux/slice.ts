// redux
import { createSlice } from '@reduxjs/toolkit';
import { ContactTransactionsResponse } from '../models/contact';

const initialState: Partial<ContactTransactionsResponse> = {};

export const contactTransactionsSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    successfulGetData(state, action) {
      state.contact = action.payload;
    },
  },
});
