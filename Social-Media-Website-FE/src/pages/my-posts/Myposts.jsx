// import React, { useState, useEffect, useCallback, use } from 'react'
// import { Pagination } from 'antd'
// import toast from 'react-hot-toast'
// import CreatePost from '../../components/createPost/createPost'
// import { getmyposts } from '../../apis/posts.api'
// import './myposts.scss'
// import MyPosts from '../../components/myPosts/myPosts'
// import MyPostDtails from '../../components/myPostDetails/myPostDetails'
// import CircularProgress from '@mui/joy/CircularProgress'

// const Myposts = () => {
//   const [pagination, setPagination] = useState({
//     current: 0,
//     size: 10,
//   })
//   const [posts, setPosts] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [totalPosts, setTotalPosts] = useState(0)
//   const [selectedPost, setSelectedPost] = useState(null)
//   const [isPaging, setIsPaging] = useState(false)

//   const fetchPosts = async () => {
//     try {
//       const response = await getmyposts({
//         page: pagination.current,
//         size: pagination.size,
//       })
//       setPosts(response?.data?.content)
//       setTotalPosts(response?.data?.totalElements || 0)
//       setIsLoading(false)
//       setIsPaging(false)
//     } catch (error) {
//       toast.error('Không thể tải bài đăng. Vui lòng thử lại sau.')
//       setIsLoading(false)
//     } finally {
//       setIsLoading(false)
//       setIsPaging(false)
//     }
//   }
//   useEffect(() => {
//     fetchPosts()
//   }, [pagination])

//   const handlePostCreated = () => {
//     if (pagination.current === 0) {
//       fetchPosts()
//     } else {
//       setPagination((prev) => ({ ...prev, current: 0 }))
//     }
//   }

//   const handlePageChange = (pageCurrent, pageSize) => {
//     setIsPaging(true)

//     setPagination((prev) => ({
//       ...prev,
//       current: pageCurrent - 1,
//       size: pageSize || prev.size,
//     }))
//   }
//   const handleViewPostDetail = (postToView) => {
//     setSelectedPost(postToView)
//   }
//   const handleCommentAdded = (targetPostId) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((p) => {
//         if (p.postId === targetPostId) {
//           return { ...p, countComment: p.countComment + 1 }
//         }
//         return p
//       }),
//     )
//   }
//   const handleLikeToggled = (targetPostId, newLikeState, newLikeCount) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((p) => {
//         if (p.postId === targetPostId || p.eventId === targetPostId) {
//           return { ...p, checkReaction: newLikeState, countReaction: newLikeCount }
//         }
//         return p
//       }),
//     )
//   }
//   const handleCommentDeleted = (targetPostId) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((p) => {
//         if (p.postId === targetPostId || p.eventId === targetPostId) {
//           return { ...p, countComment: Math.max(0, p.countComment - 1) }
//         }
//         return p
//       }),
//     )
//   }

//   const handleCloseModal = () => {
//     setSelectedPost(null)
//   }

//   const handlePostUpdated = (updatedPost) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((posts) => (posts.postId === updatedPost.postId ? updatedPost : posts)),
//     )
//     toast.success('Bài đăng đã được cập nhật!')
//   }

//   return (
//     <div className='user-homepage-container'>
//       <div className='main-content'>
//         {!isLoading && <CreatePost posts={posts} onPostCreated={handlePostCreated} />}

//         {isLoading ? (
//           <div className='loading-container'>
//             <CircularProgress color='primary' />
//           </div>
//         ) : posts && posts.length > 0 ? (
//           posts.map((post) => (
//             <MyPosts
//               key={post.postId || post.eventId}
//               post={post}
//               onPostUpdated={handlePostUpdated}
//               onViewDetail={handleViewPostDetail}
//               onLikeToggled={handleLikeToggled}
//             />
//           ))
//         ) : (
//           <div className='no-posts-message'>Chưa có bài đăng nào để hiển thị.</div>
//         )}
//         <div className='pagination-wrapper'>
//           {totalPosts > 0 && !isLoading && (
//             <>
//               <Pagination
//                 current={pagination.current + 1}
//                 total={totalPosts}
//                 pageSize={pagination.size}
//                 showSizeChanger
//                 onChange={handlePageChange}
//                 onShowSizeChange={handlePageChange}
//               />
//               {isPaging && <CircularProgress size='sm' color='primary' />}
//             </>
//           )}
//         </div>
//         {selectedPost && (
//           <MyPostDtails
//             key={selectedPost.postId || selectedPost.eventId}
//             post={selectedPost}
//             onClose={handleCloseModal}
//             onCommentAdded={handleCommentAdded}
//             onLikeToggled={handleLikeToggled}
//             onCommentDeleted={handleCommentDeleted}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default Myposts

import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import { getmyposts } from '../../apis/posts.api'
import './myposts.scss'
import MyPostsComponent from '../../components/myPosts/myPosts'
import MyPostDtails from '../../components/myPostDetails/myPostDetails'
import CircularProgress from '@mui/joy/CircularProgress'
import { useSelector } from 'react-redux'

const Myposts = () => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState

  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isPaging, setIsPaging] = useState(false)

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      // 1. Gọi API lấy toàn bộ danh sách (Mock trả về list tổng)
      const response = await getmyposts()

      const allPosts = Array.isArray(response) ? response : response?.data?.content || []

      // 2. LOGIC MOCK: LỌC BÀI VIẾT CỦA TÔI
      // ID người dùng hiện tại (Lấy từ redux hoặc fallback 'u1' của mock)
      const currentUserId = currentUser?.id || currentUser?.user?.id || 'u1'

      const myPostList = allPosts.filter((post) => {
        // Mock data dùng key 'author', API cũ dùng 'creator'
        const authorId = post.author?.id || post.creator?.id
        // So sánh tương đối (đề phòng string/number)
        return String(authorId) === String(currentUserId)
      })

      // 3. LOGIC MOCK: PHÂN TRANG CLIENT
      const total = myPostList.length
      const startIndex = pagination.current * pagination.size
      const endIndex = startIndex + pagination.size
      const paginatedPosts = myPostList.slice(startIndex, endIndex)

      setPosts(paginatedPosts)
      setTotalPosts(total)
    } catch (error) {
      console.error(error)
      // toast.error('Không thể tải bài đăng.')
    } finally {
      setIsLoading(false)
      setIsPaging(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [pagination.current, pagination.size, currentUser])

  const handlePostCreated = (newPost) => {
    // Nếu nhận được bài mới từ CreatePost (giả lập), thêm ngay vào list để hiển thị
    if (newPost) {
      setPosts((prev) => [newPost, ...prev])
      setTotalPosts((prev) => prev + 1)
    } else {
      // Logic cũ (reload trang 1)
      if (pagination.current === 0) {
        fetchPosts()
      } else {
        setPagination((prev) => ({ ...prev, current: 0 }))
      }
    }
  }

  const handlePageChange = (pageCurrent, pageSize) => {
    setIsPaging(true)
    setPagination((prev) => ({
      ...prev,
      current: pageCurrent - 1,
      size: pageSize || prev.size,
    }))
  }

  const handleViewPostDetail = (postToView) => {
    setSelectedPost(postToView)
  }

  // --- Fake Update State (Optimistic UI) ---
  const handleLikeToggled = (targetPostId, newLikeState, newLikeCount) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        const pId = p.id || p.postId || p.eventId
        if (pId === targetPostId) {
          return {
            ...p,
            isLiked: newLikeState,
            likesCount: newLikeCount,
            checkReaction: newLikeState, // Fallback key cũ
            countReaction: newLikeCount, // Fallback key cũ
          }
        }
        return p
      }),
    )
  }

  const handleCommentAdded = (targetPostId) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        const pId = p.id || p.postId || p.eventId
        if (pId === targetPostId) {
          // Tăng biến đếm comment (hỗ trợ cả key cũ và mới)
          const currentCount = (p.commentsCount || p.countComment || 0) + 1
          return { ...p, commentsCount: currentCount, countComment: currentCount }
        }
        return p
      }),
    )
  }

  const handleCommentDeleted = (targetPostId) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        const pId = p.id || p.postId || p.eventId
        if (pId === targetPostId) {
          const currentCount = Math.max(0, (p.commentsCount || p.countComment || 0) - 1)
          return { ...p, commentsCount: currentCount, countComment: currentCount }
        }
        return p
      }),
    )
  }

  const handlePostUpdated = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        const pId = p.id || p.postId
        const uId = updatedPost.id || updatedPost.postId
        return pId === uId ? { ...p, ...updatedPost } : p
      }),
    )
    toast.success('Bài đăng đã được cập nhật (Giả lập)!')
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  // Helper lấy ID cho key (tránh trùng lặp)
  const getPostKey = (post) => post.id || post.postId || post.eventId || Math.random()

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        {!isLoading && <CreatePost posts={posts} onPostCreated={handlePostCreated} />}

        {isLoading ? (
          <div className='loading-container'>
            <CircularProgress color='primary' />
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <MyPostsComponent
              key={getPostKey(post)}
              post={post}
              onPostUpdated={handlePostUpdated}
              onViewDetail={handleViewPostDetail}
              onLikeToggled={handleLikeToggled}
            />
          ))
        ) : (
          <div className='no-posts-message'>Bạn chưa có bài đăng nào.</div>
        )}

        <div className='pagination-wrapper'>
          {totalPosts > 0 && !isLoading && (
            <>
              <Pagination
                current={pagination.current + 1}
                total={totalPosts}
                pageSize={pagination.size}
                showSizeChanger
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
              />
              {isPaging && <CircularProgress size='sm' color='primary' />}
            </>
          )}
        </div>

        {selectedPost && (
          <MyPostDtails
            key={getPostKey(selectedPost)}
            post={selectedPost}
            onClose={handleCloseModal}
            onCommentAdded={handleCommentAdded}
            onLikeToggled={handleLikeToggled}
            onCommentDeleted={handleCommentDeleted}
          />
        )}
      </div>
    </div>
  )
}

export default Myposts
