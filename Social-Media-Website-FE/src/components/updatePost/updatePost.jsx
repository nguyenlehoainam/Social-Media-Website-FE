import React, { useState, useEffect } from 'react'
import { EmojiSmile, Image as ImageIcon } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import './updatePost.scss'
import { updatePost } from '../../apis/posts.api'

const UpdatePost = ({ post, onPostUpdated, onClose }) => {
  const [title, setTitle] = useState(post.title || '')
  const [content, setContent] = useState(post.description || '')
  const [imagePreview, setImagePreview] = useState(post.urlImage || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = () => {
    toast('chỉ có thể thay đổi được tiêu đề và nội dung', {
      duration: 6000,
    })
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Tiêu đề và nội dung không được để trống.')
      return
    }

    setIsLoading(true)

    try {
      const updateData = { title, description: content }
      const response = await updatePost(post.postId, updateData)
      const updatedPostData = response?.data || response
      if (typeof onPostUpdated === 'function' && updatedPostData) {
        onPostUpdated(updatedPostData)
      } else {
        toast.error('Không nhận được dữ liệu cập nhật.')
      }
      onClose()
    } catch (err) {
      toast.error('Không thể cập nhật bài đăng.')
    } finally {
      setIsLoading(false)
    }
  }
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
            src={post.creator.avatarUrl || 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=U'}
            alt='User Avatar'
            className='modal-user-avatar'
          />
          <div className='user-details'>
            <span className='user-name'>{post.creator.fullName}</span>
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
            placeholder='Mô tả'
            className='modal-textarea'
          />
          {imagePreview && <img src={imagePreview} alt='Preview' className='image-preview' />}
        </div>
        <div className='modal-add-ons'>
          <span className='add-ons-title'>Add your Image</span>
          <div className='add-ons-icons'>
            <label onClick={handleImageChange} htmlFor='edit-file-upload' className='icon-button'>
              <ImageIcon size={20} />
            </label>
          </div>
        </div>
        <div className='modal-footer'>
          <div className='footer-spacer'></div>
          <button
            onClick={handleSubmit}
            className='modal-submit-button'
            disabled={isLoading || !title.trim() || !content.trim()}>
            {isLoading ? 'Confirming...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePost
