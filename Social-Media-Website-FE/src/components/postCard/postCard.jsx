// import React, { useEffect, useState } from 'react'
// import { HandThumbsUpFill, HandThumbsUp, Chat, Handbag } from 'react-bootstrap-icons'
// import toast from 'react-hot-toast'
// import './postCard.scss'
// import { likePostApi, dellikePostApi, createCommentApi } from '../../apis/posts.api'
// import ImportCvModal from '../importcv/importcv'
// import { info } from '../../apis/userProfile.api'
// import { useSelector } from 'react-redux'

// const PostCard = ({ post, onViewDetail, onLikeToggled }) => {
//   const authState = useSelector((state) => state.auth.auth)
//   const currentUser = authState
//   const [isLoadingApply, setIsLoadingApply] = useState(false)
//   const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
//   const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
//   const [isCvModalOpen, setIsCvModalOpen] = useState(false)
//   const [infoUser, setInfoUser] = useState()
//   const fetchUser = async () => {
//     try {
//       const response = await info()
//       const userData = response?.data?.fullName
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

//   useEffect(() => {
//     setIsLiked(post.checkReaction)
//     setLikeCount(post.countReaction)
//   }, [post.checkReaction, post.countReaction])

//   const handleOpenDetail = () => {
//     if (onViewDetail) {
//       onViewDetail(post)
//     }
//   }

//   const handleLike = async () => {
//     const originalLikedState = isLiked
//     const newLikedState = !originalLikedState
//     const targetId = post.postId || post.eventId

//     setIsLiked(newLikedState)
//     setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
//     try {
//       if (originalLikedState) {
//         await dellikePostApi({
//           targetId: post.postId,
//           targetType: post.targetType,
//         })
//       } else {
//         const response = await likePostApi({
//           targetId: post.postId,
//           targetType: post.targetType,
//           emotionType: 'LIKE',
//         })
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

//   const handleApply = () => {
//     setIsCvModalOpen(true)
//   }

//   return (
//     <div className='post-card'>
//       <div className='post-header'>
//         <img
//           src={post?.creator?.avatarUrl}
//           alt={`${post?.creator?.fullName}'s avatar`}
//           className='post-avatar'
//         />
//         <div className='post-user-info'>
//           <span className='post-user-name'>{post?.creator?.fullName}</span>
//           <span className='post-user-create'>{new Date(post.createdAt).toLocaleDateString()}</span>
//         </div>
//         {post.targetType === 'JOB' && <span className='recruit-tag'>Recruitment</span>}
//         {post.targetType === 'EVENT' && <span className='recruit-tag'>Event</span>}
//       </div>
//       <p className='post-title'>{post.title}</p>
//       <p className='post-content'>{post.description}</p>
//       {post.urlImage && post.urlImage.length > 0 && (
//         <div className='post-media-container'>
//           <img src={post.urlImage} alt='Post media' className='post-media' />
//         </div>
//       )}
//       <div className='post-actions'>
//         <div className='action-group'>
//           <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
//             {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
//           </button>
//           <button onClick={handleOpenDetail} className='action-button'>
//             <Chat /> <span>{post.countComment}</span>
//           </button>
//           {post.targetType === 'JOB' && post?.creator?.fullName !== infoUser && (
//             <button
//               onClick={handleApply}
//               className='action-button apply-button'
//               disabled={isLoadingApply}>
//               <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
//             </button>
//           )}
//         </div>
//       </div>
//       {isCvModalOpen && (
//         <ImportCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
//       )}
//     </div>
//   )
// }

// export default PostCard
import React, { useEffect, useState } from 'react'
import { HandThumbsUpFill, HandThumbsUp, Chat, Handbag } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import './postCard.scss'
import { likePostApi, dellikePostApi } from '../../apis/posts.api'
import ImportCvModal from '../importcv/importcv'
import { info } from '../../apis/userProfile.api'
import { useSelector } from 'react-redux'

const PostCard = ({ post, onViewDetail, onLikeToggled }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [infoUser, setInfoUser] = useState('')

  // --- 1. CHUẨN HÓA DỮ LIỆU (Mapping keys) ---
  // Mock Data dùng 'author', API thật cũ dùng 'creator'
  const author = post.author || post.creator || {}
  // Mock Data dùng 'id', API cũ dùng 'postId'/'eventId'
  const postId = post.id || post.postId || post.eventId
  // Mock Data dùng 'type', API cũ dùng 'targetType'
  const postType = post.type || post.targetType || 'NORMAL'
  // Mock Data trả về mảng 'images', API cũ trả về string 'urlImage'
  const postImage = post.images && post.images.length > 0 ? post.images[0] : post.urlImage

  // --- 2. STATE ---
  // Ưu tiên lấy từ props mock data (isLiked/likesCount)
  const [isLiked, setIsLiked] = useState(post.isLiked || post.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post.likesCount || post.countReaction || 0)
  const [commentCount, setCommentCount] = useState(post.commentsCount || post.countComment || 0)

  // Cập nhật state khi props thay đổi (quan trọng khi phân trang/filter)
  useEffect(() => {
    setIsLiked(post.isLiked ?? post.checkReaction ?? false)
    setLikeCount(post.likesCount ?? post.countReaction ?? 0)
    setCommentCount(post.commentsCount ?? post.countComment ?? 0)
  }, [post])

  const fetchUser = async () => {
    try {
      const response = await info()
      // Mock data có thể trả về { user: {...} } hoặc trực tiếp user
      const userData = response?.user?.fullName || response?.fullName || 'User'
      setInfoUser(userData)
    } catch (err) {
      console.error(err)
      // Không toast lỗi này để tránh spam thông báo khi load trang
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchUser()
    }
  }, [currentUser])

  const handleOpenDetail = () => {
    if (onViewDetail) {
      onViewDetail(post)
    }
  }

  const handleLike = async () => {
    // Lưu lại trạng thái cũ để revert nếu lỗi
    const previousLikedState = isLiked
    const previousLikeCount = likeCount

    // Optimistic UI Update (Cập nhật giao diện ngay lập tức)
    const newLikedState = !previousLikedState
    const newLikeCount = newLikedState ? previousLikeCount + 1 : previousLikeCount - 1

    setIsLiked(newLikedState)
    setLikeCount(newLikeCount)

    try {
      // Gọi API (Mock)
      // Lưu ý: Vì là mock file tĩnh nên server sẽ không thực sự thay đổi trạng thái
      if (previousLikedState) {
        await dellikePostApi({ targetId: postId, targetType: postType })
      } else {
        await likePostApi({
          targetId: postId,
          targetType: postType,
          emotionType: 'LIKE',
        })
      }

      // Báo cho component cha biết để update (nếu cần)
      if (onLikeToggled) {
        onLikeToggled(postId, newLikedState, newLikeCount)
      }
    } catch (error) {
      toast.error('Không thể thực hiện thao tác lúc này.')
      // Revert lại trạng thái cũ nếu lỗi
      setIsLiked(previousLikedState)
      setLikeCount(previousLikeCount)
    }
  }

  const handleApply = () => {
    setIsCvModalOpen(true)
  }

  return (
    <div className='post-card'>
      <div className='post-header'>
        <img
          src={author.avatar || author.avatarUrl || 'https://via.placeholder.com/50'}
          alt={`${author.fullName}'s avatar`}
          className='post-avatar'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50'
          }} // Fallback nếu ảnh lỗi
        />
        <div className='post-user-info'>
          <span className='post-user-name'>{author.fullName || 'Người dùng ẩn danh'}</span>
          <span className='post-user-create'>
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : 'Vừa xong'}
          </span>
        </div>

        {/* Logic hiển thị Tag */}
        {postType === 'JOB' && <span className='recruit-tag'>Tuyển dụng</span>}
        {postType === 'EVENT' && <span className='recruit-tag'>Sự kiện</span>}
      </div>

      {/* Title chỉ hiển thị cho Job/Event nếu có */}
      {post.title && (
        <p className='post-title' style={{ fontWeight: 'bold' }}>
          {post.title}
        </p>
      )}

      <p className='post-content'>{post.content || post.description}</p>

      {/* Hiển thị ảnh */}
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

          <button onClick={handleOpenDetail} className='action-button'>
            <Chat /> <span>{commentCount}</span>
          </button>

          {/* Logic nút Apply: Chỉ hiện khi là JOB và người xem KHÔNG phải tác giả */}
          {/* {postType === 'JOB' && author.fullName !== infoUser && (
            <button
              onClick={handleApply}
              className='action-button apply-button'
              disabled={isLoadingApply}>
              <Handbag /> <span>{isLoadingApply ? 'Đang nộp...' : 'Ứng tuyển'}</span>
            </button>
          )} */}
        </div>
      </div>

      {isCvModalOpen && <ImportCvModal postId={postId} onClose={() => setIsCvModalOpen(false)} />}
    </div>
  )
}

export default PostCard
