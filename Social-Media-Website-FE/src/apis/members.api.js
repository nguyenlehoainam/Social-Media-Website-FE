import { api, apiDefaultUpload } from '.'
import { apiDefault } from '.'
import { ApiConstants } from '../constants/api.constant'

const membersApi = () => ({
  getAllMembers: async (params) => api.get(ApiConstants.members.getAllMembers, { params }),
  detailMembers: async (id) => api.get(`${ApiConstants.members.detailMembers}?userId=${id}`),
  updateMembers: async (id, memberData) =>
    api.put(
      `${ApiConstants.members.updateMembers}?id=${id}`,
      memberData, // gửi lên
    ),

  createMembers: async (memberData) =>
    api.post(
      ApiConstants.members.createMembers,
      memberData, // gửi lên
    ),

  deleteMembers: async (username) =>
    api.delete(`${ApiConstants.members.deleteMembers}?username=${username}`),

  importMembers: async (data) => apiDefaultUpload.post(ApiConstants.members.importMembers, data),
  restoreMembers: async (email) => api.put(ApiConstants.members.restoreMembers, { email }),
})

export const {
  getAllMembers,
  updateMembers,
  createMembers,
  deleteMembers,
  importMembers,
  detailMembers,
  restoreMembers,
} = membersApi()
