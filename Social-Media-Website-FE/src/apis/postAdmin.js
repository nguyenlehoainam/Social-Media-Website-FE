import { api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'
const adminPost = () => ({
  getAllPost: async (params) => api.get(ApiConstants.adminPost.getAllPost, { params }),
  getDetailpost: async (id) => api.get(`${ApiConstants.adminPost.getDetailpost}?id=${id}`),
  deletePost: async (id) => api.delete(`${ApiConstants.adminPost.getDetailpost}?id=${id}`),
})
export const { getAllPost, getDetailpost, deletePost } = adminPost()
