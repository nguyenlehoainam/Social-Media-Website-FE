import React, { useState } from 'react'
import {
  HandThumbsUpFill,
  HandThumbsUp,
  Chat,
  BookmarkFill,
  Bookmark,
  Handbag,
} from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
// import { likePostApi, applyToPostApi, bookmarkPostApi } from '../../apis/posts.api'
import './PostCard.scss'
import { likePostApi, dellikePostApi } from '../../apis/posts.api'

const PostCard = ({ post, onPostUpdate }) => {
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked || false)
  const [isLoadingApply, setIsLoadingApply] = useState(false)

  const [isLiked, setIsLiked] = useState(post.reacted || false)
  const [likeCount, setLikeCount] = useState(post.countReaction || 0)

  const handleLike = async () => {
    const originalLikedState = isLiked
    const originalLikeCount = likeCount
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)

    try {
      if (originalLikedState) {
        await dellikePostApi({
          targetId: post.postId,
          targetType: post.targetType,
        })
      } else {
        await likePostApi({
          targetId: post.postId,
          targetType: post.targetType,
          emotionType: 'LIKE',
        })
      }
      if (response.data.data && onPostUpdate) {
        onPostUpdate(response.data.data)
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra.')
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
    }
  }

  const handleApply = async () => {
    setIsLoadingApply(true)
    try {
      await applyToPostApi(post.id)
      toast.success('Ứng tuyển thành công!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ứng tuyển không thành công.')
    } finally {
      setIsLoadingApply(false)
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
          <button className='action-button'>
            <Chat /> <span>{post.countComment}</span>
          </button>
          {post.targetType === 'JOB' && (
            <button
              onClick={handleApply}
              className='action-button apply-button'
              disabled={isLoadingApply}>
              <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
            </button>
          )}
        </div>
        <button className={`action-button ${isBookmarked ? 'active' : ''}`}>
          {isBookmarked ? <BookmarkFill /> : <Bookmark />}
        </button>
      </div>
    </div>
  )
}

export default PostCard
