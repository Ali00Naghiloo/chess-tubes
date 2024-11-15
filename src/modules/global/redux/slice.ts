// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialGlobalState } from './states';

// ----------------------------------------------------------------------

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialGlobalState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = false;
      state.message = '';
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },

    // SUCCESS OPERATION
    successOperation(state) {
      state.isLoading = false;
      state.error = false;
      state.message = '';
    },

    // CHANGE THEME
    changeThemeMode(state, action) {
      state.theme = action.payload;
    },

    // NEED LOGIN
    needLoginToProceed(state, action) {
      state.needLogin = action.payload;
    },

    // CHANGE ACTIVE ADDRESS
    changeActiveAddressOperation(state, action) {
      state.activeAddress = action.payload;
    },

    // CHANGE SHIPMENT STATUS
    changeShipmentStatusOperation(state, action) {
      state.isShipmentNeed = action.payload;
    },

    // ADD SHIPMENT OPTIONS
    addShipmentOptions(state, action) {
      state.shipmentOptions = action.payload;
    },

    // CHANGE ACTIVE SHIPMENT
    activeShipmentType(state, action) {
      state.activeShipmentType = action.payload;
    },

    // SUCCESSFULLY GET STATISTICAL INFO
    successfullyGetStatisticalInfo(state, action) {
      state.statisticalInfo = action.payload;
    },

    // SUCCESSFULLY SEARCH QUERY
    successfullySearchQuery(state, action) {
      state.searchResult = action.payload;
    },

    // SUCCESSFULLY GET LAST SEEN ITEMS
    successfullyGetLastSeenItems(state, action) {
      state.lastSeenItems = action.payload;
    },
  },
});
