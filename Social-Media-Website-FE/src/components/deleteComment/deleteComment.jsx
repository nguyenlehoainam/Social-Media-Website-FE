import React from 'react'
import './deleteComment.scss' // Giả sử bạn có file SCSS cho component này
import { MdCancel } from 'react-icons/md'

function DeleteComment({ onConfirm, onClose }) {
  return (
    <div className='delete-member'>
      <div className='overlay' onClick={onClose}></div>

      <div className='delete-member__container'>
        <div className='close-icon'>
          <MdCancel onClick={onClose} />
        </div>
        <h2>Xác nhận</h2>
        <p>Bạn có chắc chắn muốn xóa bình luận này không?</p>
        <div className='action'>
          <button className='button btn_cancel' onClick={onClose}>
            Hủy
          </button>
          <button className='button btn_ok' onClick={onConfirm}>
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteComment
