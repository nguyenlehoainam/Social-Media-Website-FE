import { Pagination, Table, Modal, Descriptions, Tag, Divider } from 'antd'
import React, { useState } from 'react'
import './Post.scss'
import dayjs from 'dayjs'
import Delete from '../../../components/admin/delete/Delete'
import toast from 'react-hot-toast'

const INITIAL_POSTS = [
  {
    postId: 'p1',
    title: 'Training ReactJS K19',
    content: 'Lịch training tuần này tại phòng 801. Nội dung về Hooks và State management.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-01T08:00:00Z',
    countReaction: 45,
    countComment: 12,
  },
  {
    postId: 'p2',
    title: 'Tuyển cộng tác viên Lab AI',
    content: 'Lab đang cần 2 bạn hỗ trợ dán nhãn dữ liệu cho dự án nhận diện biển báo giao thông.',
    creator: { fullName: 'Trần Thị B' },
    createdAt: '2025-12-02T10:30:00Z',
    countReaction: 12,
    countComment: 5,
  },
  {
    postId: 'p3',
    title: 'Workshop UI/UX cho Dev',
    content:
      'Chia sẻ từ chuyên gia đến từ FPT Software về cách thiết kế giao diện chuẩn người dùng.',
    creator: { fullName: 'Lê Văn C' },
    createdAt: '2025-12-03T09:00:00Z',
    countReaction: 89,
    countComment: 24,
  },
  {
    postId: 'p4',
    title: 'Giao lưu bóng đá HIT-DCN',
    content: 'Trận đấu kinh điển giữa 2 câu lạc bộ lớn nhất HaUI. Anh em ra sân cổ vũ nhé!',
    creator: { fullName: 'Phạm Văn D' },
    createdAt: '2025-12-04T16:00:00Z',
    countReaction: 120,
    countComment: 50,
  },
  {
    postId: 'p5',
    title: 'Góc pass đồ: Bàn phím cơ',
    content: 'Dư dùng cần pass lại Keychron K2 Red Switch giá sinh viên cho anh em CLB.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-05T14:30:00Z',
    countReaction: 8,
    countComment: 15,
  },
  {
    postId: 'p6',
    title: 'Thực tập sinh Java Spring Boot',
    content: 'Công ty đối tác đang tuyển thực tập sinh BE. Yêu cầu nắm chắc OOP và SQL.',
    creator: { fullName: 'HR Partner' },
    createdAt: '2025-12-06T11:20:00Z',
    countReaction: 34,
    countComment: 7,
  },
  {
    postId: 'p7',
    title: 'English Speaking Club',
    content: "Topic tuần này: 'AI will replace software engineers?'. Tham gia tại tầng 9 nhé.",
    creator: { fullName: 'Lê Thị C' },
    createdAt: '2025-12-07T19:00:00Z',
    countReaction: 22,
    countComment: 9,
  },
  {
    postId: 'p8',
    title: 'HIT Code War 2025',
    content:
      'Sân chơi thuật toán lớn nhất cho sinh viên HaUI với giải thưởng lên tới 10 triệu đồng.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-08T08:00:00Z',
    countReaction: 210,
    countComment: 85,
  },
  {
    postId: 'p9',
    title: 'Tuyển Designer cho Gala',
    content: 'Tìm bạn biết sử dụng Photoshop/Illustrator thiết kế banner cho tiệc cuối năm.',
    creator: { fullName: 'Phạm Văn D' },
    createdAt: '2025-12-09T10:00:00Z',
    countReaction: 15,
    countComment: 4,
  },
  {
    postId: 'p10',
    title: 'Year End Party HIT 2025',
    content: 'Thông báo lịch tiệc tất niên của câu lạc bộ. Dresscode: Đỏ và Trắng.',
    creator: { fullName: 'BTC HIT15' },
    createdAt: '2025-12-10T20:00:00Z',
    countReaction: 340,
    countComment: 120,
  },
  {
    postId: 'p11',
    title: 'Lớp học C++ cơ bản K19',
    content: 'Buổi đầu tiên hướng dẫn cài đặt môi trường và câu lệnh Input/Output.',
    creator: { fullName: 'Trần Thị B' },
    createdAt: '2025-12-11T09:45:00Z',
    countReaction: 56,
    countComment: 20,
  },
  {
    postId: 'p12',
    title: 'Review đồ án tốt nghiệp',
    content: 'Hỗ trợ các bạn K16 chuẩn bị bảo vệ đồ án. Review code và fix lỗi logic.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-12T14:00:00Z',
    countReaction: 67,
    countComment: 18,
  },
  {
    postId: 'p13',
    title: 'Share khóa học Docker & K8s',
    content: 'Mình vừa mua khóa học xịn trên Udemy cần tìm người học chung để share phí.',
    creator: { fullName: 'Lê Văn C' },
    createdAt: '2025-12-13T21:00:00Z',
    countReaction: 45,
    countComment: 30,
  },
  {
    postId: 'p14',
    title: 'Tìm đồng đội làm Hackathon',
    content: 'Cần 1 bạn mạnh Frontend (React/NextJS) cùng tham gia thi đấu tại Hà Nội.',
    creator: { fullName: 'Hoàng Thu Thảo' },
    createdAt: '2025-12-14T08:30:00Z',
    countReaction: 28,
    countComment: 12,
  },
  {
    postId: 'p15',
    title: 'Góp ý về Dashboard VINBOOK',
    content: 'Mọi người cho mình xin feedback về giao diện Admin mới làm bằng Ant Design nhé.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-15T15:00:00Z',
    countReaction: 99,
    countComment: 45,
  },
  {
    postId: 'p16',
    title: 'Workshop: Cloud Computing',
    content: 'Hướng dẫn triển khai ứng dụng lên AWS và Google Cloud Platform cơ bản.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-16T10:00:00Z',
    countReaction: 38,
    countComment: 14,
  },
  {
    postId: 'p17',
    title: 'Tip Backend: Optimize SQL',
    content: 'Chia sẻ cách đánh Index để tăng tốc truy vấn dữ liệu cho các hệ thống lớn.',
    creator: { fullName: 'Phạm Minh Tuấn' },
    createdAt: '2025-12-17T09:00:00Z',
    countReaction: 52,
    countComment: 21,
  },
  {
    postId: 'p18',
    title: 'Tài liệu học Nginx cho Admin',
    content: 'Tổng hợp các cấu hình Reverse Proxy và Load Balancing thông dụng.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-18T20:30:00Z',
    countReaction: 41,
    countComment: 11,
  },
  {
    postId: 'p19',
    title: 'Review xe VinFast VF9 3D',
    content: 'Demo mô hình 3D xe VF9 tích hợp vào Dashboard bằng React Three Fiber.',
    creator: { fullName: 'Nguyễn Lê Hoài Nam' },
    createdAt: '2025-12-19T14:00:00Z',
    countReaction: 156,
    countComment: 38,
  },
  {
    postId: 'p20',
    title: 'Chúc mừng năm mới 2026',
    content: 'Chúc toàn thể thành viên HIT một năm mới bùng nổ code và không còn bug!',
    creator: { fullName: 'Ban Quản Trị' },
    createdAt: '2026-01-01T00:00:00Z',
    countReaction: 500,
    countComment: 200,
  },
]
function Post() {
  const [masterPosts, setMasterPosts] = useState(INITIAL_POSTS)
  const [selectedId, setSelectedId] = useState()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [deletePopup, setDeletePopup] = useState({ open: false, type: '' })
  const [pagination, setPagination] = useState({ current: 0, size: 10 })

  // --- State cho Modal Chi tiết ---
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [viewingPost, setViewingPost] = useState(null)

  const handlePageChange = (pageCurrent, pageSize) => {
    setPagination((prev) => ({ ...prev, current: pageCurrent - 1, size: pageSize || prev.size }))
  }

  const handleSearch = () => {
    setSearchValue(search.toLowerCase())
    setPagination((prev) => ({ ...prev, current: 0 }))
  }

  const performDeletePost = (id) => {
    const newData = masterPosts.filter((p) => p.postId !== id)
    setMasterPosts(newData)
    toast.success('Đã xóa bài đăng thành công!')
    setDeletePopup({ open: false, type: '' })
  }

  const handleDelete = (id) => {
    setSelectedId(id)
    setDeletePopup({ open: true, type: 'post' })
  }

  // --- Hàm mở Modal Chi tiết ---
  const handleOpenDetail = (record) => {
    setViewingPost(record)
    setIsDetailOpen(true)
  }

  const filteredData = masterPosts.filter((item) => {
    if (!searchValue) return true
    return (
      item.title?.toLowerCase().includes(searchValue) ||
      item.creator?.fullName?.toLowerCase().includes(searchValue)
    )
  })

  const columns = [
    {
      title: 'STT',
      render: (_, __, index) => pagination.current * pagination.size + index + 1,
      width: 80,
      align: 'center',
    },
    { title: 'Tiêu đề bài viết', dataIndex: 'title', key: 'title' },
    { title: 'Người đăng', dataIndex: ['creator', 'fullName'], key: 'fullName', width: 200 },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      render: (val) => dayjs(val).format('YYYY-MM-DD'),
      width: '150px',
      align: 'center',
    },
    {
      title: 'Hành động',
      width: 180,
      align: 'center',
      render: (_, record) => (
        <div className='table-action'>
          <button
            className='table-action__edit'
            onClick={() => handleOpenDetail(record)} // Thay đổi ở đây
          >
            Chi tiết
          </button>
          <button className='table-action__delete' onClick={() => handleDelete(record.postId)}>
            Xóa
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className='post-page'>
      <h2 className='post-page__title'>Danh sách bài đăng</h2>

      {/* Toolbar Search */}
      <div className='post-toolbar'>
        <div className='post-toolbar__search'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tiêu đề, người đăng'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button className='button button--search' onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>

      <Table
        columns={columns}
        rowKey='postId'
        dataSource={filteredData.slice(
          pagination.current * pagination.size,
          (pagination.current + 1) * pagination.size,
        )}
        pagination={false}
        loading={loading}
        scroll={{ y: 400 }}
      />

      <Pagination
        style={{ marginTop: '10px', textAlign: 'right' }}
        current={pagination.current + 1}
        total={filteredData.length}
        pageSize={pagination.size}
        onChange={handlePageChange}
      />

      {/* --- MODAL CHI TIẾT BÀI ĐĂNG --- */}
      <Modal
        title='Thông tin chi tiết bài viết'
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={[
          <button key='close' className='button' onClick={() => setIsDetailOpen(false)}>
            Đóng
          </button>,
        ]}
        width={700}>
        {viewingPost && (
          <div style={{ marginTop: '20px' }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label='Tiêu đề'>
                <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{viewingPost.title}</span>
              </Descriptions.Item>
              <Descriptions.Item label='Người đăng'>
                {viewingPost.creator?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label='Ngày tạo'>
                {dayjs(viewingPost.createdAt).format('DD/MM/YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label='Tương tác'>
                <Tag color='blue'>👍 {viewingPost.countReaction} Lượt thích</Tag>
                <Tag color='green'>💬 {viewingPost.countComment} Bình luận</Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Nội dung'>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                  {viewingPost.content}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Popup Xóa */}
      {deletePopup.open && (
        <Delete
          id={selectedId}
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
          onConfirmDelete={() => performDeletePost(selectedId)}
        />
      )}
    </div>
  )
}

export default Post
