import axios from 'axios'
import { ApiConstants } from '../constants/api.constant'
import { apiDefault, api } from '.'

const changePasswordAPI = () => ({
  changePassword: async ({ oldPassword, newPassword }) =>
    api.put(ApiConstants.users.changePassword, {
      oldPassword,
      newPassword,
    }),
})
export const { changePassword } = changePasswordAPI()
