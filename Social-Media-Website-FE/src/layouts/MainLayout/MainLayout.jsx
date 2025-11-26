import React, { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../../common/header/header'
import Footer from '../../common/footer/footer'
import SidebarWidget from '../../components/sidebarWidget/sidebarWidget'
import { getEventApi, getJobApi } from '../../apis/posts.api'
import './MainLayout.scss'
import toast from 'react-hot-toast'
import JobDetails from '../../components/jobDetails/jobDetails'
import EventDetails from '../../components/eventDetails/evenDetails'
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton'

const MainLayout = () => {
  const [recruitmentPosts, setRecruitmentPosts] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const location = useLocation()
  const isProfilePage = location.pathname === '/profile'
  const [selectedPost, setSelectedPost] = useState(null)

  const fetchSidebarData = useCallback(async () => {
    try {
      const jobResponse = await getJobApi({ page: 0, size: 3 })
      const jobsWithTargetType = (jobResponse.data.content || []).map((job) => ({
        ...job,
        targetType: 'JOB',
      }))
      setRecruitmentPosts(jobsWithTargetType)

      const eventResponse = await getEventApi({ page: 0, size: 3 })
      const eventsWithTargetType = (eventResponse.data.content || []).map((event) => ({
        ...event,
        targetType: 'EVENT',
      }))
      setUpcomingEvents(eventsWithTargetType)
    } catch (error) {
      toast.error('Không thể tải dữ liệu cho sidebar.')
    }
  }, [])

  useEffect(() => {
    if (!isProfilePage) {
      fetchSidebarData()
    }
  }, [isProfilePage, fetchSidebarData])

  const handleViewDetail = (postToView) => {
    setSelectedPost(postToView)
  }

  const handleCloseDetail = () => {
    setSelectedPost(null)
  }

  return (
    <div className='main-app-layout'>
      <Header />

      {selectedPost && selectedPost.targetType === 'JOB' && (
        <JobDetails key={selectedPost.postId} post={selectedPost} onClose={handleCloseDetail} />
      )}

      {selectedPost && selectedPost.targetType === 'EVENT' && (
        <EventDetails key={selectedPost.eventId} post={selectedPost} onClose={handleCloseDetail} />
      )}

      <div className={`main-layout-container ${isProfilePage ? 'no-sidebar' : ''}`}>
        <main className='layout-content'>
          <Outlet />
        </main>
        {!isProfilePage && (
          <aside className='layout-sidebar'>
            <SidebarWidget
              title='Recruitment Posts'
              items={recruitmentPosts}
              type='JOB'
              onViewItemDetail={handleViewDetail}
            />
            <SidebarWidget
              title='Upcoming Events'
              items={upcomingEvents}
              type='EVENT'
              onViewItemDetail={handleViewDetail}
            />
          </aside>
        )}
        <ScrollToTopButton />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
