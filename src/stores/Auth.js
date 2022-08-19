import { createSlice } from '@reduxjs/toolkit'

export const Auth = createSlice({


  name: 'auth',
  initialState: {
    user: sessionStorage.getItem('user') ?? false
  },
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;      
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', JSON.stringify(token));
      
      state.user = action.payload
    },
    authLogout: state => {
      state.user = false
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    },
  },
})

export const { login, authLogout } = Auth.actions

export default Auth.reducer