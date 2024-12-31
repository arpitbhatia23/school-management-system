import { configureStore } from '@reduxjs/toolkit';
import authreducer from './slice';
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});
export default store;
