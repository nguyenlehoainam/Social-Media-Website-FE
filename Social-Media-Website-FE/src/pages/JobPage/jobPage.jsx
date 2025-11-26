import React, { useState, useEffect, useCallback, use } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import { getJobApi } from '../../apis/posts.api'

import './JobPage.scss'
import JobPostCard from '../../components/jobPostCard/jobPostCard'
import JobDetails from '../../components/jobDetails/jobDetails'
import CircularProgress from '@mui/joy/CircularProgress'

const JobPage = () => {
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
      const response = await getJobApi({
        page: pagination.current,
        size: pagination.size,
      })
      setPosts(response?.data?.content)
      setTotalPosts(response?.data?.totalElements || 0)
      setIsLoading(false)
      setIsPaging(false)
    } catch (error) {
      toast.error('Không thể tải bài đăng. Vui lòng thử lại sau.')
      setIsLoading(false)
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
          return { ...p, countComment: (p.countComment || 0) + 1 }
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
            <JobPostCard
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
          <JobDetails
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

export default JobPage
