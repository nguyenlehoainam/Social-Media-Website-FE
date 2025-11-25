import { useState } from 'react'
import { saveAuth, clearAuth } from '../store/auth.store'
import { useDispatch, useSelector } from 'react-redux'
const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.auth)

  const saveUser = (payload) => {
    dispatch(saveAuth(payload))
  }

  const clearUser = () => {
    dispatch(clearAuth())
  }

  return {
    user,
    saveUser,
    clearUser,
  }
}
export default useAuth
