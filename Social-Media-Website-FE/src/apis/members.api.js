// import { api, apiDefaultUpload } from '.'
// import { apiDefault } from '.'
// import { ApiConstants } from '../constants/api.constant'

// const membersApi = () => ({
//   getAllMembers: async (params) => api.get(ApiConstants.members.getAllMembers, { params }),
//   detailMembers: async (id) => api.get(`${ApiConstants.members.detailMembers}?userId=${id}`),
//   updateMembers: async (id, memberData) =>
//     api.put(
//       `${ApiConstants.members.updateMembers}?id=${id}`,
//       memberData, // gửi lên
//     ),

//   createMembers: async (memberData) =>
//     api.post(
//       ApiConstants.members.createMembers,
//       memberData, // gửi lên
//     ),

//   deleteMembers: async (username) =>
//     api.delete(`${ApiConstants.members.deleteMembers}?username=${username}`),

//   importMembers: async (data) => apiDefaultUpload.post(ApiConstants.members.importMembers, data),
//   restoreMembers: async (email) => api.put(ApiConstants.members.restoreMembers, { email }),
// })

// export const {
//   getAllMembers,
//   updateMembers,
//   createMembers,
//   deleteMembers,
//   importMembers,
//   detailMembers,
//   restoreMembers,
// } = membersApi()

import { api } from '.'
import { ApiConstants } from '../constants/api.constant'

const membersApi = () => ({
  getAllMembers: async (params) => api.get(ApiConstants.members.getAllMembers, { params }),
  detailMembers: async (id) => api.get(ApiConstants.members.detailMembers),

  // MOCK: Update -> get
  updateMembers: async (id, memberData) => api.get(ApiConstants.members.updateMembers),

  // MOCK: Create -> get
  createMembers: async (memberData) => api.get(ApiConstants.members.createMembers),

  // MOCK: Delete -> get
  deleteMembers: async (username) => api.get(ApiConstants.members.deleteMembers),

  // MOCK: Import -> get
  importMembers: async (data) => api.get(ApiConstants.members.importMembers),

  // MOCK: Restore -> get
  restoreMembers: async (email) => api.get(ApiConstants.members.restoreMembers),
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
