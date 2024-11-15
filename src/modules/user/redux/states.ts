// types
import { UserState } from './types';

// ----------------------------------------------------------------------

export const initialUserState: UserState = {
  loadings: {
    loading: false,
    updateNotificationSettingLoading: false,
  },
  isAuthenticated: false,
  isInitialized: false,
  isRedirecting: false,
  isLoading: false,
  user: {
    fullname: '',
    birthday: '',
    gender: '',
    mobile: '',
    nikname: '',
    phone: '',
    profileImage: '',
    email: '',
    id: '',
    addresses: [],
    provinces: [],
    cities: {},
    about: '',
    username: '',
    notificationSetting: { sendemail: 1, sendnotife: 1, sendsms: 0 },
  },
  error: null,
  message: '',
};
