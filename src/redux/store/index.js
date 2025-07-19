import { configureStore } from '@reduxjs/toolkit';
import session from '@/redux/reducer/session';

export default configureStore({
  reducer: {
    session
  }
});
