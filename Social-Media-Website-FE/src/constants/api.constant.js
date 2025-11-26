export const ApiConstants = {
  auth: {
    login: '/auth/login',
    forgotpassword: '/auth/forgot-password',
    admin: '/auth/admin',
  },
  events: {
    updateEvents: '/admin/event/',
    // getDetaiEvents: '/admin/event/',
    getDetaiEvents: '/user/event',
    createEvents: '/admin/event',
    getAllEvents: '/user/events',
    deleteEvents: '/admin/event',
  },
  admin: {
    getAdmin: '/users/me',
  },
  members: {
    updateMembers: '/admin/update',
    importMembers: '/admin/import',
    createMembers: '/admin/create',
    getAllMembers: '/admin/select-all',
    deleteMembers: '/admin/delete',
    detailMembers: '/admin/get-detail',
    restoreMembers: '/admin/restore',
  },
  users: {
    changePassword: '/users/change-password',
    createJob: '/user/job',
    users: '/users/me',
    creatCv: '/user/cv',
  },
  home: {
    posts: '/users/home',
  },
  posts: {
    getEventPosts: '/user/events',
    getJobPosts: '/user/jobs',
    like: '/reaction/react',
    getlike: '/reaction/get-all',
    dellike: '/reaction/delete',
    getdetail: '/user/event',
    createcomment: 'user/comment',
    getmypost: 'user/job/my-jobs',
    updatepost: 'user/job',
    downloadCv: 'user/cv/download',
  },
  user: {
    info: '/users/me',
    update: '/users/me',
    total: '/users',
  },
  adminPost: {
    getAllPost: '/user/jobs',
    getDetailpost: '/user/job',
    deletePost: '/user/job',
  },
  adminComment: {
    deleteComment: '/user/comment',
  },
}
