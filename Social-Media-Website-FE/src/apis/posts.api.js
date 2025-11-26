import { apiDefault, api, apiDefaultUpload, apiDefaultDownload } from '.'
import { ApiConstants } from '../constants/api.constant'

const postApi = () => ({
  getmyposts: async (params) => api.get(ApiConstants.posts.getmypost, { params }),
  getPostsApi: async (params) => api.get(ApiConstants.home.posts, { params }),
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
    api.delete(ApiConstants.posts.dellike, {
      params: {
        targetId,
        targetType,
      },
    }),
  getPostsdetail: async ({ eventId }) =>
    api.get(ApiConstants.posts.getdetail, { params: { eventId } }),
  createCommentApi: async ({ targetId, targetType, content }) =>
    api.post(ApiConstants.posts.createcomment, {
      targetId,
      targetType,
    }),
  creatcv: async (formdata) => apiDefaultUpload.post(ApiConstants.users.creatCv, formdata),
  updatePost: async (id, data) => api.put(ApiConstants.posts.updatepost, data, { params: { id } }),
  getJobPostAPI: async (id) => api.get(ApiConstants.posts.updatepost, { params: { id } }),
  dowloadCvAPI: async (postId) => {
    return apiDefaultDownload.get(ApiConstants.posts.downloadCv, {
      params: { postId },
    })
  },
  deleteCommentApi: async (id) => api.delete(ApiConstants.posts.createcomment, { params: { id } }),
})
export const {
  getPostsApi,
  createPostApi,
  getEventApi,
  getJobApi,
  likePostApi,
  dellikePostApi,
  getPostsdetail,
  createCommentApi,
  creatcv,
  getmyposts,
  updatePost,
  getJobPostAPI,
  dowloadCvAPI,
  deleteCommentApi,
} = postApi()
