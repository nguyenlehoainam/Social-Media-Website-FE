import './header.scss'
import logo from '../../assets/images/logo.png'
import { CaretDown, List, X } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { info } from '../../apis/userProfile.api'
const Header = () => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState
  const [infoUser, setInfoUser] = useState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()
  const authen = useAuth()
  const handleLogout = () => {
    authen.clearUser()
    navigate('/')
    toast.success('Đăng xuất thành công')
  }
  const handleInfor = () => {
    navigate('/profile')
  }
  const fetchUser = async () => {
    try {
      const response = await info()
      const userData = response?.data
      setInfoUser(userData)
    } catch (err) {
      toast.error('lỗi')
    }
  }
  useEffect(() => {
    if (currentUser) {
      fetchUser()
    }
  }, [currentUser])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])
  return (
    <header className='main-header'>
      <div className='header-left'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>
      </div>
      {/* Thêm class is-open khi state là true */}
      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
        <div className='mobile-menu-header'>
          <span>Menu</span>
          <X className='close-icon' onClick={() => setIsMenuOpen(false)} />
        </div>
        <ul>
          <li>
            <NavLink to='/home' end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/my-posts' end className={({ isActive }) => (isActive ? 'active' : '')}>
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink to='/event' className={({ isActive }) => (isActive ? 'active' : '')}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to='/job' className={({ isActive }) => (isActive ? 'active' : '')}>
              Recruitment
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='header-right'>
        {/* <div className='search-icon'>
          <Search size={22} />
        </div>
        <div className='notification-icon'>
          <Envelope size={22} />
          <span className='badge'></span>
        </div>
        <div className='messages-icon'>
          <Bell size={22} />
          <span className='badge'></span>
        </div> */}
        <div className='profile-dropdown'>
          <div className='profile-avatar'>
            <img src={infoUser ? infoUser.avatarUrl : currentUser.avatarUrl} />
            <div className='profile-menu'>
              <ul>
                <li onClick={handleInfor}>Thông tin cá nhân</li>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            </div>
          </div>
          <div className='caret-down-container'>
            <div className='caret-down'>
              <CaretDown size={20} />
              <div className='profile-menu'></div>
            </div>
          </div>
        </div>
        <div className='hamburger-menu' onClick={() => setIsMenuOpen(true)}>
          <List size={32} />
        </div>
      </div>
      {isMenuOpen && <div className='nav-overlay' onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  )
}

export default Header
