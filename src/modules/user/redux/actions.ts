// redux
import { userSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  failureOperation,
  startLoading,
  initializingFailure,
  initializingSuccess,
  getUserProfileSuccessful,
  hasError,
  userLoggedIn,
  userLoggedOut,
  successOperation,
  addUserAddress,
  deleteUserAddress,
  editUserAddress,
  successfulChangePersonalInfo,
  successfulChangeEmail,
  successfulChangePhoneNumber,
  successfulGetCitiesOfProvince,
  successfulGetProvinces,
  successfulGetUserAddresses,
  redirecting,
  successChangeAvatar,
  successfulChangeUsername,
} = userSlice.actions;
