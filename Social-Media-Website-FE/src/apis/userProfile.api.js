import { api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'
const userApi = () => ({
  info: async () => api.get(ApiConstants.user.info),
  update: async (user) => apiDefaultUpload.put(ApiConstants.user.update, user),
})
export const { info, update } = userApi()
