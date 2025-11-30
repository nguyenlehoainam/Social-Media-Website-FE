// import './header.scss'
// import logo from '../../assets/images/logo.png'
// import { CaretDown, List, X } from 'react-bootstrap-icons'
// import { useNavigate } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
// import useAuth from '../../hooks/useAuth'
// import toast from 'react-hot-toast'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { info } from '../../apis/userProfile.api'
// const Header = () => {
//   const authState = useSelector((state) => state.auth.auth)
//   const currentUser = authState
//   const [infoUser, setInfoUser] = useState()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const navigate = useNavigate()
//   const authen = useAuth()
//   const handleLogout = () => {
//     authen.clearUser()
//     navigate('/')
//     toast.success('Đăng xuất thành công')
//   }
//   const handleInfor = () => {
//     navigate('/profile')
//   }
//   const fetchUser = async () => {
//     try {
//       const response = await info()
//       const userData = response?.data
//       setInfoUser(userData)
//     } catch (err) {
//       toast.error('lỗi')
//     }
//   }
//   useEffect(() => {
//     if (currentUser) {
//       fetchUser()
//     }
//   }, [currentUser])

//   useEffect(() => {
//     setIsMenuOpen(false)
//   }, [location.pathname])
//   return (
//     <header className='main-header'>
//       <div className='header-left'>
//         <div className='logo'>
//           <img src={logo} alt='' />
//         </div>
//       </div>
//       {/* Thêm class is-open khi state là true */}
//       <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
//         <div className='mobile-menu-header'>
//           <span>Menu</span>
//           <X className='close-icon' onClick={() => setIsMenuOpen(false)} />
//         </div>
//         <ul>
//           <li>
//             <NavLink to='/home' end className={({ isActive }) => (isActive ? 'active' : '')}>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to='/my-posts' end className={({ isActive }) => (isActive ? 'active' : '')}>
//               My Posts
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to='/event' className={({ isActive }) => (isActive ? 'active' : '')}>
//               Events
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to='/job' className={({ isActive }) => (isActive ? 'active' : '')}>
//               Recruitment
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//       <div className='header-right'>
//         {/* <div className='search-icon'>
//           <Search size={22} />
//         </div>
//         <div className='notification-icon'>
//           <Envelope size={22} />
//           <span className='badge'></span>
//         </div>
//         <div className='messages-icon'>
//           <Bell size={22} />
//           <span className='badge'></span>
//         </div> */}
//         <div className='profile-dropdown'>
//           <div className='profile-avatar'>
//             <img src={infoUser ? infoUser.avatarUrl : currentUser.avatarUrl} />
//             <div className='profile-menu'>
//               <ul>
//                 <li onClick={handleInfor}>Thông tin cá nhân</li>
//                 <li onClick={handleLogout}>Đăng xuất</li>
//               </ul>
//             </div>
//           </div>
//           <div className='caret-down-container'>
//             <div className='caret-down'>
//               <CaretDown size={20} />
//               <div className='profile-menu'></div>
//             </div>
//           </div>
//         </div>
//         <div className='hamburger-menu' onClick={() => setIsMenuOpen(true)}>
//           <List size={32} />
//         </div>
//       </div>
//       {isMenuOpen && <div className='nav-overlay' onClick={() => setIsMenuOpen(false)}></div>}
//     </header>
//   )
// }

// export default Header

import './header.scss'
import logo from '../../assets/images/logo.png'
import { CaretDown, List, X } from 'react-bootstrap-icons'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { info } from '../../apis/userProfile.api'

const Header = () => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState || {}

  const [infoUser, setInfoUser] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
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

      // SỬA: Dựa vào JSON bạn cung cấp, thông tin user nằm trong key "me"
      // Nếu không tìm thấy "me", fallback về "loginResponse.user" hoặc chính "response"
      const userData = response.me || response.loginResponse?.user || response || {}

      console.log('User Info loaded:', userData) // Debug để chắc chắn lấy đúng
      setInfoUser(userData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authState) {
      fetchUser()
    }
  }, [authState])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // SỬA: Mapping đúng key "avatar" từ JSON
  const userAvatar =
    infoUser?.avatar || // Ưu tiên lấy từ API info (cục "me")
    infoUser?.avatarUrl || // Fallback key cũ
    currentUser?.avatar || // Lấy từ Redux
    currentUser?.user?.avatar || // Lấy từ Redux (nếu lồng trong user)
    'https://via.placeholder.com/150'

  return (
    <header className='main-header'>
      <div className='header-left'>
        <div className='logo'>
          <img src={logo} alt='Logo' />
        </div>
      </div>

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
          {/* <li>
            <NavLink to='/event' className={({ isActive }) => (isActive ? 'active' : '')}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to='/job' className={({ isActive }) => (isActive ? 'active' : '')}>
              Recruitment
            </NavLink>
          </li> */}
        </ul>
      </nav>

      <div className='header-right'>
        <div className='profile-dropdown'>
          <div className='profile-avatar'>
            {/* Hiển thị Avatar */}
            <img
              src={userAvatar}
              alt='Avatar'
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150'
              }}
            />

            <div className='profile-menu'>
              <ul>
                <li onClick={handleInfor}>
                  {/* Hiển thị tên (Optional) */}
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 'bold',
                      borderBottom: '1px solid #eee',
                      paddingBottom: '5px',
                      marginBottom: '5px',
                    }}>
                    {infoUser.fullName || currentUser.fullName || 'User'}
                  </span>
                  Thông tin cá nhân
                </li>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            </div>
          </div>

          <div className='caret-down-container'>
            <div className='caret-down'>
              <CaretDown size={20} />
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
