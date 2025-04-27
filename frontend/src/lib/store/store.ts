
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../store/features/auth/authSlice"

// Create store with empty initial auth state
export const makeStore = (preloadedState = undefined) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState
  })
}

export type AppStore = ReturnType<typeof makeStore>
export const initializeStore = (store: AppStore) => {
  if (typeof window !== 'undefined') {
    try {
      const user = localStorage.getItem('user');
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

      // Only dispatch if we have values to update
      if (user || isAuthenticated) {
        store.dispatch({
          type: 'auth/setUser',
          payload: {
            user: user ? JSON.parse(user) : null,
            isAuthenticated
          }
        });
      }
    } catch (error) {
      console.error('Failed to load auth state from localStorage:', error);
    }
  }
}

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
