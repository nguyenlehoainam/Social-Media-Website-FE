import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailpost } from '../../../apis/postAdmin'
import { MdDelete } from 'react-icons/md'
import './DetailPost.scss'
import avatarDefault from '../../../assets/images/avatarDefault.jpg'
import { IoArrowBackSharp } from "react-icons/io5";
import Delete from '../../../components/admin/delete/Delete'
import CircularProgress from '@mui/joy/CircularProgress';
import toast from 'react-hot-toast'
const PostDetail = () => {
  const [action, setAction] = useState('like')
  const [post, setPost] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const [postId, setPostId] = useState()
  const fetchPostDetail = async (id) => {
    try {
      const res = await getDetailpost(id)
      setPost(res?.data)
    } catch (error) {
      toast.error("Lấy dữ liệu bài đăng thất bại")
    }
  }
  useEffect(() => {
    if (id) fetchPostDetail(id)
  }, [id])

  const [deletePopup, setDeletePopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event'
  })
  const handleDelete = (postId) => {
    setPostId(postId)
    setDeletePopup({
      open: true,
      type: 'comment',
    })
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate(),
    ).padStart(2, '0')}`
  }

  if (!post)
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );


  return (
    
    <div className='post-h2'>
      <div className='title'>
        <IoArrowBackSharp className='title__icon' onClick={() => navigate('/admin/posts')}/>
        <h2 className='post-title'>Chi tiết bài đăng của người dùng</h2>
      </div>
      
      <div className='post-detail'>
        <div className='post-detail__main'>
          <h3>{post.title}</h3>
          <p>
            <span style={{ fontWeight: 600 }}> Người đăng: </span>
            {post.creator?.fullName || 'Không xác định'}
          </p>
          <p>
            <span style={{ fontWeight: 600 }}>Ngày đăng: </span>
            {formatDate(post.createdAt)}
          </p>
          <div className='post-detail__content'>
            <p style={{ lineHeight: '24px' }}>
              <span style={{ fontWeight: 600 }}>Mô tả: </span>
              {post.description}
            </p>
          </div>
          <div className='image-wrapper'>
            {post.images?.[0] ? (
              <img src={post.images[0]} alt='Hình ảnh bài đăng' />
            ) : (
              <p style={{ fontStyle: 'italic', color: '#888' }}>
                Không có hình ảnh cho bài đăng này.
              </p>
            )}
          </div>
        </div>

        <div className='reaction'>
          <div className='reaction-action'>
            <p onClick={() => setAction('like')}>
              <span className={action === 'like' ? 'change' : ''}>Reaction </span>
              <span>̣({post.countReaction})</span>
            </p>
            <p onClick={() => setAction('comment')}>
              <span className={action === 'comment' ? 'change' : ''}>Comment </span>
              <span> ({post.countComment}) </span>
            </p>
          </div>

          {action === 'like' ? (
            <div className='reaction-likes'>
              {post.reactionResponseDTOS?.length === 0 ? (
                <p>Chưa có lượt thích nào.</p>
              ) : (
                post.reactionResponseDTOS.map((r, i) => (
                  <div key={i} className='like'>
                    <img src={r.userPostResponseDTO?.avatarUrl || avatarDefault} alt='avatar' />
                    <div className='like__info'>
                      <p className='like__name'>
                        {r.userPostResponseDTO?.fullName || 'Người dùng ẩn danh'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className='reaction-comments'>
              {post.commentResponseDTOS?.length === 0 ? (
                <p>Chưa có bình luận nào.</p>
              ) : (
                post.commentResponseDTOS.map((c) => (
                  <div key={c.commentId} className='comment'>
                    {/* <img
                      src={c.userPostResponseDTO?.avatarUrl || 'https://i.pravatar.cc/40'}
                      alt='avatar'
                    /> */}
                    <div className='comment__info'>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'start',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        <p className='comment__name'>
                          <img
                            src={c.userPostResponseDTO?.avatarUrl || avatarDefault}
                            alt='avatar'
                          />
                          <div>
                            {c.userPostResponseDTO?.fullName || 'Người dùng ẩn danh'}
                            <p className='comment__time'>{formatDate(c.createdAt)}</p>
                          </div>
                        </p>
                        <MdDelete
                          size={25}
                          color='#f5945c'
                          className='comment__delete'
                          onClick={() => handleDelete(c.commentId)}
                        />
                      </div>
                      <p className='comment__text'>{c.content}</p>
                      {/* <p className='comment__time'>{formatDate(c.createdAt)}</p> */}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {deletePopup.open && (
        <Delete
          id={postId}
          // data={data}
          // setData={setData}
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
          fetchPostDetail={() => fetchPostDetail(id)}
        />
      )}
    </div>
  )
}

export default PostDetail
