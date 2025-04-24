import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../store/features/auth/authSlice"
const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return {
    user: user ? JSON.parse(user) : null,
    isAuthenticated,
  };
};
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    }, preloadedState: {
      auth: loadUserFromLocalStorage(),
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
