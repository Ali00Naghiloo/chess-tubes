// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// states
import { initialUserState } from './states';
import { FailureOperation, UserStateLoadingTypes } from './types';

// ----------------------------------------------------------------------

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    // Start Loading
    startLoading(state, action: PayloadAction<UserStateLoadingTypes>) {
      const loadingType: UserStateLoadingTypes =
        action.payload == null ? 'loading' : action.payload;
      state.loadings[loadingType] = true;
      state.error = null;
    },

    // Success Operation
    successOperation(state, action: PayloadAction<UserStateLoadingTypes>) {
      const loadingType: UserStateLoadingTypes =
        action.payload == null ? 'loading' : action.payload;
      state.loadings[loadingType] = false;
      state.error = null;
    },

    failureOperation(state, action: PayloadAction<FailureOperation>) {
      const { error, loading } = action.payload;
      const loadingType: UserStateLoadingTypes = loading == null ? 'loading' : loading;
      state.loadings[loadingType] = false;
      state.error = error;
    },

    // Has Error
    hasError(state, action) {
      // ! Seems we need to figure out for the hasError Slice!
      //
      state.error = action.payload;
    },

    // ================================================

    // SUCCESS INITIALIZING
    initializingSuccess(state) {
      state.isInitialized = true;
      state.isAuthenticated = true;
    },

    // REDIRECTING
    redirecting(state, action) {
      state.isRedirecting = action.payload;
    },

    // FAILURE INITIALIZING
    initializingFailure(state) {
      state.isInitialized = true;
      state.isAuthenticated = false;
    },

    // USER LOGGED IN
    userLoggedIn(state) {
      state.isLoading = false;
      state.isAuthenticated = true;
    },

    // USER LOGGED OUT
    userLoggedOut(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
    },

    // GET USER PROFILE
    getUserProfileSuccessful(state, action) {
      state.isLoading = false;
      state.user = { ...state.user, ...action.payload };
    },

    // ADD ADDRESS
    addUserAddress(state, action) {
      if (state.user != null) {
        const { addresses } = state.user;

        state.user.addresses = [
          ...addresses,
          { ...action.payload, isActive: addresses.length === 0 },
        ];
      }
    },

    // EDIT ADDRESS
    editUserAddress(state, action) {
      if (state.user != null) {
        const newAddress = action.payload;
        const { addresses } = state.user;

        const newAddresses = addresses.map((ad) => {
          if (ad.id === newAddress.id) {
            return newAddress;
          }
          return { ...ad, isActive: false };
        });
        state.user.addresses = newAddresses;
      }
    },

    // DELETE ADDRESS
    deleteUserAddress(state, action) {
      const addressId = action.payload;

      if (state.user != null) {
        const addresses = state.user.addresses.filter((ad) => ad.id !== addressId);
        state.user.addresses = addresses;
      }
    },

    // SUCCESS CHANGE PERSONAL INFO
    successfulChangePersonalInfo(state, action) {
      if (state.user != null) {
        state.user = { ...state.user, ...action.payload, fullname: action.payload.name };
      }
    },

    // SUCCESS CHANGE Email
    successfulChangeEmail(state, action) {
      if (state.user != null) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // SUCCESS CHANGE USERNAME
    successfulChangeUsername(state, action) {
      if (state.user != null) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // SUCCESS CHANGE PHONE NUMBER
    successfulChangePhoneNumber(state, action) {
      if (state.user != null) {
        state.user = { ...state.user, mobile: action.payload };
      }
    },

    successfulGetUserAddresses(state, action) {
      if (state.user != null) {
        state.user.addresses = action.payload;
      }
    },

    successfulGetProvinces(state, action) {
      if (state.user != null) {
        state.user.provinces = action.payload;
      }
    },
    successfulGetCitiesOfProvince(state, action) {
      if (state.user != null) {
        state.user.cities = { ...state.user.cities, ...action.payload };
      }
    },

    // SUCCESS CHANGE AVATAR
    successChangeAvatar(state, action) {
      if (state.user != null) {
        state.user.profileImage = action.payload;
      }
    },
  },
});
