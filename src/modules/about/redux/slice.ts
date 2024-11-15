// redux
import { createSlice } from '@reduxjs/toolkit';
import { AboutResponseType } from '../models/about';

const initialState: AboutResponseType = [];

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    successfulGetAbouts(state, action) {
      if (action.payload.length) {
        return action.payload;
      }
      if (action.payload.length === 0) {
        return initialState;
      }
      return state;
    },
  },
});
