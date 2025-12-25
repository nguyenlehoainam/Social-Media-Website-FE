import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import './DetailPost.scss'
import avatarDefault from '../../../assets/images/avatarDefault.jpg'
import { IoArrowBackSharp } from 'react-icons/io5'
import Delete from '../../../components/admin/delete/Delete'
import CircularProgress from '@mui/joy/CircularProgress'
import toast from 'react-hot-toast'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [action, setAction] = useState('like')
  const [post, setPost] = useState(null)
  const [selectedCommentId, setSelectedCommentId] = useState()
  const [deletePopup, setDeletePopup] = useState({ open: false, type: '' })

  // Mock dữ liệu chi tiết cho 1 bài post
  useEffect(() => {
    setPost({
      postId: id,
      title: 'HIT Code War 2025: Khởi động',
      description:
        'Cuộc thi code thuật toán lớn nhất năm đã trở lại. Tổng giải thưởng lên tới 10 triệu đồng.',
      createdAt: '2025-12-05T08:00:00Z',
      creator: { fullName: 'Nguyễn Lê Hoài Nam' },
      countReaction: 2,
      countComment: 2,
      images: [
        'https://images.unsplash.com/photo-1504384308090-c54be3855092?auto=format&fit=crop&w=800&q=80',
      ],
      reactionResponseDTOS: [
        { userPostResponseDTO: { fullName: 'Trần Văn A', avatarUrl: null } },
        { userPostResponseDTO: { fullName: 'Lê Thị B', avatarUrl: null } },
      ],
      commentResponseDTOS: [
        {
          commentId: 'c1',
          content: 'Sáng nay mình vừa đăng ký xong!',
          createdAt: '2025-12-06T09:00:00Z',
          userPostResponseDTO: { fullName: 'Phạm Minh Tuấn' },
        },
        {
          commentId: 'c2',
          content: 'Đề năm nay có khó không admin?',
          createdAt: '2025-12-06T10:30:00Z',
          userPostResponseDTO: { fullName: 'Hoàng Thu Thảo' },
        },
      ],
    })
  }, [id])

  // Logic Xóa comment
  const performDeleteComment = (commentId) => {
    const updatedComments = post.commentResponseDTOS.filter((c) => c.commentId !== commentId)
    setPost({
      ...post,
      commentResponseDTOS: updatedComments,
      countComment: updatedComments.length,
    })
    toast.success('Đã xóa bình luận!')
    setDeletePopup({ open: false, type: '' })
  }

  const handleDeleteComment = (commentId) => {
    setSelectedCommentId(commentId)
    setDeletePopup({ open: true, type: 'comment' })
  }

  const formatDate = (iso) => dayjs(iso).format('YYYY-MM-DD')

  if (!post)
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    )

  return (
    <div className='post-h2'>
      <div className='title'>
        <IoArrowBackSharp className='title__icon' onClick={() => navigate('/admin/posts')} />
        <h2 className='post-title'>Chi tiết bài đăng</h2>
      </div>

      <div className='post-detail'>
        <div className='post-detail__main'>
          <h3>{post.title}</h3>
          <p>
            <strong>Người đăng:</strong> {post.creator?.fullName}
          </p>
          <p>
            <strong>Ngày đăng:</strong> {formatDate(post.createdAt)}
          </p>
          <div className='post-detail__content'>
            <p>{post.description}</p>
          </div>
          <div className='image-wrapper'>
            {post.images?.[0] && <img src={post.images[0]} alt='Post' />}
          </div>
        </div>

        <div className='reaction'>
          <div className='reaction-action'>
            <p onClick={() => setAction('like')} className={action === 'like' ? 'change' : ''}>
              Reaction ({post.countReaction})
            </p>
            <p
              onClick={() => setAction('comment')}
              className={action === 'comment' ? 'change' : ''}>
              Comment ({post.countComment})
            </p>
          </div>

          {action === 'like' ? (
            <div className='reaction-likes'>
              {post.reactionResponseDTOS.map((r, i) => (
                <div key={i} className='like'>
                  <img src={avatarDefault} alt='avatar' />
                  <p>{r.userPostResponseDTO?.fullName}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className='reaction-comments'>
              {post.commentResponseDTOS.map((c) => (
                <div key={c.commentId} className='comment'>
                  <div className='comment__info'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p className='comment__name'>{c.userPostResponseDTO?.fullName}</p>
                      <MdDelete
                        size={20}
                        color='#f5945c'
                        cursor='pointer'
                        onClick={() => handleDeleteComment(c.commentId)}
                      />
                    </div>
                    <p className='comment__text'>{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {deletePopup.open && (
        <Delete
          id={selectedCommentId}
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
          onConfirmDelete={() => performDeleteComment(selectedCommentId)}
        />
      )}
    </div>
  )
}

export default PostDetail
