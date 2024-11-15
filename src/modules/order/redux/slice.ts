// redux
import { createSlice } from '@reduxjs/toolkit';
// states
import { initialOrderState } from './states';

// ----------------------------------------------------------------------

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    // SUCCESSFULLY GET INPROGRESS ORDERS
    successfullyGetInprogressOrders(preState, action) {
      preState.orders.inprogress = action.payload;
    },

    // SUCCESSFULLY GET COMPLETED ORDERS
    successfullyGetCompletedOrders(preState, action) {
      preState.orders.completed = action.payload;
    },

    // SUCCESSFULLY GET CANCELED ORDERS
    successfullyGetCanceledOrders(preState, action) {
      preState.orders.cancelled = action.payload;
    },

    // SUCCESSFULLY GET RETURNED ORDERS
    successfullyGetReturnedOrders(preState, action) {
      preState.orders.returned = action.payload;
    },

    // SUCCESSFULLY GET ORDER DATA
    successfullyGetOrderData(preState, action) {
      preState.order = action.payload;
    },
  },
});
