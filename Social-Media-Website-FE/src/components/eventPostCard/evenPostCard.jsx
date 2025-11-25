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
import './eventPostCard.scss'

const EventPostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.reacted || false)
  const [likeCount, setLikeCount] = useState(post.countReaction || 0)

  const handleLike = async () => {
    const originalLikedState = isLiked
    const originalLikeCount = likeCount
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    try {
      await likePostApi(post.id)
    } catch (error) {
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
      toast.error('Đã có lỗi xảy ra.')
    }
  }
  return (
    <div className='post-card'>
      <div className='post-header'>
        <img
          src={post.creator.avatarUrl || 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=A'}
          alt={`${post.creator.fullName}'s avatar`}
          className='post-avatar'
        />
        <div className='post-user-info'>
          <span className='post-user-name'>{post.creator.fullName}</span>
          <span className='post-user-details'>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {post.targetType === 'EVENT' && <span className='recruit-tag'>Event</span>}
      </div>
      <p className='post-title'> {post.title}</p>
      <p className='post-content'> {post.description}</p>
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
        </div>
        <button className={`action-button `}>
          <Bookmark />
        </button>
      </div>
    </div>
  )
}

export default EventPostCard
