import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, Radio, Space, Button, Spin, Upload } from 'antd'
import dayjs from 'dayjs'
import './ProfilePage.scss'
import { info, update } from '../../apis/userProfile.api'
import { changePassword } from '../../apis/auth.api'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const [action, setAction] = useState('info')
  const [hoverIndex, setHoverIndex] = useState(null)
  const [infoUser, setInfoUser] = useState()
  const [editForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [isLoading, setIsLoading] = useState(true)

  // Get api lay thong tin nguoi dung
  const fetchGetUser = async () => {
    try {
      const response = await info()
      const userData = response?.data
      setInfoUser(userData)
      editForm.setFieldsValue({
        fullName: userData.fullName || '',
        gender: userData.gender || '',
        dob: userData.dob ? dayjs(userData.dob) : null,
        email: userData.email || '',
        username: userData.username || '',
        phone: userData.phone || '',
        avatar: userData.avatarUrl
          ? [
              {
                name: 'avatar.jpg',
                url: userData.avatarUrl,
              },
            ]
          : [],
      })
    } catch (error) {
      console.error('Lỗi: ', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGetUser()
  }, [])

  const handleUpdateProfile = async (values) => {
    console.log(values.avatarUrl)
    const formData = new FormData()
    formData.append('fullName', values.fullName)
    formData.append('gender', values.gender)
    formData.append('dob', values.dob?.format('YYYY-MM-DD'))
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    const file = values.avatarUrl?.[0]?.originFileObj
    if (file) {
      formData.append('avatar', file)
    }
    try {
      await update(formData)
      console.log('ádasd', formData)
      await fetchGetUser()
      setAction('info')
      alert('Cập nhật thành công!')
    } catch {
      alert('Cap nhat nguoi dung that bai')
      console.log('ádasd', formData)
    }
  }
  const handleChangePassword = async (values) => {
    console.log('Đang thử đổi mật khẩu với giá trị:', values)
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
      toast.success('Đổi mật khẩu thành công!')
      passwordForm.resetFields()
      setAction('info')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
      toast.error(errorMessage)
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <Spin size='large' />
      </div>
    )
  }
  if (!infoUser) {
    return <div className='profile-loading'>Không thể tải dữ liệu người dùng.</div>
  }
  const menuItems = [
    { key: 'info', label: 'Thông tin cá nhân' },
    { key: 'edit', label: 'Chỉnh sửa thông tin' },
    { key: 'changePassword', label: 'Đổi mật khẩu' },
  ]

  return (
    <div className='profile-page'>
      {/* Phần header card */}
      <div className='profile-header-card'>
        <div className='header-user-info'>
          {/* <img src={avatar} alt='avatar' className='user-avatar' /> */}
          <img
            src={infoUser.avatarUrl}
            alt=''
            style={{ width: '100px', height: '100px', borderRadius: '100%' }}
          />
          <div className='user-details'>
            <p className='user-name'>{infoUser?.fullName}</p>
            <p className='user-email'>{infoUser?.email}</p>
          </div>
        </div>
        <div className='header-stats'>
          <div className='stats-item'>
            <p>20</p>
            <p>Posts</p>
          </div>
          <div className='stats-item'>
            <p>30</p>
            <p>Recruitment</p>
          </div>
          <div className='stats-item'>
            <p>50</p>
            <p>Apply</p>
          </div>
        </div>
      </div>

      {/* Phần nội dung chính */}
      <div className='profile-main-section'>
        {/* Sidebar */}
        <div className='profile-sidebar'>
          <ul className='sidebar-menu'>
            {menuItems.map((item, index) => (
              <li
                key={item.key}
                className={`menu-item ${hoverIndex === index ? 'hovered' : ''} ${
                  action === item.key && hoverIndex === null ? 'active' : ''
                }`}
                onClick={() => setAction(item.key)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className='profile-content-area'>
          {/* Xem thong tin tai khoan */}
          {action === 'info' && (
            <>
              <h4 className='content-title'>Thông tin cá nhân</h4>
              <div className='info-display'>
                <div className='info-item'>
                  <div className='info-item--p'>
                    <p>Họ và tên:</p>
                    <p>{infoUser?.fullName}</p>
                  </div>
                </div>
                <div className='info-item'>
                  <div className='info-item--p'>
                    <p>Giới tính:</p>
                    <p>{infoUser?.gender}</p>
                  </div>
                </div>
                <div className='info-item'>
                  <div className='info-item--p'>
                    <p>Ngày sinh:</p>
                    <p>{dayjs(infoUser?.dob).format('DD/MM/YYYY')}</p>
                  </div>
                </div>
                <div className='info-item'>
                  <div className='info-item--p'>
                    <p>Email:</p>
                    <p>{infoUser?.email}</p>
                  </div>
                </div>
                <div className='info-item'>
                  <div className='info-item--p'>
                    <p>Tên tài khoản:</p>
                    <p>{infoUser?.username}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Chỉnh sủa thông tin người dùng */}
          {action === 'edit' && (
            <>
              <h4 className='content-title'>Chỉnh sửa thông tin cá nhân</h4>
              <Form
                form={editForm}
                onFinish={handleUpdateProfile}
                className='edit-form'
                layout='vertical'>
                <Form.Item
                  label='Họ và tên'
                  name='fullName'
                  rules={[{ required: true, message: 'Hãy nhập họ và tên' }]}>
                  <Input className='edit-input' placeholder='Nhập họ và tên' />
                </Form.Item>
                <Form.Item label='Giới tính' name='gender'>
                  <Radio.Group>
                    <Radio value='MALE'>Nam</Radio>
                    <Radio value='FEMALE'>Nữ</Radio>
                    <Radio value='OTHER'>Khác</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label='Ngày sinh'
                  name='dob'
                  rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
                  <DatePicker className='edit-datepicker' placeholder='Chọn ngày sinh' />
                </Form.Item>
                <Form.Item
                  label='Số điện thoại'
                  name='phone'
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                  <Input className='edit-input' placeholder='Nhập số điện thoại' />
                </Form.Item>

                <Form.Item
                  label='Ảnh đại diện'
                  name='avatar'
                  valuePropName='fileList'
                  getValueFromEvent={(e) => e && e.fileList}>
                  <Upload listType='picture' maxCount={1} beforeUpload={() => false}>
                    <Button>Chọn ảnh</Button>
                  </Upload>
                </Form.Item>

                <Form.Item label='Email' name='email'>
                  <Input className='edit-input' disabled />
                </Form.Item>
                <Form.Item label='Tên tài khoản' name='username'>
                  <Input className='edit-input' disabled />
                </Form.Item>
                <Form.Item className='form-buttons'>
                  <Space>
                    <Button onClick={() => editForm.resetFields()} className='cancel-button'>
                      Hủy
                    </Button>
                    <Button type='primary' htmlType='submit' className='submit-button'>
                      Xác nhận
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}

          {/* Đổi mật khẩu */}
          {action === 'changePassword' && (
            <>
              <h4 className='content-title'>Đổi mật khẩu</h4>
              <Form
                form={passwordForm}
                onFinish={handleChangePassword}
                className='edit-form'
                layout='vertical'>
                {/* Các Form.Item không thay đổi... */}
                <Form.Item
                  id='change-password-form'
                  label='Nhập mật khẩu cũ'
                  name='oldPassword'
                  rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ' }]}>
                  <Input.Password className='edit-input' />
                </Form.Item>
                <Form.Item
                  label='Nhập mật khẩu mới'
                  name='newPassword'
                  rules={[{ required: true, message: 'Hãy nhập mật khẩu mới' }]}>
                  <Input.Password className='edit-input' />
                </Form.Item>
                <Form.Item
                  label='Xác nhận mật khẩu'
                  name='confirmPassword'
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Hãy xác nhận mật khẩu' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Mật khẩu mới không khớp!'))
                      },
                    }),
                  ]}>
                  <Input.Password className='edit-input' />
                </Form.Item>
                <Form.Item className='form-buttons'>
                  <Space>
                    <Button onClick={() => passwordForm.resetFields()} className='cancel-button'>
                      Hủy
                    </Button>
                    <Button type='primary' htmlType='submit' className='submit-button'>
                      Xác nhận
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
