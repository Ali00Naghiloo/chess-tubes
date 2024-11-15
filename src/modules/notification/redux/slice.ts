// redux
import { createSlice } from '@reduxjs/toolkit';
import { NotificationResponseType } from '../models/notification';

const initialState: NotificationResponseType = [];

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    successfulGetNotifications(state, action) {
      if (action.payload.length) {
        return action.payload;
      }
      if (action.payload.length === 0) {
        return initialState;
      }
      return state;
    },
  },
});
