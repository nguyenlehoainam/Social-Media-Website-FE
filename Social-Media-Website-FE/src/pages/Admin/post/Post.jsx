import { Pagination, Table } from 'antd'
import React from 'react'
import './Post.scss'
import { useNavigate } from 'react-router-dom'
import { getAllPost } from '../../../apis/postAdmin'
import { useState } from 'react'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import Delete from '../../../components/admin/delete/Delete'
import toast from 'react-hot-toast'

function Post() {
  const navigate = useNavigate()
  const [post, setPost] = useState()
  const [id, setId] = useState()
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [search, setSearch] = useState('')
  const [deletePopup, setDeletePopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event' hoặc post
  })
  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const handlePageChange = (pageCurrent, pageSize) => {
    setPagination((prev) => ({ ...prev, current: pageCurrent - 1, size: pageSize || prev.size }))
  }

  const fetchPost = async () => {
    try {
      const res = await getAllPost({
        page: pagination.current,
        size: pagination.size,
      })
      setPost(res?.data)
    } catch (error) {
      toast.error("Lấy danh sách bài đăng thất bại!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [pagination])

  const columns = [
    {
      title: 'STT',
      render: (_, __, index) => pagination.current * pagination.size + index + 1,
      key: 'index',
      width: 80,
      align: "center"
    },
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Người đăng',
      dataIndex: ['creator', 'fullName'], // ✅ lấy creator
      key: 'fullName',
      width: 200,
      // align: 'center'
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => dayjs(record.createdAt).format('YYYY-MM-DD'),
      width: '150px',
      align: 'center'
    },
    {
      title: 'Lượt thích',
      dataIndex: 'countReaction',
      key: 'countReaction',
      align: 'center',
      width: '100px',
    },
    {
      title: 'Lượt bình luận',
      dataIndex: 'countComment',
      key: 'countComment',
      align: 'center',
      width: '150px',
    },
    {
      title: 'Hành động',
      width: 180,
       align: 'center',
      key: 'action',
      render: (_, record) => (
        <div className='table-action'>
          <button
            className='table-action__edit'
            onClick={() => navigate(`/admin/post/detail/${record.postId}`)}>
            Chi tiết
          </button>
          <button className='table-action__delete' onClick={() => handleDelete(record.postId)}>
            Xóa
          </button>
        </div>
      ),
    },
  ]

  const handleDelete = (id) => {
    setId(id)
    setDeletePopup({
      open: true,
      type: 'post',
    })
  }

  const handleSearch = () => {
    setSearchValue(search)
    setPagination((prev) => ({ ...prev, current: 0 }))
  }
  const filteredData =
    post?.content?.filter((item) => {
      const value = searchValue.toLowerCase()
      return (
        item.title
          ?.toLowerCase()
          .split(' ')
          .some((word) => word === value) ||  item.creator?.fullName?.toLowerCase().includes(value)
        // ||
        // item.email?.toLowerCase().includes(value)
      )
    }) || []

  return (
    <div className='post-page'>
      <h2 className='post-page__title'>Danh sách bài đăng</h2>
      <div className='post-toolbar'>
        <div className='post-toolbar__search'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tiêu đề, người đăng'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='post-toolbar__actions'>
          <button className='button button--search' onClick={() => handleSearch()}>
            Tìm kiếm
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.postId}
        // pagination={{ pageSize: 8 }}
        loading={loading}
        dataSource={filteredData}
        pagination={false}
        scroll={{ y: 36 * 10 }}
        className='no-scrollbar'
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Pagination
          align='end'
          defaultCurrent={pagination.current}
          total={searchValue ? filteredData.length : post?.totalElements}
          pageSize={pagination.size}
          showSizeChanger
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
        />
      </div>
      <div>
        {deletePopup.open && (
          <Delete
            id={id}
            setDeletePopup={setDeletePopup}
            deletePopup={deletePopup}
            fetchPost={fetchPost}
          />
        )}
      </div>
    </div>
  )
}

export default Post
