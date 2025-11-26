import React, { useState, useEffect, useCallback } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import PostCard from '../../components/postCard/postCard'
import { getPostsApi } from '../../apis/posts.api'
import './userHomePage.scss'
import PostDetailModal from '../../components/PostDetailModal/PostDetailModal'
import CircularProgress from '@mui/joy/CircularProgress'

const UserHomePage = () => {
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
      const response = await getPostsApi({
        page: pagination.current,
        size: pagination.size,
      })
      setPosts(response?.data?.content)
      setTotalPosts(response?.data?.totalElements || 0)
      setIsLoading(false)
      setIsPaging(false)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      toast.error('Không thể tải bài đăng. Vui lòng thử lại sau.')
      setIsLoading(false)
      setIsPaging(false)
    } finally {
      setIsLoading(false)
      setIsPaging(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [pagination])
  const handlePostCreated = () => {
    if (pagination.current === 0) {
      fetchPosts()
    } else {
      setPagination((prev) => ({ ...prev, current: 0 }))
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
  const handleCommentAdded = (targetPostId) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.postId === targetPostId || p.eventId === targetPostId) {
          return { ...p, countComment: p.countComment + 1 }
        }
        return p
      }),
    )
  }
  const handleLikeToggled = (targetPostId, newLikeState, newLikeCount) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.postId === targetPostId || p.eventId === targetPostId) {
          return { ...p, checkReaction: newLikeState, countReaction: newLikeCount }
        }
        return p
      }),
    )
  }
  const handleCommentDeleted = (targetPostId) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.postId === targetPostId || p.eventId === targetPostId) {
          return { ...p, countComment: Math.max(0, p.countComment - 1) }
        }
        return p
      }),
    )
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

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
            <PostCard
              key={post.postId || post.eventId}
              post={post}
              onViewDetail={handleViewPostDetail}
              onLikeToggled={handleLikeToggled}
            />
          ))
        ) : (
          <div className='no-posts-message'>Chưa có bài đăng nào để hiển thị.</div>
        )}

        <div className='pagination-wrapper'>
          {!isLoading && totalPosts > 0 && (
            <>
              <Pagination
                current={pagination.current + 1}
                total={totalPosts}
                pageSize={pagination.size}
                showSizeChanger
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                disabled={isPaging}
              />
              {isPaging && <CircularProgress size='sm' color='primary' />}
            </>
          )}
        </div>
        {selectedPost && (
          <PostDetailModal
            key={selectedPost.postId || selectedPost.eventId}
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

export default UserHomePage
