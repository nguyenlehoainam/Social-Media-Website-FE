import React, { useEffect, useState } from 'react'
import { HandThumbsUpFill, HandThumbsUp, Chat, Handbag } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import './myPosts.scss'
import { likePostApi, dellikePostApi } from '../../apis/posts.api'
import UpdatePost from '../updatePost/updatePost'
import DownloadCvModal from '../downloadCv/downloadCv'

const MyPosts = ({ post, onPostUpdated, onViewDetail, onLikeToggled }) => {
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  const handleLike = async () => {
    const originalLikedState = isLiked
    const newLikedState = !originalLikedState
    const targetId = post.postId || post.eventId

    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
    try {
      if (originalLikedState) {
        await dellikePostApi({ targetId: post.postId, targetType: 'JOB' })
      } else {
        await likePostApi({ targetId: post.postId, targetType: 'JOB', emotionType: 'LIKE' })
      }
      if (onLikeToggled) {
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1
        onLikeToggled(targetId, newLikedState, newLikeCount)
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi thực hiện thao tác.')
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
    }
  }
  useEffect(() => {
    setIsLiked(post.checkReaction)
    setLikeCount(post.countReaction)
  }, [post.checkReaction, post.countReaction])

  const handleApply = () => setIsCvModalOpen(true)
  const handleUpdate = () => setIsUpdate(true)
  const handleOpenDetail = () => {
    if (onViewDetail) {
      onViewDetail(post)
    }
  }

  return (
    <div className='post-card'>
      <div className='post-header'>
        <img
          src={post.creator.avatarUrl}
          alt={`${post.creator.fullName}'s avatar`}
          className='post-avatar'
        />
        <div className='post-user-info'>
          <span className='post-user-name'>{post.creator.fullName}</span>
          <span className='post-user-create'>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <span className='recruit-tag'>Recruitment</span>
      </div>
      <p className='post-title'>{post.title}</p>
      <p className='post-content'>{post.description}</p>
      {post.urlImage && post.urlImage.length > 0 && (
        <div className='post-media-container'>
          <img src={post.urlImage} alt='Post media' className='post-media' />
        </div>
      )}
      <div className='post-actions'>
        {/* Nhóm các nút bên trái */}
        <div className='action-group'>
          <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
            {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
          </button>
          <button onClick={handleOpenDetail} className='action-button'>
            <Chat /> <span>{post.countComment}</span>
          </button>
          <button
            onClick={handleApply}
            className='action-button apply-button'
            disabled={isLoadingApply}>
            <Handbag /> <span>{isLoadingApply ? 'Downloading...' : 'Download'}</span>
          </button>
        </div>

        <div className='post-edit-action'>
          <button onClick={handleUpdate} className='post-edit-button'>
            Edit
          </button>
        </div>
      </div>
      {isCvModalOpen && (
        <DownloadCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
      )}
      {isUpdate && (
        <UpdatePost post={post} onClose={() => setIsUpdate(false)} onPostUpdated={onPostUpdated} />
      )}
    </div>
  )
}

export default MyPosts
