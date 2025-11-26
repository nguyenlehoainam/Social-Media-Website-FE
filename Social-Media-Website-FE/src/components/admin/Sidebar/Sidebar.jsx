import React from 'react'
import './Sidebar.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from '../../../assets/images/LogoWhite.png'
import { AiFillHome } from 'react-icons/ai'
import { FaUserGroup } from 'react-icons/fa6'
import { BiSolidCalendarMinus } from 'react-icons/bi'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { FaPen } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const handleLogOut = () => {
    auth.clearUser()
    navigate('/')
    toast.success('Đăng xuất thành công!!')
  }

  return (
    <div className='admin__sidebar'>
      <div className='admin__sidebar__image'>
        <img src={Logo} alt='Logo clb' />
      </div>
      <ul className='admin__sidebar__menu'>
        {/* <li
          className={location.pathname === "/admin/dashboard" ? "active" : ""}
          onClick={() => navigate('/admin/dashboard')}
        >
          <AiFillHome size={30}/> <p>Thống kê</p>
        </li> */}
        <li
          className={location.pathname === '/admin/members' ? 'active' : ''}
          onClick={() => navigate('/admin/members')}>
          <FaUserGroup size={30} /> <p>Quản lý thành viên</p>
        </li>
        <li
          className={location.pathname === '/admin/events' ? 'active' : ''}
          onClick={() => navigate('/admin/events')}>
          <BiSolidCalendarMinus size={30} /> <p>Quản lý sự kiện</p>
        </li>
        <li
          className={location.pathname === '/admin/posts' ? 'active' : ''}
          onClick={() => navigate('/admin/posts')}>
          <FaPen size={23} /> <p>Quản lý bài đăng</p>
        </li>
        <li onClick={handleLogOut}>
          <RiLogoutBoxRFill size={30} /> <p>Đăng xuất</p>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
