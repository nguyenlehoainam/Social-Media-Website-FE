import React, { useState, useEffect, useCallback } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import PostCard from '../../components/postCard/postCard'
import SidebarWidget from '../../components/SidebarWidget/sidebarWidget'
import { getPostsApi } from '../../apis/posts.api'
import './userHomePage.scss'

const UserHomePage = () => {
  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)

  const fetchPosts = async () => {
    try {
      const response = await getPostsApi({
        page: pagination.current,
        size: pagination.size,
      })
      setPosts(response?.data?.data?.content)
      setTotalPosts(response?.data?.data?.totalElements || 0)
      setIsLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      toast.error('Không thể tải bài đăng. Vui lòng thử lại sau.')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [pagination])
  console.log('totalelement', totalPosts)
  const handlePostCreated = () => {
    if (pagination.current === 0) {
      fetchPosts()
    } else {
      setPagination((prev) => ({ ...prev, current: 0 }))
    }
  }

  const handlePageChange = (pageCurrent, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: pageCurrent - 1,
      size: pageSize || prev.size,
    }))
  }
  const handlePostUpdate = (updatedPost) => {
    setPostsData((prevData) => ({
      ...prevData,
      content: prevData.content.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    }))
  }
  if (isLoading) {
    return <div>Đang tải bài viết...</div>
  }

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        <CreatePost posts={posts} onPostCreated={handlePostCreated} />
        {isLoading ? (
          <div className='loading-indicator'>Đang tải bài viết...</div>
        ) : posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard key={post.id || index} post={post} onPostUpdate={handlePostCreated} />
          ))
        ) : (
          <div className='no-posts-message'>Chưa có bài đăng nào để hiển thị.</div>
        )}
        <div className='pagination-wrapper'>
          {totalPosts > 0 && !isLoading && (
            <Pagination
              current={pagination.current + 1}
              total={totalPosts}
              pageSize={pagination.size}
              showSizeChanger
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserHomePage
