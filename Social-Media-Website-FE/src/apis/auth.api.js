// import { apiDefault, api } from '.'
// import { ApiConstants } from '../constants/api.constant'

// const authApi = () => ({
//   login: async ({ username, password }) =>
//     apiDefault.post(ApiConstants.auth.login, {
//       username,
//       password,
//     }),
//   Me: () => apiDefault.get(ApiConstants.users.getMe),
//   forgotPassword: ({ username, email }) =>
//     apiDefault.post(ApiConstants.auth.forgotpassword, {
//       username,
//       email,
//     }),
//   changePassword: async ({ oldPassword, newPassword }) =>
//     api.put(ApiConstants.users.changePassword, {
//       oldPassword,
//       newPassword,
//     }),
// })

// export const { login, forgotPassword, changePassword } = authApi()
import { apiDefault, api } from '.'
import { ApiConstants } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ username, password }) => {
    // --- CÁCH FIX CỨNG: Trả về dữ liệu luôn, không cần gọi file JSON ---
    // Giả lập đợi 1 chút cho giống thật
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log('Đang đăng nhập với user:', username)

    // Logic giả lập: Nếu user chứa chữ "admin" thì là BQT, còn lại là TV
    const role = username.toLowerCase().includes('admin') ? 'BQT' : 'TV'
    const fullName = role === 'BQT' ? 'Quản Trị Viên' : 'Thành Viên Mới'

    // Return đúng cấu trúc mà LoginPage đang đợi
    return {
      token: 'fake-jwt-token-123456789',
      user: {
        id: 'u1',
        username: username,
        fullName: fullName,
        role: role,
        avatar: 'https://ui-avatars.com/api/?name=' + fullName,
      },
    }
  },

  Me: () => apiDefault.get(ApiConstants.users.users), // Sửa key cho khớp constant

  // MOCK: Đổi post thành get
  forgotPassword: ({ username, email }) => apiDefault.get(ApiConstants.auth.forgotpassword),

  // MOCK: Đổi put thành get
  changePassword: async ({ oldPassword, newPassword }) =>
    api.get(ApiConstants.users.changePassword),
})

export const { login, forgotPassword, changePassword } = authApi()
