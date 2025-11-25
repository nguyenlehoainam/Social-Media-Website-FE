import './Delete.scss'
import { MdCancel } from 'react-icons/md'
import { deleteEvents } from '../../../apis/events.api'
import toast from 'react-hot-toast'
import { deleteMembers } from '../../../apis/members.api'
function DeleteMember({ id, deletePopup, setDeletePopup, fetchEvent, username, fetchUsers }) {
  const handleClose = () => {
    setDeletePopup({
      open: false,
      type: '',
    })
  }
  const handleDelete = async () => {
    try {
      if (deletePopup.type === 'event') {
        await deleteEvents(id)
        toast.success('Xoá sự kiện thành công!')
        fetchEvent()
      } else if (deletePopup.type === 'user') {
        await deleteMembers(username)
        toast.success('Xoá thành viên thành công!')
        fetchUsers()
      }
      handleClose()
    } catch (error) {
      console.error(error)
      toast.error(`Xóa ${deletePopup.type === 'event' ? 'sự kiện' : 'thành viên'} thất bại!`)
    }
  }
  return (
    <div className='delete-member'>
      <div className='overlay'></div>
      <div className='delete-member__container'>
        <div className='close-icon'>
          <MdCancel onClick={handleClose} />
        </div>
        <h2>Xác nhận</h2>
        <p>
          {deletePopup.type === 'user'
            ? 'Bạn có chắc chắn xóa tài khoản này không?'
            : deletePopup.type === 'event'
            ? 'Bạn có chắc chắn xóa sự kiện này không?'
            : 'Bạn có chắc chắn xóa bài đăng này không?'}
        </p>
        <div className='action'>
          <button className='button btn_cancel' onClick={handleClose}>
            Hủy
          </button>
          <button className='button btn_ok' onClick={handleDelete}>
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeleteMember
