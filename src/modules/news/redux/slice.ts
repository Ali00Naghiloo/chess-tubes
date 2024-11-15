// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialNewsState } from './states';

// ----------------------------------------------------------------------

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialNewsState,
  reducers: {
    // SUCCESSFUL GET NEW
    successfulGetNews(state, action) {
      state.news = action.payload;
    },

    // SUCCESSFUL GET INTERNAL NEWS
    successfulGetInternalNews(state, action) {
      state.internalNews = action.payload;
    },

    // SUCCESSFUL GET EXTERNAL NEWS
    successfulGetExternalNews(state, action) {
      state.externalNews = action.payload;
    },

    // SUCCESSFUL GET PAGE NEWS
    successfulGetPageNews(state, action) {
      state.pageNews = action.payload;
    },
  },
});
