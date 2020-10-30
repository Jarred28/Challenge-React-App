import { createSlice } from '@reduxjs/toolkit';

// Notification Slice
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    type: null,
    message: null,
    createdAt: null
  },
  reducers: {
    setNotification: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.createdAt = action.payload.createdAt;
    },
  },
});

export default notificationSlice.reducer

//actions
export const { setNotification } = notificationSlice.actions

