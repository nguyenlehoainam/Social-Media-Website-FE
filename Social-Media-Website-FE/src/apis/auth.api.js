import { apiDefault, api } from '.'
import { ApiConstants } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ username, password }) =>
    apiDefault.post(ApiConstants.auth.login, {
      username,
      password,
    }),
  Me: () => apiDefault.get(ApiConstants.users.getMe),
  forgotPassword: ({ username, email }) =>
    apiDefault.post(ApiConstants.auth.forgotpassword, {
      username,
      email,
    }),
  changePassword: async ({ oldPassword, newPassword }) =>
    api.put(ApiConstants.users.changePassword, {
      oldPassword,
      newPassword,
    }),
})

export const { login, forgotPassword, changePassword } = authApi()
