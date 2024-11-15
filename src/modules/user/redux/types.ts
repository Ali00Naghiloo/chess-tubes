import { AuthUserType } from '../models/user';

export type UserLoading = {
  loading: boolean;
  updateNotificationSettingLoading: boolean;
};

export type UserStateLoadingTypes = keyof UserLoading | undefined | null;

export type FailureOperation = {
  error: string | null;
  loading: UserStateLoadingTypes;
};

export interface UserState {
  loadings: UserLoading;
  error: null | string;

  isAuthenticated: boolean;
  isInitialized: boolean;
  isRedirecting: boolean;
  isLoading: boolean;
  // error: boolean;
  message: string;
  user: AuthUserType;
}
