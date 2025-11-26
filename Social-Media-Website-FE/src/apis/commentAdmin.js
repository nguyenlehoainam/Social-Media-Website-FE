import { api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'
const adminComment = () => ({
  deleteComment: async (id) => api.delete(`${ApiConstants.adminComment.deleteComment}?id=${id}`),
})
export const { deleteComment } = adminComment()
