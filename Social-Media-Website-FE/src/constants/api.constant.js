// export const ApiConstants = {
//   auth: {
//     login: '/auth/login',
//     forgotpassword: '/auth/forgot-password',
//     admin: '/auth/admin',
//   },
//   events: {
//     updateEvents: '/admin/event/',
//     // getDetaiEvents: '/admin/event/',
//     getDetaiEvents: '/user/event',
//     createEvents: '/admin/event',
//     getAllEvents: '/user/events',
//     deleteEvents: '/admin/event',
//   },
//   admin: {
//     getAdmin: '/users/me',
//   },
//   members: {
//     updateMembers: '/admin/update',
//     importMembers: '/admin/import',
//     createMembers: '/admin/create',
//     getAllMembers: '/admin/select-all',
//     deleteMembers: '/admin/delete',
//     detailMembers: '/admin/get-detail',
//     restoreMembers: '/admin/restore',
//   },
//   users: {
//     changePassword: '/users/change-password',
//     createJob: '/user/job',
//     users: '/users/me',
//     creatCv: '/user/cv',
//   },
//   home: {
//     posts: '/users/home',
//   },
//   posts: {
//     getEventPosts: '/user/events',
//     getJobPosts: '/user/jobs',
//     like: '/reaction/react',
//     getlike: '/reaction/get-all',
//     dellike: '/reaction/delete',
//     getdetail: '/user/event',
//     createcomment: 'user/comment',
//     getmypost: 'user/job/my-jobs',
//     updatepost: 'user/job',
//     downloadCv: 'user/cv/download',
//   },
//   user: {
//     info: '/users/me',
//     update: '/users/me',
//     total: '/users',
//   },
//   adminPost: {
//     getAllPost: '/user/jobs',
//     getDetailpost: '/user/job',
//     deletePost: '/user/job',
//   },
//   adminComment: {
//     deleteComment: '/user/comment',
//   },
// }

export const ApiConstants = {
  // Nhóm Auth & User Info -> Trỏ về auth_user.json
  auth: {
    login: '/mock-data/auth_user.json',
    forgotpassword: '/mock-data/auth_user.json',
    admin: '/mock-data/auth_user.json',
  },
  admin: {
    getAdmin: '/mock-data/auth_user.json',
  },
  users: {
    changePassword: '/mock-data/auth_user.json',
    users: '/mock-data/auth_user.json',
    createJob: '/mock-data/posts.json', // Giả lập tạo job trả về list job
    creatCv: '/mock-data/posts.json',
  },
  user: {
    info: '/mock-data/auth_user.json',
    update: '/mock-data/auth_user.json',
    total: '/mock-data/auth_user.json',
  },

  // Nhóm Events -> Trỏ về events.json
  events: {
    updateEvents: '/mock-data/events.json',
    getDetaiEvents: '/mock-data/events.json',
    createEvents: '/mock-data/events.json',
    getAllEvents: '/mock-data/events.json',
    deleteEvents: '/mock-data/events.json',
  },

  // Nhóm Members -> Trỏ về members.json
  members: {
    updateMembers: '/mock-data/members.json',
    importMembers: '/mock-data/members.json',
    createMembers: '/mock-data/members.json',
    getAllMembers: '/mock-data/members.json',
    deleteMembers: '/mock-data/members.json',
    detailMembers: '/mock-data/members.json', // Lấy chi tiết cũng trả về list (fake tạm)
    restoreMembers: '/mock-data/members.json',
  },

  // Nhóm Posts (Home, Job, Reaction) -> Trỏ về posts.json
  home: {
    posts: '/mock-data/posts.json',
  },
  posts: {
    getEventPosts: '/mock-data/events.json', // Lấy post sự kiện thì trỏ về events
    getJobPosts: '/mock-data/posts.json',
    like: '/mock-data/posts.json',
    getlike: '/mock-data/posts.json',
    dellike: '/mock-data/posts.json',
    getdetail: '/mock-data/posts.json', // Hoặc events.json tùy logic
    createcomment: '/mock-data/comments.json',
    getmypost: '/mock-data/posts.json',
    updatepost: '/mock-data/posts.json',
    downloadCv: '/mock-data/posts.json',
    deleteCommentApi: '/mock-data/comments.json',
  },
  adminPost: {
    getAllPost: '/mock-data/posts.json',
    getDetailpost: '/mock-data/posts.json',
    deletePost: '/mock-data/posts.json',
  },

  // Nhóm Comment -> Trỏ về comments.json
  adminComment: {
    deleteComment: '/mock-data/comments.json',
  },
}
