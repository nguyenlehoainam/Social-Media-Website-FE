import { api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'
const userApi = () => ({
  info: async () => api.get(ApiConstants.user.info),
  update: async (user) => apiDefaultUpload.put(ApiConstants.user.update, user),
  total: async () => api.get(ApiConstants.user.total),
})
export const { info, update, total } = userApi()
