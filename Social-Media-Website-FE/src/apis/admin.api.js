import { api } from '.'
import { ApiConstants } from '../constants/api.constant'

const adminApi = () => ({
  getAdmin: async () => api.get(ApiConstants.admin.getAdmin),
})

export const { getAdmin } = adminApi()
