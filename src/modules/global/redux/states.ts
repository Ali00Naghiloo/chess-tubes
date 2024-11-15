// ----------------------------------------------------------------------

export interface GlobalState {
  isLoading: boolean;
  error: boolean;
  message: string;
  theme: 'light' | 'dark';
  needLogin: boolean;
  activeAddress?: string | number | null;
  isShipmentNeed: boolean;
  activeShipmentType?: string | number | null;
  shipmentOptions: ShipmentOptions[];

  searchResult: {
    result: SearchResultItems[];
    // meta ...
  };

  lastSeenItems: LastSeenItem[];

  statisticalInfo: {
    shopInfo: {
      totalCount: number;
    };
    courseInfo: {
      totalCount: number;
      totalTime: string | number;
    };
    onlineCourseInfo: {
      totalCount: number;
      totalTime: string | number;
    };
    gameAnalyze: {
      totalCount: number;
      totalTime: string | number;
    };
  };
}

export interface LastSeenItem {}

export interface SearchResultItems {
  id: number;
  title: string;
  image: string; // TODO: change in future(wait for backend changes) when getting just news
  postType: 'internal' | 'international'; // only for news
  mainImage: string; // when getting all images!
  type: SearchResultItemTypes;
  discount: SearchResultItemDiscount | null;
}

export type SearchResultItemTypes = 'news' | 'course' | 'product';

export interface SearchResultItemDiscount {
  id: number;
  discountPercent: number;
  discountable_id: number;
}

export interface ShipmentOptions {
  id: string | number;
  title: string;
  cost: number | string;
  deliveryTime: string | number;
  logo: string;
  isEnable: boolean;

  // TODO add icon
}

export const initialGlobalState: GlobalState = {
  isLoading: false,
  error: false,
  message: '',
  theme: 'light',
  needLogin: false,
  activeAddress: null,
  isShipmentNeed: false,
  shipmentOptions: [],
  activeShipmentType: null,

  searchResult: {
    result: [],
  },

  lastSeenItems: [],

  statisticalInfo: {
    shopInfo: {
      totalCount: 0,
    },
    courseInfo: {
      totalCount: 0,
      totalTime: '',
    },
    onlineCourseInfo: {
      totalCount: 0,
      totalTime: 0,
    },
    gameAnalyze: {
      totalCount: 0,
      totalTime: 0,
    },
  },
};
