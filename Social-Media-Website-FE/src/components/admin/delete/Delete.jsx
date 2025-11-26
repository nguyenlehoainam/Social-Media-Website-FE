import './Delete.scss'
import { MdCancel } from 'react-icons/md'
import { deleteEvents } from '../../../apis/events.api'
import toast from 'react-hot-toast'
import { deleteMembers } from '../../../apis/members.api'
import { deletePost } from '../../../apis/postAdmin'
import { deleteComment } from '../../../apis/commentAdmin'
function DeleteMember({
  id,
  deletePopup,
  setDeletePopup,
  fetchEvent,
  username,
  fetchUsers,
  fetchPost,
  fetchPostDetail,
}) {
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
        fetchEvent()
        toast.success('Xoá sự kiện thành công!')
      } else if (deletePopup.type === 'user') {
        await deleteMembers(username)
        toast.success('Xoá thành viên thành công!')
        fetchUsers()
      } else if (deletePopup.type === 'comment') {
        await deleteComment(id)
        toast.success('Xóa comment thành công!')
        fetchPostDetail()
      } else {
        await deletePost(id)
        toast.success('Xoá bài đăng thành công!')
        fetchPost()
      }
      handleClose()
    } catch (error) {
      toast.error(
        `Xóa ${
          deletePopup.type === 'event'
            ? 'sự kiện'
            : deletePopup.type === 'user'
            ? 'thành viên'
            : deletePopup.type === 'comment'
            ? 'comment'
            : 'bài đăng'
        } thất bại!`,
      )
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
            : deletePopup.type === 'comment'
            ? 'Bạn có chắc chắn xóa comment này không?'
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
