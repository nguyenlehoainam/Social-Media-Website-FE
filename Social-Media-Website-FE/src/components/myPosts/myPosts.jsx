// import React, { useEffect, useState } from 'react'
// import { HandThumbsUpFill, HandThumbsUp, Chat, Handbag } from 'react-bootstrap-icons'
// import toast from 'react-hot-toast'
// import './myPosts.scss'
// import { likePostApi, dellikePostApi } from '../../apis/posts.api'
// import UpdatePost from '../updatePost/updatePost'
// import DownloadCvModal from '../downloadCv/downloadCv'

// const MyPosts = ({ post, onPostUpdated, onViewDetail, onLikeToggled }) => {
//   const [isLoadingApply, setIsLoadingApply] = useState(false)
//   const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
//   const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
//   const [isCvModalOpen, setIsCvModalOpen] = useState(false)
//   const [isUpdate, setIsUpdate] = useState(false)

//   const handleLike = async () => {
//     const originalLikedState = isLiked
//     const newLikedState = !originalLikedState
//     const targetId = post.postId || post.eventId

//     setIsLiked(newLikedState)
//     setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
//     try {
//       if (originalLikedState) {
//         await dellikePostApi({ targetId: post.postId, targetType: 'JOB' })
//       } else {
//         await likePostApi({ targetId: post.postId, targetType: 'JOB', emotionType: 'LIKE' })
//       }
//       if (onLikeToggled) {
//         const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1
//         onLikeToggled(targetId, newLikedState, newLikeCount)
//       }
//     } catch (error) {
//       toast.error('Đã có lỗi xảy ra khi thực hiện thao tác.')
//       setIsLiked(originalLikedState)
//       setLikeCount(originalLikeCount)
//     }
//   }
//   useEffect(() => {
//     setIsLiked(post.checkReaction)
//     setLikeCount(post.countReaction)
//   }, [post.checkReaction, post.countReaction])

//   const handleApply = () => setIsCvModalOpen(true)
//   const handleUpdate = () => setIsUpdate(true)
//   const handleOpenDetail = () => {
//     if (onViewDetail) {
//       onViewDetail(post)
//     }
//   }

//   return (
//     <div className='post-card'>
//       <div className='post-header'>
//         <img
//           src={post.creator.avatarUrl}
//           alt={`${post.creator.fullName}'s avatar`}
//           className='post-avatar'
//         />
//         <div className='post-user-info'>
//           <span className='post-user-name'>{post.creator.fullName}</span>
//           <span className='post-user-create'>{new Date(post.createdAt).toLocaleDateString()}</span>
//         </div>
//         <span className='recruit-tag'>Recruitment</span>
//       </div>
//       <p className='post-title'>{post.title}</p>
//       <p className='post-content'>{post.description}</p>
//       {post.urlImage && post.urlImage.length > 0 && (
//         <div className='post-media-container'>
//           <img src={post.urlImage} alt='Post media' className='post-media' />
//         </div>
//       )}
//       <div className='post-actions'>
//         {/* Nhóm các nút bên trái */}
//         <div className='action-group'>
//           <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
//             {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
//           </button>
//           <button onClick={handleOpenDetail} className='action-button'>
//             <Chat /> <span>{post.countComment}</span>
//           </button>
//           <button
//             onClick={handleApply}
//             className='action-button apply-button'
//             disabled={isLoadingApply}>
//             <Handbag /> <span>{isLoadingApply ? 'Downloading...' : 'Download'}</span>
//           </button>
//         </div>

//         <div className='post-edit-action'>
//           <button onClick={handleUpdate} className='post-edit-button'>
//             Edit
//           </button>
//         </div>
//       </div>
//       {isCvModalOpen && (
//         <DownloadCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
//       )}
//       {isUpdate && (
//         <UpdatePost post={post} onClose={() => setIsUpdate(false)} onPostUpdated={onPostUpdated} />
//       )}
//     </div>
//   )
// }

// export default MyPosts

import React, { useEffect, useState } from 'react'
import { HandThumbsUpFill, HandThumbsUp, Chat, Handbag } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import './myPosts.scss'
import { likePostApi, dellikePostApi } from '../../apis/posts.api'
import UpdatePost from '../updatePost/updatePost'
import DownloadCvModal from '../downloadCv/downloadCv'

const MyPosts = ({ post, onPostUpdated, onViewDetail, onLikeToggled }) => {
  // --- 1. GUARD CLAUSE: Chặn lỗi undefined ---
  // if (!post) return null

  // --- 2. CHUẨN HÓA DỮ LIỆU (Mapping Keys) ---
  const author = post.author
  const postId = post.id || post.postId || post.eventId
  // Mock data dùng mảng images[], API cũ dùng string urlImage
  const postImage = post.images && post.images.length > 0 ? post.images[0] : post.urlImage
  const postType = post.type || post.targetType || 'JOB'

  // --- 3. STATE ---
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  // State hiển thị tương tác (Ưu tiên key mock data)
  const [isLiked, setIsLiked] = useState(post.isLiked || post.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post.likesCount || post.countReaction || 0)
  const [commentCount, setCommentCount] = useState(post.commentsCount || post.countComment || 0)

  // Cập nhật state khi props thay đổi
  useEffect(() => {
    setIsLiked(post.isLiked ?? post.checkReaction ?? false)
    setLikeCount(post.likesCount ?? post.countReaction ?? 0)
    setCommentCount(post.commentsCount ?? post.countComment ?? 0)
  }, [post])

  // --- 4. HANDLERS ---
  const handleLike = async () => {
    const originalLikedState = isLiked
    const newLikedState = !originalLikedState

    // Optimistic UI Update
    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))

    try {
      if (originalLikedState) {
        await dellikePostApi({ targetId: postId, targetType: postType })
      } else {
        await likePostApi({ targetId: postId, targetType: postType, emotionType: 'LIKE' })
      }

      if (onLikeToggled) {
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1
        onLikeToggled(postId, newLikedState, newLikeCount)
      }
    } catch (error) {
      toast.error('Thao tác thất bại.')
      // Revert lại nếu lỗi
      setIsLiked(originalLikedState)
      setLikeCount((prev) => (originalLikedState ? prev + 1 : prev - 1))
    }
  }

  const handleApply = () => setIsCvModalOpen(true)
  const handleUpdate = () => setIsUpdate(true)

  const handleOpenDetail = () => {
    if (onViewDetail) {
      onViewDetail(post)
    }
  }

  // Helper hiển thị an toàn
  const displayName = author.fullName || 'Người dùng'
  const displayAvatar = author.avatar || author.avatarUrl || 'https://via.placeholder.com/50'
  const displayDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('vi-VN')
    : 'Vừa xong'

  return (
    <div className='post-card'>
      {/* HEADER */}
      <div className='post-header'>
        <img
          src={displayAvatar}
          alt='avatar'
          className='post-avatar'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50'
          }}
        />
        <div className='post-user-info'>
          <span className='post-user-name'>{displayName}</span>
          <span className='post-user-create'>{displayDate}</span>
        </div>
        <span className='recruit-tag'>{postType === 'JOB' ? 'Recruitment' : 'Event'}</span>
      </div>

      {/* CONTENT */}
      {post.title && <p className='post-title'>{post.title}</p>}
      <p className='post-content'>{post.description || post.content}</p>

      {/* IMAGE */}
      {postImage && (
        <div className='post-media-container'>
          <img src={postImage} alt='Post media' className='post-media' />
        </div>
      )}

      {/* ACTIONS */}
      <div className='post-actions'>
        <div className='action-group'>
          <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
            {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
          </button>
          <button onClick={handleOpenDetail} className='action-button'>
            <Chat /> <span>{commentCount}</span>
          </button>

          {/* Nút Download CV chỉ hiện với JOB */}
          {/* {postType === 'JOB' && (
            <button
              onClick={handleApply}
              className='action-button apply-button'
              disabled={isLoadingApply}>
              <Handbag /> <span>{isLoadingApply ? 'Downloading...' : 'Download CV'}</span>
            </button>
          )} */}
        </div>

        <div className='post-edit-action'>
          <button onClick={handleUpdate} className='post-edit-button'>
            Edit
          </button>
        </div>
      </div>

      {/* MODALS */}
      {/* {isCvModalOpen && <DownloadCvModal postId={postId} onClose={() => setIsCvModalOpen(false)} />} */}
      {isUpdate && (
        <UpdatePost post={post} onClose={() => setIsUpdate(false)} onPostUpdated={onPostUpdated} />
      )}
    </div>
  )
}

export default MyPosts
