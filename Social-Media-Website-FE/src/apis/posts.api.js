import { apiDefault, api, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'

const postApi = () => ({
  getPostsApi: async (params) => apiDefault.get(ApiConstants.home.posts, { params }),
  createPostApi: async (formdata) => apiDefaultUpload.post(ApiConstants.users.createJob, formdata),
  getEventApi: async (params) => api.get(ApiConstants.posts.getEventPosts, { params }),
  getJobApi: async (params) => api.get(ApiConstants.posts.getJobPosts, { params }),
  likePostApi: async ({ targetId, targetType, emotionType }) =>
    api.post(ApiConstants.posts.like, {
      targetId,
      targetType,
      emotionType,
    }),
  dellikePostApi: async ({ targetId, targetType }) =>
    api.post(ApiConstants.posts.dellike, {
      targetId,
      targetType,
    }),
  getPostsdetail: async ({ eventId }) => api.get(ApiConstants.posts.getdetail, { eventId }),
})
export const {
  getPostsApi,
  createPostApi,
  getEventApi,
  getJobApi,
  likePostApi,
  dellikePostApi,
  getPostsdetail,
} = postApi()
