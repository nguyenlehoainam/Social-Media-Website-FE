// import LoginPage from './pages/LoginPage/LoginPage'
// import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
// import MainLayout from './layouts/MainLayout/MainLayout'
// import { useRoutes, Navigate, Routes, useLocation, useNavigate } from 'react-router-dom'
// import './App.scss'
// import Dashboard from './pages/Admin/dashboard/Dashboard'
// import MemberForm from './components/admin/member/MemberForm'
// import Members from './pages/Admin/members/Members'
// import Events from './pages/Admin/events/Events'
// import EventForm from './components/admin/event/EventForm'
// import LayoutAdmin from './layouts/LayoutAdmin/LayoutAdmin'
// import ProfilePage from './pages/ProfilePage/ProfilePage'
// import Post from './pages/Admin/post/Post'
// import DetailPost from './pages/Admin/post/DetailPost'
// import toast, { Toaster } from 'react-hot-toast'
// import useAuth from './hooks/useAuth'
// import { useEffect } from 'react'
// import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
// import EventPage from './pages/EventPage/EventPage'
// import UserHomePage from './pages/UserHomePage/UserHomePage'
// import MyPosts from './components/myPosts/MyPosts'
// import JobPage from './pages/jobPage/JobPage'

// function App() {
//   const currentUser = useAuth()
//   const role = currentUser.user?.role || []
//   const isAdmin = role.includes('BQT')
//   const location = useLocation()
//   const path = location.pathname
//   const naviagate = useNavigate()
//   useEffect(() => {
//     if (!isAdmin && path.startsWith('/admin')) {
//       naviagate('/')
//     }
//   }, [isAdmin, path, naviagate, role])

//   const elements = useRoutes([
//     {
//       path: '/admin',
//       element: isAdmin ? <LayoutAdmin /> : <MainLayout />,
//       children: [
//         {
//           path: '',
//           element: <Members />,
//         },
//         // {
//         //   path: 'dashboard',
//         //   element: <Dashboard />,
//         // },
//         {
//           path: 'members',
//           element: <Members />,
//         },
//         {
//           path: 'members/create',
//           element: <MemberForm modal='add' />,
//         },
//         {
//           path: 'members/edit/:id',
//           element: <MemberForm modal='edit' />,
//         },
//         {
//           path: 'events',
//           element: <Events />,
//         },
//         {
//           path: 'events/create',
//           element: <EventForm modal='add' />,
//         },
//         {
//           path: 'events/edit/:id',
//           element: <EventForm modal='edit' />,
//         },
//         {
//           path: 'posts',
//           element: <Post />,
//         },
//         {
//           path: 'post/detail/:id',
//           element: <DetailPost />,
//         },
//       ],
//     },
//     {
//       path: '/',
//       element: <LoginPage />,
//     },
//     {
//       path: '/forgotpassword',
//       element: <ForgotPasswordPage />,
//     },
//     {
//       path: '/',
//       element: <MainLayout />,
//       children: [
//         {
//           path: 'home',
//           element: <UserHomePage />,
//           index: true,
//         },
//         {
//           path: 'event',
//           element: <EventPage />,
//         },
//         {
//           path: 'job',
//           element: <JobPage />,
//         },
//         {
//           path: 'profile',
//           element: <ProfilePage />,
//         },
//         {
//           path: 'my-posts',
//           element: <MyPosts />,
//         },
//       ],
//     },
//   ])
//   return (
//     <>
//       <Toaster position='top-right' reverseOrder={false} />
//       {elements}
//       <ScrollToTopButton />
//     </>
//   )
// }
// export default App

import LoginPage from './pages/LoginPage/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import MainLayout from './layouts/MainLayout/MainLayout'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'
// import Dashboard from './pages/Admin/dashboard/Dashboard' // Tạm thời comment nếu chưa dùng
import MemberForm from './components/admin/member/MemberForm'
import Members from './pages/Admin/members/Members'
import Events from './pages/Admin/events/Events'
import EventForm from './components/admin/event/EventForm'
import LayoutAdmin from './layouts/LayoutAdmin/LayoutAdmin'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Post from './pages/Admin/post/Post'
import DetailPost from './pages/Admin/post/DetailPost'
import { Toaster } from 'react-hot-toast'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import EventPage from './pages/EventPage/EventPage'
import UserHomePage from './pages/UserHomePage/UserHomePage'
import JobPage from './pages/jobPage/JobPage'
import Myposts from './pages/my-posts/Myposts'
import RegisterPage from './pages/RegisterPage/RegisterPage'

function App() {
  const { user } = useAuth() // Destructure user trực tiếp từ hook
  const location = useLocation()
  const navigate = useNavigate()

  // --- LOGIC CHECK QUYỀN (Tương thích Mock Data) ---
  // Mock data role có thể là string "ADMIN" hoặc array ["BQT"]
  const role = user?.role

  // Admin là khi role chứa 'BQT' hoặc chính xác là 'ADMIN'
  const isAdmin =
    (Array.isArray(role) && role.includes('BQT')) || role === 'BQT' || role === 'ADMIN'

  // --- LOGIC BẢO VỆ ROUTE (Guard) ---
  useEffect(() => {
    const path = location.pathname

    // 1. Chưa đăng nhập mà cố vào trang nội bộ (home, admin, profile...)
    // thì đá về Login
    const protectedPaths = ['/home', '/admin', '/profile', '/my-posts', '/event', '/job']
    const isProtected = protectedPaths.some((p) => path.startsWith(p))

    if (!user && isProtected) {
      navigate('/')
      return
    }

    // 2. Đã đăng nhập nhưng cố vào trang Login
    // thì đá về trang chủ tương ứng
    if (user && path === '/') {
      if (isAdmin) navigate('/admin')
      else navigate('/home')
      return
    }

    // 3. User thường mà cố vào trang Admin
    // thì đá về Home
    if (user && !isAdmin && path.startsWith('/admin')) {
      navigate('/home')
    }
  }, [user, isAdmin, location.pathname, navigate])

  const elements = useRoutes([
    // --- ROUTE ADMIN ---
    {
      path: '/admin',
      // Chỉ render LayoutAdmin nếu là Admin, ngược lại null (để useEffect xử lý redirect)
      element: isAdmin ? <LayoutAdmin /> : null,
      children: [
        {
          path: '',
          element: <Members />, // Mặc định vào members
        },
        {
          path: 'members',
          element: <Members />,
        },
        {
          path: 'members/create',
          element: <MemberForm modal='add' />,
        },
        {
          path: 'members/edit/:id',
          element: <MemberForm modal='edit' />,
        },
        {
          path: 'events',
          element: <Events />,
        },
        {
          path: 'events/create',
          element: <EventForm modal='add' />,
        },
        {
          path: 'events/edit/:id',
          element: <EventForm modal='edit' />,
        },
        {
          path: 'posts',
          element: <Post />,
        },
        {
          path: 'post/detail/:id',
          element: <DetailPost />,
        },
      ],
    },
    // --- ROUTE PUBLIC ---
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPasswordPage />,
    },
    // --- ROUTE USER (MainLayout) ---
    {
      path: '/', // Layout này sẽ render cho các path con bên dưới
      element: <MainLayout />,
      children: [
        {
          path: 'home',
          element: <UserHomePage />,
        },
        {
          path: 'event',
          element: <EventPage />,
        },
        {
          path: 'job',
          element: <JobPage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
        {
          path: 'my-posts',
          element: <Myposts />,
        },
      ],
    },
  ])

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      {elements}
      <ScrollToTopButton />
    </>
  )
}

export default App
