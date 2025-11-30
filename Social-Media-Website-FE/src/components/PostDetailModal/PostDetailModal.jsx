// import React, { useState, useEffect, useRef } from 'react'
// import toast from 'react-hot-toast'
// import { HandThumbsUp, Chat, HandThumbsUpFill, Handbag, Trash } from 'react-bootstrap-icons'
// import './PostDetailModal.scss'
// import {
//   dellikePostApi,
//   likePostApi,
//   getPostsdetail,
//   getJobPostAPI,
//   createCommentApi,
//   deleteCommentApi,
// } from '../../apis/posts.api'
// import ImportCvModal from '../importcv/importcv'
// import { info } from '../../apis/userProfile.api'
// import { useSelector } from 'react-redux'
// import DeleteComment from '../deleteComment/deleteComment'

// const PostDetailModal = ({ post, onClose, onCommentAdded, onCommentDeleted, onLikeToggled }) => {
//   const authState = useSelector((state) => state.auth.auth)
//   const currentUser = authState
//   const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
//   const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
//   const commentInputRef = useRef(null)
//   const [comments, setComments] = useState([])
//   const [isLoadingComments, setIsLoadingComments] = useState(true)
//   const [newComment, setNewComment] = useState('')
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false)
//   const [isCvModalOpen, setIsCvModalOpen] = useState(false)
//   const [isLoadingApply, setIsLoadingApply] = useState(false)
//   const [infoUser, setInfoUser] = useState()
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [commentToDeleteId, setCommentToDeleteId] = useState(null)
//   const handleOpenDeleteModal = (commentId) => {
//     setCommentToDeleteId(commentId)
//     setIsDeleteModalOpen(true)
//   }

//   const handleCloseDeleteModal = () => {
//     setIsDeleteModalOpen(false)
//     setCommentToDeleteId(null)
//   }

//   useEffect(() => {
//     const fetchPostDetailsAndComments = async () => {
//       const targetId = post.postId || post.eventId
//       if (!targetId) {
//         setIsLoadingComments(false)
//         return
//       }

//       setIsLoadingComments(true)

//       try {
//         let response
//         if (post.targetType === 'JOB') {
//           response = await getJobPostAPI(targetId)
//         } else if (post.targetType === 'EVENT') {
//           response = await getPostsdetail({ eventId: targetId })
//         }
//         const commentsData = response?.data?.commentResponseDTOS || []
//         setComments(commentsData)
//       } catch (error) {
//         toast.error('Không thể tải chi tiết bài đăng và bình luận.')
//       } finally {
//         setIsLoadingComments(false)
//       }
//     }

//     fetchPostDetailsAndComments()
//   }, [post])
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

//   const handleFocusCommentInput = () => {
//     commentInputRef.current?.focus()
//   }
//   const handleApply = () => {
//     setIsCvModalOpen(true)
//   }

//   const handleLike = async () => {
//     const originalLikedState = isLiked
//     const newLikedState = !originalLikedState
//     setIsLiked(newLikedState)
//     setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
//     try {
//       const targetId = post.postId || post.eventId
//       if (originalLikedState) await dellikePostApi({ targetId, targetType: post.targetType })
//       else await likePostApi({ targetId, targetType: post.targetType, emotionType: 'LIKE' })
//       if (onLikeToggled) {
//         const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1
//         onLikeToggled(targetId, newLikedState, newLikeCount)
//       }
//     } catch (error) {
//       toast.error('Thao tác không thành công.')
//       setIsLiked(originalLikedState)
//       setLikeCount((prev) => (originalLikedState ? prev + 1 : prev - 1))
//     }
//   }
//   const handleConfirmDelete = async () => {
//     if (!commentToDeleteId) return

//     try {
//       await deleteCommentApi(commentToDeleteId)

//       setComments((prevComments) =>
//         prevComments.filter((comment) => comment.commentId !== commentToDeleteId),
//       )
//       if (onCommentDeleted) {
//         onCommentDeleted(post.postId || post.eventId)
//       }
//       toast.success('Đã xóa bình luận.')
//     } catch (error) {
//       toast.error('Xóa bình luận thất bại.')
//     } finally {
//       handleCloseDeleteModal()
//     }
//   }

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault()
//     if (!newComment.trim()) return
//     setIsSubmittingComment(true)
//     try {
//       const targetId = post.postId || post.eventId
//       const response = await createCommentApi({
//         targetId,
//         targetType: post.targetType,
//         content: newComment,
//       })
//       setComments((prev) => [response.data, ...prev])
//       setNewComment('')
//       if (onCommentAdded) {
//         onCommentAdded(post.postId || post.eventId)
//       }
//     } catch (error) {
//       toast.error('Gửi bình luận thất bại.')
//     } finally {
//       setIsSubmittingComment(false)
//     }
//   }
//   const handleContentClick = (e) => e.stopPropagation()

//   return (
//     <div className='modal-overlay' onClick={onClose}>
//       <div className='modal-content' onClick={handleContentClick}>
//         <button onClick={onClose} className='modal-close-button'>
//           &times;
//         </button>
//         <div className='modal-scroll-body'>
//           <div className='post-card-view'>
//             <div className='post-header'>
//               <img src={post.creator.avatarUrl} alt='avatar' className='post-avatar' />
//               <div className='post-user-info'>
//                 <span className='post-user-name'>{post.creator.fullName}</span>
//                 <span className='post-user-create'>
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//               {post.targetType === 'JOB' && <span className='recruit-tag'>Recruitment</span>}
//               {post.targetType === 'EVENT' && <span className='recruit-tag event'>Event</span>}
//             </div>
//             <p className='post-title'>{post.title}</p>
//             <p className='post-content'>{post.description}</p>
//             {post.urlImage && post.urlImage.length > 0 && (
//               <div className='post-media-container'>
//                 {/* Nếu urlImage là một mảng, bạn cần lấy phần tử đầu tiên */}
//                 <img src={post.urlImage[0]} alt='Post media' className='post-media' />
//               </div>
//             )}
//             <div className='post-actions'>
//               <div className='action-group'>
//                 <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
//                   {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
//                 </button>
//                 <button onClick={handleFocusCommentInput} className='action-button'>
//                   <Chat /> <span>{comments.length}</span>
//                 </button>
//                 {post.targetType === 'JOB' && (
//                   <button onClick={handleApply} className='action-button apply-button'>
//                     <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className='comments-section'>
//             <form className='comment-input-form' onSubmit={handleCommentSubmit}>
//               <input
//                 ref={commentInputRef}
//                 type='text'
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder='Viết bình luận...'
//                 className='comment-input'
//               />
//               <button
//                 type='submit'
//                 disabled={isSubmittingComment}
//                 className='comment-submit-button'>
//                 Gửi
//               </button>
//             </form>
//             <div className='comments-list'>
//               {isLoadingComments ? (
//                 <div>Đang tải bình luận...</div>
//               ) : (
//                 comments.map((comment) => (
//                   <div key={comment.commentId} className='comment'>
//                     <img
//                       src={comment.userPostResponseDTO.avatarUrl || 'https://placehold.co/32x32'}
//                       alt='avatar'
//                       className='comment-avatar'
//                     />
//                     <div className='comment-body'>
//                       <span className='comment-author'>{comment.userPostResponseDTO.fullName}</span>
//                       <p className='comment-text'>{comment.content}</p>
//                     </div>
//                     {infoUser?.fullName === comment?.userPostResponseDTO?.fullName && (
//                       <button
//                         onClick={() => handleOpenDeleteModal(comment.commentId)}
//                         className='delete-comment-btn'>
//                         <Trash />
//                       </button>
//                     )}
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {isCvModalOpen && (
//             <ImportCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
//           )}
//           {isDeleteModalOpen && (
//             <DeleteComment onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PostDetailModal

import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { HandThumbsUp, Chat, HandThumbsUpFill, Handbag, Trash } from 'react-bootstrap-icons'
import './PostDetailModal.scss'
import {
  dellikePostApi,
  likePostApi,
  createCommentApi,
  deleteCommentApi,
} from '../../apis/posts.api'
import ImportCvModal from '../importcv/importcv'
import { info } from '../../apis/userProfile.api'
import { useSelector } from 'react-redux'
import DeleteComment from '../deleteComment/deleteComment'

const PostDetailModal = ({ post, onClose, onCommentAdded, onCommentDeleted, onLikeToggled }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState

  // --- 1. CHUẨN HÓA DỮ LIỆU ĐẦU VÀO ---
  // Tự động nhận diện key cũ (creator) và key mới (author)
  const author = post.author || post.creator || {}
  const postId = post.id || post.postId || post.eventId
  const postType = post.type || post.targetType || 'NORMAL'
  const postImage = post.images && post.images.length > 0 ? post.images[0] : post.urlImage

  // --- STATE ---
  const [isLiked, setIsLiked] = useState(post.isLiked || post.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post.likesCount || post.countReaction || 0)

  const commentInputRef = useRef(null)
  const [comments, setComments] = useState([])
  const [isLoadingComments, setIsLoadingComments] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isLoadingApply, setIsLoadingApply] = useState(false)

  const [infoUser, setInfoUser] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [commentToDeleteId, setCommentToDeleteId] = useState(null)

  // --- HELPER FUNCTION (Xử lý sự khác biệt cấu trúc dữ liệu comment) ---
  const getCommentId = (comment) => comment.id || comment.commentId

  const getCommentAuthorName = (comment) =>
    comment.author?.fullName || comment.userPostResponseDTO?.fullName || 'Người dùng ẩn danh'

  const getCommentAvatar = (comment) =>
    comment.author?.avatar ||
    comment.userPostResponseDTO?.avatarUrl ||
    'https://via.placeholder.com/32'

  // --- HANDLERS ---
  const handleOpenDeleteModal = (commentId) => {
    setCommentToDeleteId(commentId)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCommentToDeleteId(null)
  }

  // --- 2. LOGIC LOAD VÀ LỌC COMMENT ---
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoadingComments(true)
      try {
        // Mock Mode: Gọi API này thực chất là lấy toàn bộ file comments.json
        const response = await createCommentApi({ targetId: postId })

        // Lấy mảng dữ liệu
        const listComments = Array.isArray(response) ? response : response.data || []

        // QUAN TRỌNG: Lọc comment theo ID bài viết
        const filteredComments = listComments.filter(
          (comment) => comment.postId === postId || comment.targetId === postId,
        )

        // Sắp xếp comment mới nhất lên đầu (nếu có field createdAt)
        filteredComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        setComments(filteredComments)
      } catch (error) {
        console.error('Lỗi tải comment:', error)
      } finally {
        setIsLoadingComments(false)
      }
    }

    if (postId) {
      fetchComments()
    }
  }, [postId])

  // Lấy thông tin người dùng hiện tại để hiển thị khi comment
  const fetchUser = async () => {
    try {
      const response = await info()
      const userData = response.me || response.loginResponse?.user || response || {}
      setInfoUser(userData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchUser()
    }
  }, [currentUser])

  const handleFocusCommentInput = () => {
    commentInputRef.current?.focus()
  }

  const handleApply = () => {
    setIsCvModalOpen(true)
  }

  const handleLike = async () => {
    const originalLikedState = isLiked
    const newLikedState = !originalLikedState

    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))

    try {
      if (originalLikedState) await dellikePostApi({ targetId: postId, targetType: postType })
      else await likePostApi({ targetId: postId, targetType: postType, emotionType: 'LIKE' })

      if (onLikeToggled) {
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1
        onLikeToggled(postId, newLikedState, newLikeCount)
      }
    } catch (error) {
      toast.error('Thao tác thất bại.')
      setIsLiked(originalLikedState)
      setLikeCount((prev) => (originalLikedState ? prev + 1 : prev - 1))
    }
  }

  const handleConfirmDelete = async () => {
    if (!commentToDeleteId) return

    try {
      await deleteCommentApi(commentToDeleteId)

      // Cập nhật UI ngay lập tức
      setComments((prevComments) =>
        prevComments.filter((comment) => getCommentId(comment) !== commentToDeleteId),
      )

      if (onCommentDeleted) {
        onCommentDeleted(postId)
      }
      toast.success('Đã xóa bình luận.')
    } catch (error) {
      toast.error('Xóa bình luận thất bại.')
    } finally {
      handleCloseDeleteModal()
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setIsSubmittingComment(true)

    try {
      // Gọi API (Mock trả về success nhưng không lưu vào file json)
      await createCommentApi({
        targetId: postId,
        targetType: postType,
        content: newComment,
      })

      // --- TẠO COMMENT GIẢ LẬP ĐỂ HIỆN NGAY ---
      const currentUserData = infoUser || currentUser?.user || currentUser || {}

      const fakeNewComment = {
        id: `temp-${Date.now()}`,
        postId: postId, // Gán ID bài viết hiện tại
        content: newComment,
        createdAt: new Date().toISOString(),
        author: {
          fullName: currentUserData.fullName || 'Tôi',
          avatar:
            currentUserData.avatar || currentUserData.avatarUrl || 'https://via.placeholder.com/32',
        },
        // Fallback key cũ
        userPostResponseDTO: {
          fullName: currentUserData.fullName || 'Tôi',
          avatarUrl:
            currentUserData.avatar || currentUserData.avatarUrl || 'https://via.placeholder.com/32',
        },
      }

      setComments((prev) => [fakeNewComment, ...prev])
      setNewComment('')

      if (onCommentAdded) {
        onCommentAdded(postId)
      }
    } catch (error) {
      console.error(error)
      toast.error('Gửi bình luận thất bại.')
    } finally {
      setIsSubmittingComment(false)
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
          {/* --- PHẦN CHI TIẾT BÀI VIẾT --- */}
          <div className='post-card-view'>
            <div className='post-header'>
              <img
                src={author.avatar || author.avatarUrl || 'https://via.placeholder.com/50'}
                alt='avatar'
                className='post-avatar'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/50'
                }}
              />
              <div className='post-user-info'>
                <span className='post-user-name'>{author.fullName || 'Người dùng'}</span>
                <span className='post-user-create'>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString('vi-VN')
                    : 'Vừa xong'}
                </span>
              </div>
              {postType === 'JOB' && <span className='recruit-tag'>Tuyển dụng</span>}
              {postType === 'EVENT' && <span className='recruit-tag event'>Sự kiện</span>}
            </div>

            {post.title && <p className='post-title'>{post.title}</p>}
            <p className='post-content'>{post.content || post.description}</p>

            {postImage && (
              <div className='post-media-container'>
                <img src={postImage} alt='Post media' className='post-media' />
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
                {postType === 'JOB' && author.fullName !== infoUser?.fullName && (
                  <button onClick={handleApply} className='action-button apply-button'>
                    <Handbag /> <span>{isLoadingApply ? 'Đang nộp...' : 'Ứng tuyển'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* --- PHẦN BÌNH LUẬN --- */}
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
                <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
                  Đang tải bình luận...
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={getCommentId(comment)} className='comment'>
                    <img
                      src={getCommentAvatar(comment)}
                      alt='avatar'
                      className='comment-avatar'
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/32'
                      }}
                    />
                    <div className='comment-body'>
                      <span className='comment-author'>{getCommentAuthorName(comment)}</span>
                      <p className='comment-text'>{comment.content}</p>
                    </div>

                    {/* Nút xóa: Hiện nếu tên người comment trùng với user đang đăng nhập */}
                    {infoUser?.fullName === getCommentAuthorName(comment) && (
                      <button
                        onClick={() => handleOpenDeleteModal(getCommentId(comment))}
                        className='delete-comment-btn'>
                        <Trash />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  Chưa có bình luận nào. Hãy là người đầu tiên!
                </div>
              )}
            </div>
          </div>

          {isCvModalOpen && (
            <ImportCvModal postId={postId} onClose={() => setIsCvModalOpen(false)} />
          )}
          {isDeleteModalOpen && (
            <DeleteComment onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetailModal
