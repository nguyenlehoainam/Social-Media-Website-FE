// import React, { useEffect, useState } from 'react'
// import { EmojiSmile, Image, X } from 'react-bootstrap-icons'
// import { useSelector } from 'react-redux'
// import { createPostApi } from '../../apis/posts.api'
// import './createPost.scss'
// import toast from 'react-hot-toast'
// import { info } from '../../apis/userProfile.api'

// const CreatePost = ({ posts, onPostCreated }) => {
//   const authState = useSelector((state) => state.auth.auth)
//   const currentUser = authState

//   const [modalIsOpen, setModalIsOpen] = useState(false)
//   const [content, setContent] = useState('')
//   const [title, setTitle] = useState('')
//   const [infoUser, setInfoUser] = useState()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [imageFile, setImageFile] = useState(null)
//   const [imagePreview, setImagePreview] = useState(null)

//   const handleOpenModal = () => setModalIsOpen(true)
//   const handleCloseModal = (e) => {
//     if (isLoading) return
//     setModalIsOpen(false)
//     setTitle('')
//     setContent('')
//     setError('')
//     setImageFile(null)
//     setImagePreview(null)
//   }

//   const fetchUser = async () => {
//     try {
//       const response = await info()
//       const userData = response?.data
//       setInfoUser(userData)
//     } catch (err) {
//       toast.error('Lỗi khi tải thông tin người dùng')
//     }
//   }

//   useEffect(() => {
//     if (currentUser) {
//       fetchUser()
//     }
//   }, [currentUser])

//   const handleImageChange = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview)
//       }
//       setImageFile(file)
//       setImagePreview(URL.createObjectURL(file))
//     }
//   }

//   const handleSubmit = async () => {
//     if (!title.trim() || !content.trim()) {
//       toast.error('Tiêu đề và mô tả không được để trống.')
//       return
//     }
//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('title', title)
//       formData.append('description', content)
//       if (imageFile) {
//         formData.append('urlImage', imageFile)
//       }
//       await createPostApi(formData)
//       onPostCreated()
//       handleCloseModal()
//       toast.success('Bài đăng đã được tạo thành công!')
//     } catch (err) {
//       toast.error('Không thể tạo bài đăng. Vui lòng thử lại.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!currentUser) return null

//   return (
//     <>
//       <div className='create-post-card' onClick={handleOpenModal}>
//         <img
//           src={infoUser ? infoUser.avatarUrl : currentUser.avatarUrl}
//           alt='User Avatar'
//           className='create-post-avatar'
//         />
//         <div className='create-post-placeholder'>What's on your mind?</div>
//       </div>
//       {modalIsOpen && (
//         <div className='create-post-modal-overlay' onClick={handleCloseModal}>
//           <div className='create-post-modal-content' onClick={(e) => e.stopPropagation()}>
//             <div className='modal-header'>
//               {infoUser ? (
//                 <div className='modal-user-info'>
//                   <img src={infoUser.avatarUrl} alt='User Avatar' className='modal-user-avatar' />
//                   <div className='user-details'>
//                     <span className='user-name'>{infoUser.fullName || 'Current User'}</span>
//                     <span className='post-audience-text'>Post to Anyone</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div>Loading...</div>
//               )}
//               <button onClick={handleCloseModal} className='close-button'>
//                 <X size={24} />
//               </button>
//             </div>
//             <div className='modal-body'>
//               <input
//                 type='text'
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder='title'
//                 className='modal-input-title'
//                 autoFocus
//               />
//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder='description'
//                 className='modal-textarea-description'
//               />
//               {imagePreview && (
//                 <img src={imagePreview} alt='Image Preview' className='image-preview' />
//               )}
//             </div>

//             <div className='modal-add-ons'>
//               <span className='add-ons-title'>Add your Image</span>
//               <div className='add-ons-icons'>
//                 <label htmlFor='file-upload' className='icon-button'>
//                   <Image size={24} />
//                 </label>
//                 <input
//                   id='file-upload'
//                   type='file'
//                   accept='image/*'
//                   onChange={handleImageChange}
//                   style={{ display: 'none' }}
//                 />
//               </div>
//             </div>

//             {error && <p className='modal-error'>{error}</p>}

//             <div className='modal-footer'>
//               <div className='modal-footer-left'>
//                 <div className='type-selector'>
//                   <p>Type: </p>
//                   <p className='type-posts' value='JOB'>
//                     Recruitment
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 className='modal-submit-button'
//                 disabled={isLoading || !title.trim() || !content.trim()}>
//                 {isLoading ? 'Posting...' : 'Post'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default CreatePost

import React, { useEffect, useState } from 'react'
import { EmojiSmile, Image, X } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { createPostApi } from '../../apis/posts.api'
import './createPost.scss'
import toast from 'react-hot-toast'
import { info } from '../../apis/userProfile.api'

const CreatePost = ({ posts, onPostCreated }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [infoUser, setInfoUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleOpenModal = () => setModalIsOpen(true)

  const handleCloseModal = (e) => {
    if (isLoading) return
    setModalIsOpen(false)
    setTitle('')
    setContent('')
    setError('')
    setImageFile(null)
    setImagePreview(null)
  }

  const fetchUser = async () => {
    try {
      const response = await info()
      // Mock Data logic: lấy từ me, loginResponse hoặc response
      const userData = response.me || response.loginResponse?.user || response || {}
      setInfoUser(userData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchUser()
    }
  }, [currentUser])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
      setImageFile(file)
      // Tạo URL giả cho ảnh để hiển thị preview
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Tiêu đề và mô tả không được để trống.')
      return
    }

    setIsLoading(true)

    try {
      // --- LOGIC MOCK DATA ---
      // Vì không thể upload file thật lên JSON server, ta giả lập hành động này

      // 1. Giả lập độ trễ mạng
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 2. Tạo một Post Object giả (Thay vì FormData)
      const currentUserData = infoUser || currentUser?.user || currentUser || {}

      const newFakePost = {
        id: `temp-${Date.now()}`, // ID tạm
        title: title,
        description: content,
        content: content, // Map cả 2 trường để tương thích
        type: 'JOB', // UI đang hardcode là Recruitment
        targetType: 'JOB',
        createdAt: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        isLiked: false,
        // Dùng Blob URL của ảnh để hiển thị ngay lập tức (sẽ mất khi F5)
        images: imagePreview ? [imagePreview] : [],
        urlImage: imagePreview ? [imagePreview] : [],
        author: {
          id: currentUserData.id || 'me',
          fullName: currentUserData.fullName || 'Tôi',
          avatar:
            currentUserData.avatar || currentUserData.avatarUrl || 'https://via.placeholder.com/50',
        },
        creator: {
          // Fallback cho code cũ
          fullName: currentUserData.fullName || 'Tôi',
          avatarUrl:
            currentUserData.avatar || currentUserData.avatarUrl || 'https://via.placeholder.com/50',
        },
      }

      // 3. Gọi API (Mock) - Dù API trả lỗi hay thành công thì ta cũng coi như thành công ở UI
      // await createPostApi(newFakePost); // Có thể comment dòng này nếu API mock báo lỗi 404

      // 4. Báo cho Parent Component biết
      // Lưu ý: Parent cần sửa để nhận object `newFakePost` này và unshift vào mảng posts
      if (onPostCreated) {
        onPostCreated(newFakePost)
      }

      handleCloseModal()
      toast.success('Bài đăng giả lập thành công! (Sẽ mất khi F5)')
    } catch (err) {
      console.error(err)
      toast.error('Có lỗi xảy ra.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentUser) return null

  // Helper lấy avatar hiển thị
  const displayAvatar =
    infoUser?.avatar ||
    infoUser?.avatarUrl ||
    currentUser?.avatarUrl ||
    'https://via.placeholder.com/50'
  const displayName = infoUser?.fullName || currentUser?.fullName || 'User'

  return (
    <>
      <div className='create-post-card' onClick={handleOpenModal}>
        <img
          src={displayAvatar}
          alt='User Avatar'
          className='create-post-avatar'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50'
          }}
        />
        <div className='create-post-placeholder'>Bạn đang nghĩ gì thế?</div>
      </div>

      {modalIsOpen && (
        <div className='create-post-modal-overlay' onClick={handleCloseModal}>
          <div className='create-post-modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <div className='modal-user-info'>
                <img
                  src={displayAvatar}
                  alt='User Avatar'
                  className='modal-user-avatar'
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50'
                  }}
                />
                <div className='user-details'>
                  <span className='user-name'>{displayName}</span>
                  <span className='post-audience-text'>Công khai</span>
                </div>
              </div>
              <button onClick={handleCloseModal} className='close-button'>
                <X size={24} />
              </button>
            </div>

            <div className='modal-body'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Tiêu đề bài viết'
                className='modal-input-title'
                autoFocus
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Nội dung chi tiết...'
                className='modal-textarea-description'
              />
              {imagePreview && (
                <img src={imagePreview} alt='Image Preview' className='image-preview' />
              )}
            </div>

            <div className='modal-add-ons'>
              <span className='add-ons-title'>Thêm vào bài viết</span>
              <div className='add-ons-icons'>
                <label htmlFor='file-upload' className='icon-button'>
                  <Image size={24} />
                </label>
                <input
                  id='file-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {error && <p className='modal-error'>{error}</p>}

            <div className='modal-footer'>
              <div className='modal-footer-left'>
                <div className='type-selector'>
                  <p>Loại: </p>
                  <p className='type-posts'>Recruitment (Tuyển dụng)</p>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className='modal-submit-button'
                disabled={isLoading || !title.trim() || !content.trim()}>
                {isLoading ? 'Đang đăng...' : 'Đăng'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost
