import React, { useEffect, useState } from 'react'
import './Members.scss'
import { useNavigate } from 'react-router-dom'
import { Pagination, Table } from 'antd'
import Delete from '../../../components/admin/delete/Delete'
import Import from '../../../components/admin/import/Import'
import toast from 'react-hot-toast'

// 1. Mock Data mở rộng - 20 Thành viên
const INITIAL_MOCK_DATA = [
  {
    userId: 'u1',
    username: 'namnlh',
    fullName: 'Nguyễn Lê Hoài Nam',
    email: 'namnlh@gmail.com',
    gender: 'Nam',
    dob: '2005-09-16',
    deletedAt: null,
  },
  {
    userId: 'u2',
    username: 'tranthib',
    fullName: 'Trần Thị B',
    email: 'b@gmail.com',
    gender: 'Nữ',
    dob: '2005-05-12',
    deletedAt: null,
  },
  {
    userId: 'u3',
    username: 'lehoanglong',
    fullName: 'Lê Hoàng Long',
    email: 'long@gmail.com',
    gender: 'Nam',
    dob: '1999-11-20',
    deletedAt: null,
  },
  {
    userId: 'u4',
    username: 'nguyenthuylinh',
    fullName: 'Nguyễn Thùy Linh',
    email: 'linh@gmail.com',
    gender: 'Nữ',
    dob: '2003-02-15',
    deletedAt: null,
  },
  {
    userId: 'u5',
    username: 'phamminhtuan',
    fullName: 'Phạm Minh Tuấn',
    email: 'tuanpm@gmail.com',
    gender: 'Nam',
    dob: '2006-03-22',
    deletedAt: null,
  },
  {
    userId: 'u6',
    username: 'vuhaiyen',
    fullName: 'Vũ Hải Yến',
    email: 'yenvh@gmail.com',
    gender: 'Nữ',
    dob: '2004-10-10',
    deletedAt: null,
  },
  {
    userId: 'u7',
    username: 'tranquoctbao',
    fullName: 'Trần Quốc Bảo',
    email: 'baotq@gmail.com',
    gender: 'Nam',
    dob: '2005-04-25',
    deletedAt: null,
  },
  {
    userId: 'u8',
    username: 'phanthanhtung',
    fullName: 'Phan Thanh Tùng',
    email: 'tungpt@gmail.com',
    gender: 'Nam',
    dob: '2006-01-18',
    deletedAt: null,
  },
  {
    userId: 'u9',
    username: 'dohungdung',
    fullName: 'Đỗ Hùng Dũng',
    email: 'dungdh@gmail.com',
    gender: 'Nam',
    dob: '2005-08-30',
    deletedAt: null,
  },
  {
    userId: 'u10',
    username: 'nguyenthimai',
    fullName: 'Nguyễn Thị Mai',
    email: 'maitn@gmail.com',
    gender: 'Nữ',
    dob: '2006-12-05',
    deletedAt: null,
  },
  {
    userId: 'u11',
    username: 'buianhduc',
    fullName: 'Bùi Anh Đức',
    email: 'ducan@gmail.com',
    gender: 'Nam',
    dob: '2005-02-14',
    deletedAt: null,
  },
  {
    userId: 'u12',
    username: 'hoangthuthao',
    fullName: 'Hoàng Thu Thảo',
    email: 'thaovtt@gmail.com',
    gender: 'Nữ',
    dob: '2004-07-15',
    deletedAt: null,
  },
  {
    userId: 'u13',
    username: 'leanhtuan',
    fullName: 'Lê Anh Tuấn',
    email: 'anhtuan@gmail.com',
    gender: 'Nam',
    dob: '2006-05-30',
    deletedAt: null,
  },
  {
    userId: 'u14',
    username: 'nguyenhuyhoang',
    fullName: 'Nguyễn Huy Hoàng',
    email: 'hoangnh@gmail.com',
    gender: 'Nam',
    dob: '2004-09-05',
    deletedAt: null,
  },
  {
    userId: 'u15',
    username: 'vuminhquan',
    fullName: 'Vũ Minh Quân',
    email: 'minhquan@gmail.com',
    gender: 'Nam',
    dob: '2005-07-07',
    deletedAt: null,
  },
  {
    userId: 'u16',
    username: 'dothuyquynh',
    fullName: 'Đỗ Thúy Quỳnh',
    email: 'quynhdt@gmail.com',
    gender: 'Nữ',
    dob: '2004-02-28',
    deletedAt: null,
  },
  {
    userId: 'u17',
    username: 'lethuphuong',
    fullName: 'Lê Thu Phương',
    email: 'phuonglt@gmail.com',
    gender: 'Nữ',
    dob: '2005-03-12',
    deletedAt: null,
  },
  {
    userId: 'u18',
    username: 'nguyendangkhanh',
    fullName: 'Nguyễn Đăng Khánh',
    email: 'khanhnd@gmail.com',
    gender: 'Nam',
    dob: '2004-12-25',
    deletedAt: null,
  },
  {
    userId: 'u19',
    username: 'tranminhanh',
    fullName: 'Trần Minh Anh',
    email: 'anhtm@gmail.com',
    gender: 'Nữ',
    dob: '2006-08-14',
    deletedAt: null,
  },
  {
    userId: 'u20',
    username: 'nguyenquanghai',
    fullName: 'Nguyễn Quang Hải',
    email: 'hainq@gmail.com',
    gender: 'Nam',
    dob: '2005-10-10',
    deletedAt: null,
  },
]

function Members() {
  const navigate = useNavigate()
  const [selectedUsername, setSelectedUsername] = useState()
  const [searchKey, setSearchKey] = useState('') // Lưu giá trị input đang gõ
  const [appliedSearch, setAppliedSearch] = useState('') // Giá trị chỉ áp dụng khi nhấn "Tìm kiếm"

  const [deletePopup, setDeletePopup] = useState({ open: false, type: '' })
  const [importPopup, setImportPopup] = useState({ open: false, type: '' })

  const [pagination, setPagination] = useState({ current: 0, size: 8 }) // Giảm size xuống 8 để thấy rõ chuyển trang

  // 2. State quản lý toàn bộ dữ liệu
  const [masterData, setMasterData] = useState(INITIAL_MOCK_DATA)
  const [loading, setLoading] = useState(false)

  // Hàm "giả" fetch API
  const fetchUsers = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  useEffect(() => {
    fetchUsers()
  }, [pagination])

  // 3. Logic Xóa: Lọc bỏ object khỏi masterData
  const performDelete = (usernameToDelete) => {
    const newData = masterData.filter((user) => user.username !== usernameToDelete)
    setMasterData(newData)
    toast.success(`Đã xóa thành viên ${usernameToDelete}`)
    setDeletePopup({ open: false, type: '' })
  }

  const handleDeleteClick = (username) => {
    setSelectedUsername(username)
    setDeletePopup({ open: true, type: 'user' })
  }

  const handlePageChange = (pageCurrent, pageSize) => {
    setPagination((prev) => ({ ...prev, current: pageCurrent - 1, size: pageSize || prev.size }))
  }

  const handleEdit = (id) => {
    navigate(`/admin/members/edit/${id}`)
  }

  // 4. Logic Tìm kiếm
  const handleSearch = () => {
    setAppliedSearch(searchKey.toLowerCase())
    setPagination((prev) => ({ ...prev, current: 0 }))
  }

  const filteredData = masterData.filter((item) => {
    if (!appliedSearch) return true
    return (
      item.fullName?.toLowerCase().includes(appliedSearch) ||
      item.username?.toLowerCase().includes(appliedSearch) ||
      item.email?.toLowerCase().includes(appliedSearch)
    )
  })

  // Dữ liệu hiển thị trên bảng sau khi phân trang
  const displayData = filteredData.slice(
    pagination.current * pagination.size,
    (pagination.current + 1) * pagination.size,
  )

  const columns = [
    {
      title: 'STT',
      render: (_, __, index) => pagination.current * pagination.size + index + 1,
      width: 70,
      align: 'center',
    },
    { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Giới tính', dataIndex: 'gender', align: 'center', width: 100 },
    { title: 'Ngày sinh', dataIndex: 'dob', align: 'center', width: 120 },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Tài khoản', dataIndex: 'username' },
    {
      title: 'Hành động',
      align: 'center',
      render: (_, record) => (
        <div className='table-action'>
          <button className='button button--edit' onClick={() => handleEdit(record.userId)}>
            Sửa
          </button>
          <button
            className='button button--delete'
            onClick={() => handleDeleteClick(record.username)}>
            Xóa
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className='members-page'>
        <h2>Danh sách thành viên ({filteredData.length})</h2>
        <div className='members-toolbar'>
          <div className='members-toolbar__search'>
            <input
              type='text'
              placeholder='Tìm kiếm theo fullname, username, email'
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className='members-toolbar__actions'>
            <button className='button button--search' onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={displayData}
          rowKey='userId'
          pagination={false}
          loading={loading}
          scroll={{ y: 400 }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Pagination
            current={pagination.current + 1}
            pageSize={pagination.size}
            total={filteredData.length}
            showSizeChanger
            onChange={handlePageChange}
          />
        </div>
      </div>

      {deletePopup.open && (
        <Delete
          username={selectedUsername}
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
          onConfirmDelete={() => performDelete(selectedUsername)}
          fetchUsers={fetchUsers}
        />
      )}
    </>
  )
}

export default Members
