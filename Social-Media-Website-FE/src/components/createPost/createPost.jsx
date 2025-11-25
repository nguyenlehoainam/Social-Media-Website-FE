import React, { useEffect, useState } from 'react'
import { EmojiSmile, Image, X } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { createPostApi } from '../../apis/posts.api'
import './CreatePost.scss'
import toast from 'react-hot-toast'
import { info } from '../../apis/userProfile.api'

const CreatePost = ({ posts, onPostCreated }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [infoUser, setInfoUser] = useState()
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
      const userData = response?.data
      setInfoUser(userData)
    } catch (err) {
      toast.error('Lỗi khi tải thông tin người dùng')
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
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', content)
      if (imageFile) {
        formData.append('urlImage', imageFile)
      }
      await createPostApi(formData)
      onPostCreated()
      handleCloseModal()
      toast.success('Bài đăng đã được tạo thành công!')
    } catch (err) {
      toast.error('Không thể tạo bài đăng. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentUser) return null

  return (
    <>
      <div className='create-post-card' onClick={handleOpenModal}>
        <img
          src={infoUser ? infoUser.avatarUrl : currentUser.avatarUrl}
          alt='User Avatar'
          className='create-post-avatar'
        />
        <div className='create-post-placeholder'>What's on your mind?</div>
      </div>
      {modalIsOpen && (
        <div className='create-post-modal-overlay' onClick={handleCloseModal}>
          <div className='create-post-modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              {infoUser ? (
                <div className='modal-user-info'>
                  <img src={infoUser.avatarUrl} alt='User Avatar' className='modal-user-avatar' />
                  <div className='user-details'>
                    <span className='user-name'>{infoUser.fullName || 'Current User'}</span>
                    <span className='post-audience-text'>Post to Anyone</span>
                  </div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <button onClick={handleCloseModal} className='close-button'>
                <X size={24} />
              </button>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='title'
                className='modal-input-title'
                autoFocus
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='description'
                className='modal-textarea-description'
              />
              {imagePreview && (
                <img src={imagePreview} alt='Image Preview' className='image-preview' />
              )}
            </div>

            <div className='modal-add-ons'>
              <span className='add-ons-title'>Thêm vào bài viết của bạn</span>
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
              <div className='type-selector'>
                <p>Type : </p>
                <p value='JOB'>Recruitment</p>
              </div>
              <button
                onClick={handleSubmit}
                className='modal-submit-button'
                disabled={isLoading || !title.trim() || !content.trim()}>
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost
