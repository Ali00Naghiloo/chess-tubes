// models
import { Banner } from '../models/banner';

// ----------------------------------------------------------------------

export interface BannerState {
  shopBanners: Banner[];
  coursesBanners: Banner[];
  newsBanners: Banner[];
  homeBanners: Banner[];
}

export const initialBannerState: BannerState = {
  shopBanners: [],
  coursesBanners: [],
  newsBanners: [],
  homeBanners: [],
};
