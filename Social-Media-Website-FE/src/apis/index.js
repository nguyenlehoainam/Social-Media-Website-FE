// import axios from 'axios'
// import { LocalStorage } from '../constants/localStorage.constant'
// import { useNavigate } from 'react-router-dom'

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_SERVER}`,

//   headers: {
//     'Content-Type': 'Application/json',
//   },
// })
// api.interceptors.request.use((config) => {
//   const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token
//   config.headers.Authorization = `Bearer ${accessToken}`
//   return config
// }, Promise.reject)

// api.interceptors.response.use(
//   (value) => value.data,
//   (error) => {
//     if (error.code === 401) {
//       const navigate = useNavigate()
//       localStorage.removeItem(LocalStorage.auth)
//       navigate('/login')
//     }
//     return Promise.reject(error)
//   },
// )

// // Axios config
// const apiDefault = axios.create({
//   baseURL: `${import.meta.env.VITE_API_SERVER}`,
//   headers: {
//     'Content-Type': 'Application/json',
//   },
// })

// const apiDefaultUpload = axios.create({
//   baseURL: `${import.meta.env.VITE_API_SERVER}`,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// })

// apiDefaultUpload.interceptors.request.use((config) => {
//   const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token
//   config.headers.Authorization = `Bearer ${accessToken}`
//   return config
// }, Promise.reject)

// apiDefaultUpload.interceptors.response.use(
//   (value) => value.data,
//   (error) => {
//     if (error.code === 401) {
//       const navigate = useNavigate()
//       localStorage.removeItem(LocalStorage.auth)
//       navigate('/login')
//     }
//     return Promise.reject(error)
//   },
// )
// const apiDefaultDownload = axios.create({
//   baseURL: `${import.meta.env.VITE_API_SERVER}`,
//   headers: {
//     'Content-Type': 'Application/json',
//   },
//   responseType: 'blob',
// })

// apiDefaultDownload.interceptors.request.use((config) => {
//   const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token
//   config.headers.Authorization = `Bearer ${accessToken}`
//   return config
// }, Promise.reject)

// apiDefaultDownload.interceptors.response.use(
//   (value) => value,
//   (error) => {
//     if (error.code === 401) {
//       const navigate = useNavigate()
//       localStorage.removeItem(LocalStorage.auth)
//       navigate('/login')
//     }
//     return Promise.reject(error)
//   },
// )

// export { apiDefault, api, apiDefaultUpload, apiDefaultDownload }

import axios from 'axios'
import { LocalStorage } from '../constants/localStorage.constant'
// Xóa dòng import useNavigate vì không dùng được ở đây
// import { useNavigate } from 'react-router-dom'

const baseURL = import.meta.env.VITE_API_SERVER

// --- 1. Tạo các instance ---
const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

const apiDefault = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

const apiDefaultUpload = axios.create({
  baseURL,
  headers: { 'Content-Type': 'multipart/form-data' },
})

const apiDefaultDownload = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'blob',
})

// --- 2. Hàm xử lý logic chung (Tránh lặp code) ---

// Hàm gắn Token vào Header
const authRequestInterceptor = (config) => {
  const authData = localStorage.getItem(LocalStorage.auth)
  if (authData) {
    const parsedData = JSON.parse(authData)
    if (parsedData?.token) {
      config.headers.Authorization = `Bearer ${parsedData.token}`
    }
  }
  return config
}

// Hàm xử lý lỗi 401 (Hết hạn phiên đăng nhập)
const authResponseErrorInterceptor = (error) => {
  // SỬA LỖI: Check status code thay vì error.code
  if (error.response && error.response.status === 401) {
    // Xóa token cũ
    localStorage.removeItem(LocalStorage.auth)

    // SỬA LỖI: Dùng window.location thay vì useNavigate
    // Lưu ý: Cách này sẽ reload lại trang, nhưng an toàn trong file JS thường
    window.location.href = '/login'
  }
  return Promise.reject(error)
}

// --- 3. Áp dụng Interceptor cho các instance cần Auth ---

// Instance API thường
api.interceptors.request.use(authRequestInterceptor, Promise.reject)
api.interceptors.response.use((response) => response.data, authResponseErrorInterceptor)

// Instance Upload
apiDefaultUpload.interceptors.request.use(authRequestInterceptor, Promise.reject)
apiDefaultUpload.interceptors.response.use(
  (response) => response.data,
  authResponseErrorInterceptor,
)

// Instance Download
apiDefaultDownload.interceptors.request.use(authRequestInterceptor, Promise.reject)
apiDefaultDownload.interceptors.response.use((response) => response, authResponseErrorInterceptor) // Download cần giữ nguyên response để lấy blob

export { apiDefault, api, apiDefaultUpload, apiDefaultDownload }
