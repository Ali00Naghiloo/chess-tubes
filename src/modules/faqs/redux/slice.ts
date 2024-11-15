// redux
import { createSlice } from '@reduxjs/toolkit';
import { FaqTransactionsResponse } from '../models/faq';

const initialState: Partial<FaqTransactionsResponse> = {};

export const faqTransactionsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    successfulGetData(state, action) {
      state.faqs = action.payload;
    },
  },
});
