// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialBannerState } from './states';

// ----------------------------------------------------------------------

export const bannerSlice = createSlice({
  name: 'banner',
  initialState: initialBannerState,
  reducers: {
    // SUCCESSFUL GET SHOP BANNER
    successfulGetShopBanner(state, action) {
      state.shopBanners = action.payload;
    },

    // SUCCESSFUL GET COURSES BANNER
    successfulGetCoursesBanner(state, action) {
      state.coursesBanners = action.payload;
    },

    // SUCCESSFUL GET NEWS BANNER
    successfulGetNewsBanner(state, action) {
      state.newsBanners = action.payload;
    },

    // SUCCESSFUL GET HOME BANNER
    successfulGetHomeBanner(state, action) {
      state.homeBanners = action.payload;
    },
  },
});
