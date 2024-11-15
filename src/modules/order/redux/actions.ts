// redux
import { orderSlice } from './slice';

// ----------------------------------------------------------------------

export const {
  successfullyGetCanceledOrders,
  successfullyGetCompletedOrders,
  successfullyGetInprogressOrders,
  successfullyGetReturnedOrders,
  successfullyGetOrderData,
} = orderSlice.actions;
