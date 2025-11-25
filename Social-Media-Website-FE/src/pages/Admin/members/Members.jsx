import React, { useEffect, useState } from 'react'
import './Members.scss'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { Pagination, Table } from 'antd'
import Delete from '../../../components/admin/delete/Delete'
import Import from '../../../components/admin/import/Import'
import { getAllMembers, restoreMembers } from '../../../apis/members.api'
import toast from 'react-hot-toast'

function Members() {
  const navigate = useNavigate()
  const [id, setId] = useState()
  const [username, setUsername] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [search, setSearch] = useState("")

  const [deletePopup, setDeletePopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event'
  })
  const [importPopup, setImportPopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event'
  })
  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const handlePageChange = (pageCurrent, pageSize) => {
    setPagination((prev) => ({ ...prev, current: pageCurrent - 1, size: pageSize || prev.size }))
  }
  const handleDelete = (username) => {
    setUsername(username)
    setDeletePopup({
      open: true,
      type: 'user',
    })
  }
  const handleImport = () => {
    setImportPopup({
      open: true,
      type: 'user',
    })
  }
  const handleAdd = () => {
    navigate('/admin/members/create')
  }
  const handleEdit = (id) => {
    navigate(`/admin/members/edit/${id}`)
  }

  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  // Get api lay du lieu thong tin user
  const fetchUsers = async () => {
    try {
      const response = await getAllMembers({
        page: pagination.current,
        size: pagination.size,
      })
      console.log('Get AllMember', response)
      setData(response?.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [pagination])

  const handleRestore = async(email) => {
    try{
      await restoreMembers(email)
      fetchUsers()
      toast.success("Khôi phục tài khoản thành công!")
    }catch(error){
      toast.error("Khôi phục tài khoản thất bại!")
    }
  } 

  const columns = [
    {
      title: 'STT',
      render: (_, __, index) => pagination.current * pagination.size + index + 1,
      key: 'userId',
      width: 70,
      align: 'center',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Đã xóa', value: 'deleted' },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        if (value === 'active') return record.deletedAt === null
        if (value === 'deleted') return record.deletedAt !== null
        return true
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      align: 'center',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      // width: 100,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
      //  width: 150,
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      render: (_, record) => {
        if (record.deletedAt !== null) {
          return (
            <>
              <button
                className='button button--restore'
                onClick={() => handleRestore(record.email)}>
                Khôi phục
              </button>
            </>
          )
        }
        return (
          <div>
            <button className='button button--edit' onClick={() => handleEdit(record.userId)}>
              Sửa
            </button>
            <button className='button button--delete' onClick={() => handleDelete(record.username)}>
              Xóa
            </button>
          </div>
        )
      },
    },
  ]
  // if (loading) return <p>Đang tải dữ liệu...</p>

  const handleSearch = () => {
    setSearchValue(search)
    setPagination((prev) => ({ ...prev, current: 0 }))
  }
  // Lọc trước khi render
  const filteredData =
    data?.items?.filter((item) => {
      const value = searchValue.toLowerCase()
      return (
        item.fullName?.toLowerCase().split(" ").some(word => word === value )||
        item.username?.toLowerCase().includes(value) ||
        item.email?.toLowerCase().includes(value)
      )
    }) || []

  return (
    <>
      <div className='members-page'>
        <h2>Danh sách thành viên</h2>
        <div className='members-toolbar'>
          <div className='members-toolbar__search'>
            <input
              type='text'
              placeholder='Tìm kiếm theo fullname, username, email'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='members-toolbar__actions'>
            <button className='button button--search' onClick={() => handleSearch()}>Tìm kiếm</button>
            <div style={{marginLeft: '400px'}}>
              <button className='button button--add' onClick={handleAdd}>
                Thêm
              </button>
              <button className='button button--import' onClick={handleImport} style={{marginLeft: "10px"}}>
                Import
              </button>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          // dataSource={data?.items}
          dataSource={filteredData}
          rowKey='userId'
          pagination={false}
          rowClassName={(record) => (record.deletedAt !== null ? 'row--deleted' : '')}
          scroll={{ y: 36 * 10 }}
          className='no-scrollbar'
          loading={loading}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Pagination
            current={pagination.current + 1}
            pageSize={pagination.size}
            total={searchValue ? filteredData.length :data?.totalItems}
            
            showSizeChanger
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          />
        </div>
      </div>
      <div>
        {deletePopup.open && (
          <Delete
            username={username}
            // data={data}
            // setData={setData}
            setDeletePopup={setDeletePopup}
            deletePopup={deletePopup}
            fetchUsers={fetchUsers}
          />
        )}
        {importPopup.open && (
          <Import
            importPopup={importPopup}
            setImportPopup={setImportPopup}
            fetchUsers={fetchUsers}
            // setData = {setData}
          />
        )}
      </div>
    </>
  )
}

export default Members
