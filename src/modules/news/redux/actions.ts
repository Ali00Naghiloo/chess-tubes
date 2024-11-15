// redux
import { newsSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  successfulGetNews,
  successfulGetExternalNews,
  successfulGetInternalNews,
  successfulGetPageNews,
} = newsSlice.actions;
