import React, { useState } from 'react'
import './Import.scss'
import { MdCancel } from 'react-icons/md'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { importMembers } from '../../../apis/members.api'
import toast from 'react-hot-toast'

const { Dragger } = Upload
function Import({ importPopup, setImportPopup, id, setData, fetchUsers }) {
  const handleClose = () => {
    setImportPopup({ open: false, type: '' })
  }
  const [showResult, setShowResult] = useState(false)
  const resultImport = () => {
    setShowResult(true)
  }
  const [fileList, setFileList] = useState([])
  const props = {
    multiple: false, // chỉ cho phép chọn một file
    fileList, // truyền danh sách file
    beforeUpload: (file) => {
      const isExcel = file.name.endsWith('.xlsx')
      if (!isExcel) {
        message.error('Chỉ hỗ trợ file .xlsx')
        return false
      }
      setFileList([file]) // ghi đề file cũ nếu cso
      return false // ngăn Antd tự upload
    },
    onRemove: () => {
      setFileList([]) // Khi người dùng xóa file khỏi danh sách
    },
  }

  const handleImport = async () => {
    if (fileList.length === 0) {
      message.warning('Vui lòng chọn file trước khi import.')
      return
    }
    const formData = new FormData()
    formData.append('file', fileList[0]) // gui file dau tin len
    try {
      await importMembers(formData) // hàm API phải support FormData
      fetchUsers()
      setFileList([]) // clear file sau khi upload
      toast.success('Import thành công!')
      setImportPopup({ open: false, type: '' }) // dong popup
    } catch (error) {
      message.error('Import thất bại!')
      toast.error('Import thất bại!')
    }
  }

  return (
    <div className='import-event'>
      <div className='overlay'></div>
      <div className='import-event__container'>
        <div className='close-icon'>
          <MdCancel onClick={handleClose} />
        </div>
        {importPopup.type === 'event' ? (
          <>
            <h2>Import file danh sách sự kiện</h2>
          </>
        ) : (
          <>
            <h2>Import file danh sách user</h2>
          </>
        )}
        <Dragger {...props} accept='.xlsx'>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click hoặc kéo thả file Excel vào đây</p>
        </Dragger>
        {fileList.length > 0 && <p className='selected-file'>Đã chọn: {fileList[0].name}</p>}
        <div className='action'>
          <button className='button btn_import' onClick={handleImport}>
            Import
          </button>
        </div>
        {importPopup.type === 'event' ? (
          <>
            <a href='../../../../public/Template_Event.xlsx' download className='import-file'>
              Click vào đây để lấy template
            </a>
          </>
        ) : (
          <>
            <a href='../../../public/Template_Import_Members.xlsx' download className='import-file'>
              Click vào đây để lấy template
            </a>
          </>
        )}

        {/* {showResult && (
          <div className='notification-import'>
            <p>Thành công: </p>
            <p>Thất bại: </p>
            <p>Tổng: </p>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Import
