import { createSlice } from '@reduxjs/toolkit';

const authslice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    status: false,
  },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      console.log(state);
      state.status = false;
      state.userData = null;
    },
  },
});
export const { login, logout } = authslice.actions;
export default authslice.reducer;
