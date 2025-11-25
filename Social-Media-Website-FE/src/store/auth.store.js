import { createSlice } from '@reduxjs/toolkit'
import { LocalStorage } from '../constants/localStorage.constant'

export const authStore = createSlice({
  name: 'auth',
  initialState: {
    auth: JSON.parse(localStorage.getItem(LocalStorage.auth)) || null,
  },
  reducers: {
    saveAuth: (state, action) => {
      console.log(action.payload)
      state.auth = action.payload
      localStorage.setItem(LocalStorage.auth, JSON.stringify(action.payload))
    },
    clearAuth: (state) => {
      state.auth = null
      localStorage.removeItem(LocalStorage.auth)
    },
  },
})

export const { saveAuth, clearAuth } = authStore.actions

export default authStore.reducer
