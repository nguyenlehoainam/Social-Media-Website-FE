import React, { useState } from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

// Import hooks và api của bạn
import useAuth from '../../hooks/useAuth'
import { login } from '../../apis/auth.api'

// Import file SCSS (dùng file scss của đoạn 2)
import './LoginPage.scss'

const LoginPage = () => {
  // --- PHẦN LOGIC TỪ CODE 1 ---
  const authen = useAuth()
  const navigate = useNavigate()

  // State
  const [msv, setMsv] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShow, setPasswordShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toogglePassword = () => {
    setPasswordShow(!passwordShow)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Gọi API login
      const response = await login({ username: msv, password: password })

      if (response && response.data.data.token) {
        authen.saveUser({ token: response.data.data.token, role: response.data.data.role })

        // Phân quyền điều hướng
        if (response.data.data.role.includes('BQT')) {
          navigate('/admin')
          toast.success('Đăng nhập thành công')
        }
        if (response.data.data.role.includes('TV')) {
          navigate('/home')
          toast.success('Đăng nhập thành công')
        }
      } else {
        toast.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.')
      }
    } catch (error) {
      toast.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.')
    } finally {
      setIsLoading(false)
    }
  }

  // --- PHẦN GIAO DIỆN TỪ CODE 2 (Đã gắn Logic) ---
  return (
    <div className='login-page'>
      <div className='login-page-container'>
        <div className='login-card'>
          {/* Header styled theo Code 2 nhưng nội dung của Code 1 */}
          <div className='login-header'>
            <h1>Welcome to HIT NETWORK</h1>
            <p>Sign in to continue to your account</p>
          </div>

          <form className='login-form' onSubmit={handleSubmit}>
            {/* Input MSV / Username */}
            <div className='input-group'>
              <div>
                <label htmlFor='msv'>Username / MSV</label>
              </div>
              <input
                id='msv'
                name='msv'
                type='text'
                autoComplete='username'
                required
                placeholder='Nhập mã sinh viên...'
                value={msv}
                onChange={(e) => setMsv(e.target.value)}
              />
            </div>

            {/* Input Password */}
            <div className='input-group'>
              <div className='password-label'>
                <label htmlFor='password'>Password</label>
              </div>

              {/* Wrapper để chứa icon mắt */}
              <div style={{ position: 'relative' }}>
                <input
                  id='password'
                  name='password'
                  type={passwordShow ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  style={{ paddingRight: '40px' }} // Chừa chỗ cho icon
                />

                {/* Icon ẩn hiện pass */}
                <span onClick={toogglePassword} className='toggle-icon'>
                  {passwordShow ? <EyeSlash size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className='input-group'>
              <button type='submit' disabled={isLoading}>
                {isLoading ? 'Đang xử lý...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Footer Links - Dùng Link thay cho a href */}
          <p className='footer-text'>
            <Link to='/register'>Register!</Link>
            <Link to='/forgotpassword'>Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
