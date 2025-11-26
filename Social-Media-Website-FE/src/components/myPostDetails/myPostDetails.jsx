import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { HandThumbsUp, Chat, HandThumbsUpFill, Handbag, Trash } from 'react-bootstrap-icons'
import './myPostDetails.scss'
import {
  dellikePostApi,
  likePostApi,
  getJobPostAPI,
  createCommentApi,
  deleteCommentApi,
} from '../../apis/posts.api'
import { useSelector } from 'react-redux'
import { info } from '../../apis/userProfile.api'
import DownloadCvModal from '../downloadCv/downloadCv'
import DeleteComment from '../deleteComment/deleteComment'

const MyPostDtails = ({ post, onClose, onCommentAdded, onCommentDeleted, onLikeToggled }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
  const commentInputRef = useRef(null)
  const [infoUser, setInfoUser] = useState()

  const [comments, setComments] = useState([])
  const [isLoadingComments, setIsLoadingComments] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [commentToDeleteId, setCommentToDeleteId] = useState(null)
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

  const handleOpenDeleteModal = (commentId) => {
    setCommentToDeleteId(commentId)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCommentToDeleteId(null)
  }

  useEffect(() => {
    const fetchPostDetailsAndComments = async () => {
      const targetId = post.postId || post.eventId
      if (!targetId) {
        setIsLoadingComments(false)
        return
      }
      setIsLoadingComments(true)
      try {
        let response
        response = await getJobPostAPI(targetId)
        const commentsData = response?.data?.commentResponseDTOS || []
        setComments(commentsData)
      } catch (error) {
        toast.error('Không thể tải chi tiết bài đăng và bình luận.')
      } finally {
        setIsLoadingComments(false)
      }
    }

    fetchPostDetailsAndComments()
  }, [post])

  const handleFocusCommentInput = () => {
    commentInputRef.current?.focus()
  }
  const handleApply = () => {
    setIsCvModalOpen(true)
  }

  const handleLike = async () => {
    const originalLikedState = isLiked
    const newLikedState = !originalLikedState
    const targetId = post.postId || post.eventId

    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
    try {
      const targetId = post.postId || post.eventId
      if (originalLikedState) await dellikePostApi({ targetId, targetType: 'JOB' })
      else {
        await likePostApi({ targetId, targetType: 'JOB', emotionType: 'LIKE' })
      }
      if (onLikeToggled) {
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1
        onLikeToggled(targetId, newLikedState, newLikeCount)
      }
    } catch (error) {
      toast.error('Thao tác không thành công.')
      setIsLiked(originalLikedState)
      setLikeCount((prev) => (originalLikedState ? prev + 1 : prev - 1))
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setIsSubmittingComment(true)
    try {
      const targetId = post.postId || post.eventId
      const response = await createCommentApi({
        targetId,
        targetType: 'JOB',
        content: newComment,
      })
      if (onCommentAdded) {
        onCommentAdded(post.postId || post.eventId)
      }
      setComments((prev) => [response.data, ...prev])
      setNewComment('')
    } catch (error) {
      toast.error('Gửi bình luận thất bại.')
    } finally {
      setIsSubmittingComment(false)
    }
  }
  const handleConfirmDelete = async () => {
    if (!commentToDeleteId) return

    try {
      await deleteCommentApi(commentToDeleteId)

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentToDeleteId),
      )
      if (onCommentDeleted) {
        onCommentDeleted(post.postId || post.eventId)
      }
      toast.success('Đã xóa bình luận.')
    } catch (error) {
      toast.error('Xóa bình luận thất bại.')
    } finally {
      handleCloseDeleteModal()
    }
  }

  const handleContentClick = (e) => e.stopPropagation()

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={handleContentClick}>
        <button onClick={onClose} className='modal-close-button'>
          &times;
        </button>
        <div className='modal-scroll-body'>
          <div className='post-card-view'>
            <div className='post-header'>
              <img src={post.creator.avatarUrl} alt='avatar' className='post-avatar' />
              <div className='post-user-info'>
                <span className='post-user-name'>{post.creator.fullName}</span>
                <span className='post-user-create'>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <span className='recruit-tag'>Recruitment</span>
            </div>
            <p className='post-title'>{post.title}</p>
            <p className='post-content'>{post.description}</p>
            {post.urlImage && post.urlImage.length > 0 && (
              <div className='post-media-container'>
                <img src={post.urlImage[0]} alt='Post media' className='post-media' />
              </div>
            )}
            <div className='post-actions'>
              <div className='action-group'>
                <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
                  {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
                </button>
                <button onClick={handleFocusCommentInput} className='action-button'>
                  <Chat /> <span>{comments.length}</span>
                </button>
                <button onClick={handleApply} className='action-button apply-button'>
                  <Handbag /> <span>{isLoadingApply ? 'Downloading...' : 'Download'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className='comments-section'>
            <form className='comment-input-form' onSubmit={handleCommentSubmit}>
              <input
                ref={commentInputRef}
                type='text'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Viết bình luận...'
                className='comment-input'
              />
              <button
                type='submit'
                disabled={isSubmittingComment}
                className='comment-submit-button'>
                Gửi
              </button>
            </form>
            <div className='comments-list'>
              {isLoadingComments ? (
                <div>Đang tải bình luận...</div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.commentId} className='comment'>
                    <img
                      src={comment.userPostResponseDTO.avatarUrl || 'https://placehold.co/32x32'}
                      alt='avatar'
                      className='comment-avatar'
                    />
                    <div className='comment-body'>
                      <span className='comment-author'>{comment.userPostResponseDTO.fullName}</span>
                      <p className='comment-text'>{comment.content}</p>
                    </div>
                    {infoUser === comment?.userPostResponseDTO?.fullName && (
                      <button
                        onClick={() => handleOpenDeleteModal(comment.commentId)}
                        className='delete-comment-btn'>
                        <Trash />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          {isCvModalOpen && (
            <DownloadCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
          )}
          {isDeleteModalOpen && (
            <DeleteComment
              onClose={handleCloseDeleteModal} // Nếu Hủy, gọi hàm đóng
              onConfirm={handleConfirmDelete} // Nếu OK, gọi hàm xác nhận xóa
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MyPostDtails
