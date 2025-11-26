import React, { useEffect, useState } from 'react'
import { HandThumbsUpFill, HandThumbsUp, Chat } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import './eventPostCard.scss'
import { likePostApi, dellikePostApi } from '../../apis/posts.api'

const EventPostCard = ({ post, onViewDetail, onLikeToggled }) => {
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)

  const handleLike = async () => {
    const originalLikedState = isLiked
    const newLikedState = !originalLikedState
    const targetId = post.postId || post.eventId

    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))

    try {
      if (originalLikedState) {
        await dellikePostApi({
          targetId: post.eventId,
          targetType: 'EVENT',
        })

        setIsLiked(false)
        setLikeCount(likeCount - 1)
      } else {
        const response = await likePostApi({
          targetId: post.eventId,
          targetType: 'EVENT',
          emotionType: 'LIKE',
        })

        if (onLikeToggled) {
          const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1
          onLikeToggled(targetId, newLikedState, newLikeCount)
        }
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

  const handleOpenDetail = () => {
    if (onViewDetail) {
      onViewDetail(post)
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
        <span className='recruit-tag'>Event</span>
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
          <button onClick={handleOpenDetail} className='action-button'>
            <Chat /> <span>{post.countComment}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventPostCard
