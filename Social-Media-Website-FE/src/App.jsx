import LoginPage from './pages/LoginPage/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import MainLayout from './layouts/MainLayout/MainLayout'
import { useRoutes, Navigate, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'
import Dashboard from './pages/Admin/dashboard/Dashboard'
import MemberForm from './components/admin/member/MemberForm'
import Members from './pages/Admin/members/Members'
import Events from './pages/Admin/events/Events'
import EventForm from './components/admin/event/EventForm'
import LayoutAdmin from './layouts/LayoutAdmin/LayoutAdmin'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Post from './pages/Admin/post/Post'
import DetailPost from './pages/Admin/post/DetailPost'
import toast, { Toaster } from 'react-hot-toast'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import EventPage from './pages/EventPage/eventPage'
import UserHomePage from './pages/userHomePage/userHomePage'
import MyPosts from './components/myPosts/myPosts'
import JobPage from './pages/JobPage/jobPage'

function App() {
  const currentUser = useAuth()
  const role = currentUser.user?.role || []
  const isAdmin = role.includes('BQT')
  const location = useLocation()
  const path = location.pathname
  const naviagate = useNavigate()
  useEffect(() => {
    if (!isAdmin && path.startsWith('/admin')) {
      naviagate('/')
    }
  }, [isAdmin, path, naviagate, role])

  const elements = useRoutes([
    {
      path: '/admin',
      element: isAdmin ? <LayoutAdmin /> : <MainLayout />,
      children: [
        {
          path: '',
          element: <Members />,
        },
        // {
        //   path: 'dashboard',
        //   element: <Dashboard />,
        // },
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
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'home',
          element: <UserHomePage />,
          index: true,
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
          element: <MyPosts />,
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
