// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialQAndAState } from './states';

// ----------------------------------------------------------------------

export const qAndASlice = createSlice({
  name: 'q&a',
  initialState: initialQAndAState,
  reducers: {
    successfulGetProductQAndA(state, action) {
      state.qAndA = action.payload;
    },

    successfulGetUserQuestions(state, action) {
      state.userQuestions.questions = action.payload;
    },

    successfulGetUserAnswers(state, action) {
      state.userAnswers.answers = action.payload;
    },
  },
});
