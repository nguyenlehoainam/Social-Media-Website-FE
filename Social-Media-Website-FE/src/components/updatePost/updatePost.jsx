// import React, { useState, useEffect } from 'react'
// import { EmojiSmile, Image as ImageIcon } from 'react-bootstrap-icons'
// import toast from 'react-hot-toast'
// import './updatePost.scss'
// import { updatePost } from '../../apis/posts.api'

// const UpdatePost = ({ post, onPostUpdated, onClose }) => {
//   const [title, setTitle] = useState(post.title || '')
//   const [content, setContent] = useState(post.description || '')
//   const [imagePreview, setImagePreview] = useState(post.urlImage || '')
//   const [isLoading, setIsLoading] = useState(false)

//   const handleImageChange = () => {
//     toast('chỉ có thể thay đổi được tiêu đề và nội dung', {
//       duration: 6000,
//     })
//   }

//   const handleSubmit = async () => {
//     if (!title.trim() || !content.trim()) {
//       toast.error('Tiêu đề và nội dung không được để trống.')
//       return
//     }

//     setIsLoading(true)

//     try {
//       const updateData = { title, description: content }
//       const response = await updatePost(post.postId, updateData)
//       const updatedPostData = response?.data || response
//       if (typeof onPostUpdated === 'function' && updatedPostData) {
//         onPostUpdated(updatedPostData)
//       } else {
//         toast.error('Không nhận được dữ liệu cập nhật.')
//       }
//       onClose()
//     } catch (err) {
//       toast.error('Không thể cập nhật bài đăng.')
//     } finally {
//       setIsLoading(false)
//     }
//   }
//   return (
//     <div className='create-post-modal-overlay' onClick={onClose}>
//       <div className='create-post-modal-content' onClick={(e) => e.stopPropagation()}>
//         <div className='modal-header'>
//           <span className='modal-title-text'>Update Your Post</span>
//           <button onClick={onClose} className='close-button'>
//             &times;
//           </button>
//         </div>
//         <div className='modal-user-info'>
//           <img
//             src={post.creator.avatarUrl || 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=U'}
//             alt='User Avatar'
//             className='modal-user-avatar'
//           />
//           <div className='user-details'>
//             <span className='user-name'>{post.creator.fullName}</span>
//             <span className='post-audience'>Post to Anyone</span>
//           </div>
//         </div>
//         <div className='modal-body'>
//           <input
//             type='text'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder='Tiêu đề'
//             className='modal-title-input'
//           />
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder='Mô tả'
//             className='modal-textarea'
//           />
//           {imagePreview && <img src={imagePreview} alt='Preview' className='image-preview' />}
//         </div>
//         <div className='modal-add-ons'>
//           <span className='add-ons-title'>Add your Image</span>
//           <div className='add-ons-icons'>
//             <label onClick={handleImageChange} htmlFor='edit-file-upload' className='icon-button'>
//               <ImageIcon size={20} />
//             </label>
//           </div>
//         </div>
//         <div className='modal-footer'>
//           <div className='footer-spacer'></div>
//           <button
//             onClick={handleSubmit}
//             className='modal-submit-button'
//             disabled={isLoading || !title.trim() || !content.trim()}>
//             {isLoading ? 'Confirming...' : 'Confirm'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UpdatePost

import React, { useState } from 'react'
import { Image as ImageIcon } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import './updatePost.scss'
import { updatePost } from '../../apis/posts.api'

const UpdatePost = ({ post, onPostUpdated, onClose }) => {
  // --- 1. CHUẨN HÓA DỮ LIỆU ---
  const author = post.author || post.creator || {}
  const postId = post.id || post.postId || post.eventId

  // Lấy ảnh cũ
  const oldImage = post.images && post.images.length > 0 ? post.images[0] : post.urlImage

  // --- 2. STATE ---
  const [title, setTitle] = useState(post.title || '')
  const [content, setContent] = useState(post.description || post.content || '')

  // State lưu file và preview
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(oldImage || '')

  const [isLoading, setIsLoading] = useState(false)

  // --- 3. XỬ LÝ CHỌN ẢNH MỚI ---
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Xóa URL cũ để tránh rò rỉ bộ nhớ (nếu đã từng tạo)
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }

      setImageFile(file)
      // Tạo Blob URL để xem trước ngay lập tức
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Tiêu đề và nội dung không được để trống.')
      return
    }

    setIsLoading(true)

    try {
      // --- LOGIC MOCK UPDATE ---

      // Giả lập độ trễ mạng
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Gọi API (Mock mode có thể bỏ qua bước này hoặc try-catch nếu API 404)
      try {
        // Nếu có file ảnh, thông thường sẽ dùng FormData gửi lên server
        // await updatePost(postId, formData)
      } catch (e) {
        console.log('Mock API update skipped.')
      }

      // Tự tạo object đã update (Mock Data)
      const fakeUpdatedPost = {
        ...post,
        title: title,
        description: content,
        content: content,
        // Cập nhật ảnh mới nếu có thay đổi
        images: imagePreview ? [imagePreview] : post.images,
        urlImage: imagePreview ? [imagePreview] : post.urlImage, // Fallback key cũ
      }

      // Trả dữ liệu về component cha để update UI ngay lập tức
      if (typeof onPostUpdated === 'function') {
        onPostUpdated(fakeUpdatedPost)
      }

      toast.success('Cập nhật bài viết thành công (Giả lập)!')
      onClose()
    } catch (err) {
      console.error(err)
      toast.error('Không thể cập nhật bài đăng.')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper hiển thị avatar an toàn
  const displayAvatar = author.avatar || author.avatarUrl || 'https://via.placeholder.com/50'
  const displayName = author.fullName || 'User'

  return (
    <div className='create-post-modal-overlay' onClick={onClose}>
      <div className='create-post-modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <span className='modal-title-text'>Update Your Post</span>
          <button onClick={onClose} className='close-button'>
            &times;
          </button>
        </div>

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
            <span className='post-audience'>Post to Anyone</span>
          </div>
        </div>

        <div className='modal-body'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Tiêu đề'
            className='modal-title-input'
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Mô tả nội dung...'
            className='modal-textarea'
          />

          {/* Vùng hiển thị ảnh preview */}
          {imagePreview && (
            <div style={{ marginTop: '10px', textAlign: 'center', position: 'relative' }}>
              <img
                src={imagePreview}
                alt='Preview'
                className='image-preview'
                style={{
                  maxHeight: '200px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
              {/* Nút xóa ảnh (Optional) */}
              <button
                onClick={() => {
                  setImagePreview('')
                  setImageFile(null)
                }}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  cursor: 'pointer',
                }}>
                &times;
              </button>
            </div>
          )}
        </div>

        <div className='modal-add-ons'>
          <span className='add-ons-title'>Thay đổi ảnh</span>
          <div className='add-ons-icons'>
            {/* Input file ẩn, kích hoạt qua label */}
            <label htmlFor='edit-file-upload' className='icon-button' style={{ cursor: 'pointer' }}>
              <ImageIcon size={20} />
            </label>
            <input
              id='edit-file-upload'
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className='modal-footer'>
          <div className='footer-spacer'></div>
          <button
            onClick={handleSubmit}
            className='modal-submit-button'
            disabled={isLoading || !title.trim() || !content.trim()}>
            {isLoading ? 'Updating...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePost
