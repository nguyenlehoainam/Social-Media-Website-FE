// import React, { useEffect, useState } from 'react'
// import { DatePicker, Form, Input, Radio, Space, Button, Spin, Upload } from 'antd'
// import dayjs from 'dayjs'
// import './ProfilePage.scss'
// import { info, total, update } from '../../apis/userProfile.api'
// import { changePassword } from '../../apis/auth.api'
// import toast from 'react-hot-toast'
// import CircularProgress from '@mui/joy/CircularProgress'

// const ProfilePage = () => {
//   const [action, setAction] = useState('info')
//   const [hoverIndex, setHoverIndex] = useState(null)
//   const [infoUser, setInfoUser] = useState()
//   const [editForm] = Form.useForm()
//   const [passwordForm] = Form.useForm()
//   const [totalData, setTotalData] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   const fetchGetUser = async () => {
//     try {
//       const response = await info()
//       const userData = response?.data
//       setInfoUser(userData)
//       editForm.setFieldsValue({
//         fullName: userData.fullName || '',
//         gender: userData.gender || '',
//         dob: userData.dob ? dayjs(userData.dob) : null,
//         email: userData.email || '',
//         username: userData.username || '',
//         phone: userData.phone || '',
//         avatar: userData.avatarUrl
//           ? [
//               {
//                 name: 'avatar.jpg',
//                 url: userData.avatarUrl,
//               },
//             ]
//           : [],
//       })
//     } catch (error) {
//     } finally {
//       setIsLoading(false)
//     }
//   }
//   useEffect(() => {
//     fetchGetUser()
//   }, [])

//   const handleUpdateProfile = async (values) => {
//     const formData = new FormData()
//     formData.append('fullName', values.fullName)
//     formData.append('gender', values.gender)
//     formData.append('dob', values.dob?.format('YYYY-MM-DD'))
//     formData.append('email', values.email)
//     formData.append('phone', values.phone)
//     const file = values.avatar?.[0]?.originFileObj
//     if (file) {
//       formData.append('avatar', file)
//     }
//     try {
//       await update(formData)
//       await fetchGetUser()
//       setAction('info')
//       toast.success('Cập nhật thông tin thành công!!')
//     } catch {
//       toast.error('Cập nhật thông tin thất bại!!')
//     }
//   }
//   const handleChangePassword = async (values) => {
//     try {
//       await changePassword({
//         oldPassword: values.oldPassword,
//         newPassword: values.newPassword,
//       })
//       toast.success('Đổi mật khẩu thành công!')
//       passwordForm.resetFields()
//       setAction('info')
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
//       toast.error(errorMessage)
//     }
//   }

//   const handleTotalProfile = async () => {
//     try {
//       const res = await total()
//       setTotalData(res.data)
//     } catch (error) {
//       toast.error('lỗi lấy dữ liệu thống kê: ')
//     }
//   }
//   useEffect(() => {
//     handleTotalProfile()
//   }, [])
//   const menuItems = [
//     { key: 'info', label: 'Thông tin cá nhân' },
//     { key: 'edit', label: 'Chỉnh sửa thông tin' },
//     { key: 'changePassword', label: 'Đổi mật khẩu' },
//   ]

//   return (
//     <div className='profile-page'>
//       {isLoading ? (
//         <div className='profile-loading'>
//           <CircularProgress color='primary' />
//         </div>
//       ) : !infoUser ? (
//         <div className='profile-loading'>Không thể tải được thông tin người dùng.</div>
//       ) : (
//         <>
//           <div className='profile-header-card'>
//             <div className='header-user-info'>
//               <img src={infoUser.avatarUrl} alt='' style={{ borderRadius: '100%' }} />
//               <div className='user-details'>
//                 <p className='user-name'>{infoUser?.fullName}</p>
//                 <p className='user-email'>{infoUser?.email}</p>
//               </div>
//             </div>
//             <div className='header-stats'>
//               <div className='stats-item'>
//                 <p>{totalData?.countPost ?? 0}</p>
//                 <p>Posts</p>
//               </div>
//               <div className='stats-item'>
//                 <p>{totalData?.countRecruitment ?? 0}</p>
//                 <p>Recruitment</p>
//               </div>
//               <div className='stats-item'>
//                 <p>{totalData?.countApply ?? 0}</p>
//                 <p>Apply</p>
//               </div>
//             </div>
//           </div>

//           <div className='profile-main-section'>
//             <div className='profile-sidebar'>
//               <ul className='sidebar-menu'>
//                 {menuItems.map((item, index) => (
//                   <li
//                     key={item.key}
//                     className={`menu-item ${hoverIndex === index ? 'hovered' : ''} ${
//                       action === item.key && hoverIndex === null ? 'active' : ''
//                     }`}
//                     onClick={() => setAction(item.key)}
//                     onMouseEnter={() => setHoverIndex(index)}
//                     onMouseLeave={() => setHoverIndex(null)}>
//                     {item.label}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className='profile-content-area'>
//               {action === 'info' && (
//                 <>
//                   <h4 className='content-title'>Thông tin cá nhân</h4>
//                   <div className='info-display'>
//                     <div className='info-item'>
//                       <div className='info-item--p'>
//                         <p>Họ và tên:</p>
//                         <p>{infoUser?.fullName}</p>
//                       </div>
//                     </div>
//                     <div className='info-item'>
//                       <div className='info-item--p'>
//                         <p>Giới tính:</p>
//                         <p>{infoUser?.gender}</p>
//                       </div>
//                     </div>
//                     <div className='info-item'>
//                       <div className='info-item--p'>
//                         <p>Ngày sinh:</p>
//                         <p>{dayjs(infoUser?.dob).format('DD/MM/YYYY')}</p>
//                       </div>
//                     </div>
//                     <div className='info-item'>
//                       <div className='info-item--p'>
//                         <p>Email:</p>
//                         <p>{infoUser?.email}</p>
//                       </div>
//                     </div>
//                     <div className='info-item'>
//                       <div className='info-item--p'>
//                         <p>Tên tài khoản:</p>
//                         <p>{infoUser?.username}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {action === 'edit' && (
//                 <>
//                   <h4 className='content-title'>Chỉnh sửa thông tin cá nhân</h4>
//                   <Form
//                     form={editForm}
//                     onFinish={handleUpdateProfile}
//                     className='edit-form'
//                     layout='vertical'>
//                     <Form.Item
//                       label='Họ và tên'
//                       name='fullName'
//                       rules={[{ required: true, message: 'Hãy nhập họ và tên' }]}>
//                       <Input className='edit-input' placeholder='Nhập họ và tên' />
//                     </Form.Item>
//                     <Form.Item label='Giới tính' name='gender'>
//                       <Radio.Group>
//                         <Radio value='MALE'>Nam</Radio>
//                         <Radio value='FEMALE'>Nữ</Radio>
//                         <Radio value='OTHER'>Khác</Radio>
//                       </Radio.Group>
//                     </Form.Item>
//                     <Form.Item
//                       label='Ngày sinh'
//                       name='dob'
//                       rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
//                       <DatePicker className='edit-datepicker' placeholder='Chọn ngày sinh' />
//                     </Form.Item>
//                     <Form.Item
//                       label='Số điện thoại'
//                       name='phone'
//                       rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
//                       <Input className='edit-input' placeholder='Nhập số điện thoại' />
//                     </Form.Item>

//                     <Form.Item
//                       label='Ảnh đại diện'
//                       name='avatar'
//                       valuePropName='fileList'
//                       getValueFromEvent={(e) => e && e.fileList}>
//                       <Upload listType='picture' maxCount={1} beforeUpload={() => false}>
//                         <Button>Chọn ảnh</Button>
//                       </Upload>
//                     </Form.Item>

//                     <Form.Item label='Email' name='email'>
//                       <Input className='edit-input' disabled />
//                     </Form.Item>
//                     <Form.Item label='Tên tài khoản' name='username'>
//                       <Input className='edit-input' disabled />
//                     </Form.Item>
//                     <Form.Item className='form-buttons'>
//                       <Space>
//                         <Button onClick={() => editForm.resetFields()} className='cancel-button'>
//                           Hủy
//                         </Button>
//                         <Button type='primary' htmlType='submit' className='submit-button'>
//                           Xác nhận
//                         </Button>
//                       </Space>
//                     </Form.Item>
//                   </Form>
//                 </>
//               )}

//               {action === 'changePassword' && (
//                 <>
//                   <h4 className='content-title'>Đổi mật khẩu</h4>
//                   <Form
//                     form={passwordForm}
//                     onFinish={handleChangePassword}
//                     className='edit-form'
//                     layout='vertical'>
//                     <Form.Item
//                       id='change-password-form'
//                       label='Nhập mật khẩu cũ'
//                       name='oldPassword'
//                       rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ' }]}>
//                       <Input.Password className='edit-input' />
//                     </Form.Item>
//                     <Form.Item
//                       label='Nhập mật khẩu mới'
//                       name='newPassword'
//                       rules={[{ required: true, message: 'Hãy nhập mật khẩu mới' }]}>
//                       <Input.Password className='edit-input' />
//                     </Form.Item>
//                     <Form.Item
//                       label='Xác nhận mật khẩu'
//                       name='confirmPassword'
//                       dependencies={['newPassword']}
//                       rules={[
//                         { required: true, message: 'Hãy xác nhận mật khẩu' },
//                         ({ getFieldValue }) => ({
//                           validator(_, value) {
//                             if (!value || getFieldValue('newPassword') === value) {
//                               return Promise.resolve()
//                             }
//                             return Promise.reject(new Error('Mật khẩu mới không khớp!'))
//                           },
//                         }),
//                       ]}>
//                       <Input.Password className='edit-input' />
//                     </Form.Item>
//                     <Form.Item className='form-buttons'>
//                       <Space>
//                         <Button
//                           onClick={() => passwordForm.resetFields()}
//                           className='cancel-button'>
//                           Hủy
//                         </Button>
//                         <Button type='primary' htmlType='submit' className='submit-button'>
//                           Xác nhận
//                         </Button>
//                       </Space>
//                     </Form.Item>
//                   </Form>
//                 </>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// export default ProfilePage

import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, Radio, Space, Button, Spin, Upload } from 'antd'
import dayjs from 'dayjs'
import './ProfilePage.scss'
import { info, total, update } from '../../apis/userProfile.api'
import { changePassword } from '../../apis/auth.api'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/joy/CircularProgress'

const ProfilePage = () => {
  const [action, setAction] = useState('info')
  const [hoverIndex, setHoverIndex] = useState(null)
  const [infoUser, setInfoUser] = useState(null)
  const [editForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [totalData, setTotalData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // --- 1. LẤY THÔNG TIN USER (MOCK DATA) ---
  const fetchGetUser = async () => {
    try {
      const response = await info()

      // LOGIC MOCK: Lấy data từ 'me', 'loginResponse.user' hoặc chính response
      const userData = response.me || response.loginResponse?.user || response || {}

      // Chuẩn hóa Avatar (Mock dùng 'avatar', Code cũ dùng 'avatarUrl')
      const avatarSrc = userData.avatar || userData.avatarUrl || 'https://via.placeholder.com/150'

      // Gán thêm avatarUrl vào object để thống nhất khi render
      const normalizedUser = { ...userData, avatarUrl: avatarSrc }

      setInfoUser(normalizedUser)

      // Đổ dữ liệu vào Form
      editForm.setFieldsValue({
        fullName: userData.fullName || '',
        gender: userData.gender || 'OTHER', // Default value
        dob: userData.dob ? dayjs(userData.dob) : null,
        email: userData.email || '',
        username: userData.username || '',
        phone: userData.phone || '',
        avatar: avatarSrc
          ? [
              {
                uid: '-1',
                name: 'avatar.jpg',
                status: 'done',
                url: avatarSrc,
              },
            ]
          : [],
      })
    } catch (error) {
      console.error(error)
      toast.error('Không tải được thông tin.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGetUser()
  }, [])

  // --- 2. LẤY THỐNG KÊ (MOCK DATA) ---
  const handleTotalProfile = async () => {
    try {
      const res = await total()
      // LOGIC MOCK: Lấy từ 'adminStats' hoặc 'stats'
      const stats = res.adminStats || res.stats || {}
      setTotalData(stats)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleTotalProfile()
  }, [])

  // --- 3. GIẢ LẬP UPDATE PROFILE ---
  const handleUpdateProfile = async (values) => {
    // Fake loading
    const toastId = toast.loading('Đang cập nhật...')

    try {
      // 1. Giả lập độ trễ mạng
      await new Promise((r) => setTimeout(r, 1000))

      // 2. Xử lý ảnh (Nếu có upload ảnh mới thì tạo Blob URL để preview ngay)
      let newAvatarUrl = infoUser.avatarUrl
      const file = values.avatar?.[0]?.originFileObj
      if (file) {
        newAvatarUrl = URL.createObjectURL(file)
      }

      // 3. Cập nhật State cục bộ (Optimistic Update)
      // Vì file JSON không lưu được, ta update thẳng vào state để UI thay đổi
      const updatedUser = {
        ...infoUser,
        fullName: values.fullName,
        gender: values.gender,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : infoUser.dob,
        phone: values.phone,
        avatarUrl: newAvatarUrl,
      }

      setInfoUser(updatedUser)

      // Quay về tab Info
      setAction('info')
      toast.dismiss(toastId)
      toast.success('Cập nhật thông tin thành công (Giả lập)!')

      // Lưu ý: Không gọi fetchGetUser() lại vì nó sẽ load lại data cũ từ file JSON
    } catch (error) {
      toast.dismiss(toastId)
      toast.error('Cập nhật thất bại.')
    }
  }

  // --- 4. GIẢ LẬP ĐỔI MẬT KHẨU ---
  const handleChangePassword = async (values) => {
    const toastId = toast.loading('Đang xử lý...')
    try {
      // Giả lập độ trễ
      await new Promise((r) => setTimeout(r, 1000))

      // Mock luôn thành công
      toast.dismiss(toastId)
      toast.success('Đổi mật khẩu thành công!')
      passwordForm.resetFields()
      setAction('info')
    } catch (error) {
      toast.dismiss(toastId)
      toast.error('Có lỗi xảy ra.')
    }
  }

  const menuItems = [
    { key: 'info', label: 'Thông tin cá nhân' },
    { key: 'edit', label: 'Chỉnh sửa thông tin' },
    { key: 'changePassword', label: 'Đổi mật khẩu' },
  ]

  return (
    <div className='profile-page'>
      {isLoading ? (
        <div className='profile-loading'>
          <CircularProgress color='primary' />
        </div>
      ) : !infoUser ? (
        <div className='profile-loading'>Không thể tải được thông tin người dùng.</div>
      ) : (
        <>
          {/* Header Card */}
          <div className='profile-header-card'>
            <div className='header-user-info'>
              <img
                src={infoUser.avatarUrl}
                alt='Avatar'
                style={{ borderRadius: '100%', objectFit: 'cover', width: '80px', height: '80px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150'
                }}
              />
              <div className='user-details'>
                <p className='user-name'>{infoUser.fullName || 'User Name'}</p>
                <p className='user-email'>{infoUser.email || 'email@example.com'}</p>
              </div>
            </div>
            <div className='header-stats'>
              {/* <div className='stats-item'>
                <p>{totalData?.totalRecruitment || totalData?.countRecruitment || 0}</p>
                <p>Recruitment</p>
                </div> */}
              <div className='stats-item'>
                <p>{totalData?.totalPosts || totalData?.countPost || 0}</p>
                <p>Posts</p>
              </div>
              {/* <div className='stats-item'>
                <p>
                  {totalData?.totalEvents || totalData?.countEvents || totalData?.countApply || 0}
                </p>
                <p>Events/Apply</p>
              </div> */}
            </div>
          </div>

          <div className='profile-main-section'>
            {/* Sidebar Menu */}
            <div className='profile-sidebar'>
              <ul className='sidebar-menu'>
                {menuItems.map((item, index) => (
                  <li
                    key={item.key}
                    className={`menu-item ${hoverIndex === index ? 'hovered' : ''} ${
                      action === item.key ? 'active' : ''
                    }`}
                    onClick={() => setAction(item.key)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Area */}
            <div className='profile-content-area'>
              {/* TAB 1: INFO */}
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
                        <p>{infoUser?.gender || 'Chưa cập nhật'}</p>
                      </div>
                    </div>
                    <div className='info-item'>
                      <div className='info-item--p'>
                        <p>Ngày sinh:</p>
                        <p>
                          {infoUser?.dob
                            ? dayjs(infoUser.dob).format('DD/MM/YYYY')
                            : 'Chưa cập nhật'}
                        </p>
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
                        <p>Số điện thoại:</p>
                        <p>{infoUser?.phone || 'Chưa cập nhật'}</p>
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

              {/* TAB 2: EDIT */}
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
                      <DatePicker
                        className='edit-datepicker'
                        placeholder='Chọn ngày sinh'
                        format='DD/MM/YYYY'
                      />
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
                      getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e
                        return e && e.fileList
                      }}>
                      <Upload listType='picture' maxCount={1} beforeUpload={() => false}>
                        <Button>Chọn ảnh mới</Button>
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
                        <Button onClick={() => setAction('info')} className='cancel-button'>
                          Hủy
                        </Button>
                        <Button type='primary' htmlType='submit' className='submit-button'>
                          Lưu thay đổi
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </>
              )}

              {/* TAB 3: CHANGE PASSWORD */}
              {action === 'changePassword' && (
                <>
                  <h4 className='content-title'>Đổi mật khẩu</h4>
                  <Form
                    form={passwordForm}
                    onFinish={handleChangePassword}
                    className='edit-form'
                    layout='vertical'>
                    <Form.Item
                      label='Mật khẩu cũ'
                      name='oldPassword'
                      rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ' }]}>
                      <Input.Password className='edit-input' />
                    </Form.Item>
                    <Form.Item
                      label='Mật khẩu mới'
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
                        <Button
                          onClick={() => {
                            passwordForm.resetFields()
                            setAction('info')
                          }}
                          className='cancel-button'>
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
        </>
      )}
    </div>
  )
}

export default ProfilePage
