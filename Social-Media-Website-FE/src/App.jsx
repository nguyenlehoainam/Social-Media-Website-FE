import LoginPage from './pages/LoginPage/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import MainLayout from './layouts/mainLayout/mainLayout'
import UserHomePage from './pages/userHomePage/userHomePage'
import { useRoutes, Navigate, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'
import Dashboard from './pages/Admin/dashboard/Dashboard'
import MemberForm from './components/admin/member/MemberForm'
import Members from './pages/Admin/members/Members'
import Events from './pages/Admin/events/Events'
import EventForm from './components/admin/event/EventForm'
import LayoutAdmin from './layouts/LayoutAdmin/LayoutAdmin'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import toast, { Toaster } from 'react-hot-toast'
import EventPage from './pages/eventPage/eventPage'
import JobPage from './pages/jobPage/jobPage'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
function App() {
  const currentUser = useAuth()
  const role = currentUser.user?.role || []
  const isAdmin = role.includes('BQT')
  const location = useLocation()
  const path = location.pathname
  const naviagate = useNavigate()
  console.log('role: ', role)
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
          element: <Dashboard />,
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
      ],
    },
  ])
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      {elements}
    </>
  )
}
export default App
