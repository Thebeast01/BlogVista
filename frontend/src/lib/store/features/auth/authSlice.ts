import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;

}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(action.payload))
      localStorage.setItem('isAuthenticated', 'true')
    },
    logout: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      state.user = null,
        state.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')

    }
  }
})

export const { setUser, logout } = AuthSlice.actions



export default AuthSlice.reducer
