// redux
import { createSlice } from '@reduxjs/toolkit';
import { RuleResponseType } from '../models/rule';

const initialState: RuleResponseType = [];

export const ruleSlice = createSlice({
  name: 'rule',
  initialState,
  reducers: {
    successfulGetRules(state, action) {
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
