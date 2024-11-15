// redux
import { globalSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  changeActiveAddressOperation,
  startLoading,
  changeThemeMode,
  hasError,
  successOperation,
  needLoginToProceed,
  changeShipmentStatusOperation,
  addShipmentOptions,
  activeShipmentType,
  successfullyGetStatisticalInfo,
  successfullySearchQuery,
  successfullyGetLastSeenItems,
} = globalSlice.actions;
