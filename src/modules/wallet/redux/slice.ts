// redux
import { createSlice } from '@reduxjs/toolkit';
import { WalletTransactionsResponse } from '../models/wallet';

const initialState: Partial<WalletTransactionsResponse> = {};

export const walletTransactionsSlice = createSlice({
  name: 'walletTransactions',
  initialState,
  reducers: {
    successfulGetData(state, action) {
      return action.payload;
    },
  },
});
