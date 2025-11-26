import React, { useEffect, useState } from 'react'
import { HandThumbsUpFill, HandThumbsUp, Chat, Handbag } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import './postCard.scss'
import { likePostApi, dellikePostApi, createCommentApi } from '../../apis/posts.api'
import ImportCvModal from '../importcv/importcv'
import { info } from '../../apis/userProfile.api'
import { useSelector } from 'react-redux'

const PostCard = ({ post, onViewDetail, onLikeToggled }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [infoUser, setInfoUser] = useState()
  const fetchUser = async () => {
    try {
      const response = await info()
      const userData = response?.data?.fullName
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

  useEffect(() => {
    setIsLiked(post.checkReaction)
    setLikeCount(post.countReaction)
  }, [post.checkReaction, post.countReaction])

  const handleOpenDetail = () => {
    if (onViewDetail) {
      onViewDetail(post)
    }
  }

  const handleLike = async () => {
    const originalLikedState = isLiked
    const newLikedState = !originalLikedState
    const targetId = post.postId || post.eventId

    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
    try {
      if (originalLikedState) {
        await dellikePostApi({
          targetId: post.postId,
          targetType: post.targetType,
        })
      } else {
        const response = await likePostApi({
          targetId: post.postId,
          targetType: post.targetType,
          emotionType: 'LIKE',
        })
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

  const handleApply = () => {
    setIsCvModalOpen(true)
  }

  return (
    <div className='post-card'>
      <div className='post-header'>
        <img
          src={post?.creator?.avatarUrl}
          alt={`${post?.creator?.fullName}'s avatar`}
          className='post-avatar'
        />
        <div className='post-user-info'>
          <span className='post-user-name'>{post?.creator?.fullName}</span>
          <span className='post-user-create'>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {post.targetType === 'JOB' && <span className='recruit-tag'>Recruitment</span>}
        {post.targetType === 'EVENT' && <span className='recruit-tag'>Event</span>}
      </div>
      <p className='post-title'>{post.title}</p>
      <p className='post-content'>{post.description}</p>
      {post.urlImage && post.urlImage.length > 0 && (
        <div className='post-media-container'>
          <img src={post.urlImage} alt='Post media' className='post-media' />
        </div>
      )}
      <div className='post-actions'>
        <div className='action-group'>
          <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
            {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
          </button>
          <button onClick={handleOpenDetail} className='action-button'>
            <Chat /> <span>{post.countComment}</span>
          </button>
          {post.targetType === 'JOB' && post?.creator?.fullName !== infoUser && (
            <button
              onClick={handleApply}
              className='action-button apply-button'
              disabled={isLoadingApply}>
              <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
            </button>
          )}
        </div>
      </div>
      {isCvModalOpen && (
        <ImportCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
      )}
    </div>
  )
}

export default PostCard
