// import React, { useMemo } from 'react'
// import { ChevronRight } from 'react-bootstrap-icons'
// import './sidebarWidget.scss'
// import CircularProgress from '@mui/joy/CircularProgress'

// const SidebarWidget = ({ title, items, type, onViewItemDetail }) => {
//   const filteredItems = useMemo(() => items.slice(0, 3), [items])
//   const handleItemClick = (item) => {
//     if (onViewItemDetail) {
//       onViewItemDetail(item)
//     }
//   }

//   return (
//     <div className='sidebar-widget'>
//       <div className='widget-header'>
//         <h3 className='widget-title'>{title}</h3>
//         <a href={`${type.toLowerCase()}`} className='widget-view-more'>
//           View More <ChevronRight size={12} />
//         </a>
//       </div>

//       <ul className='widget-list'>
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item) => {
//             const date = new Date(item.createdAt)

//             return (
//               <li onClick={() => handleItemClick(item)} key={item.id} className='widget-item'>
//                 <div className='item-date'>
//                   <span className='date-day'>{date.getDate()}</span>
//                   <span className='date-month'>
//                     {date.toLocaleString('en-US', { month: 'short' })}
//                   </span>
//                 </div>
//                 <div className='item-info'>
//                   <span className='item-title'>{item.title}</span>
//                   <span className='item-details'>{item.creator.fullName}</span>
//                 </div>
//               </li>
//             )
//           })
//         ) : (
//           <li className='loding-container'>
//             <div className='loading-spinner'>
//               <CircularProgress color='primary' />
//             </div>
//           </li>
//         )}
//       </ul>
//     </div>
//   )
// }

// export default SidebarWidget

import React, { useMemo } from 'react'
import { ChevronRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom' // Dùng Link thay cho a href
import './sidebarWidget.scss'
import CircularProgress from '@mui/joy/CircularProgress'

const SidebarWidget = ({ title, items, type, onViewItemDetail }) => {
  // Check an toàn: đảm bảo items luôn là mảng
  const safeItems = Array.isArray(items) ? items : []
  const filteredItems = useMemo(() => safeItems.slice(0, 7), [safeItems])

  const handleItemClick = (item) => {
    if (onViewItemDetail) {
      onViewItemDetail(item)
    }
  }

  // Chuyển type thành đường dẫn (VD: 'Event' -> '/event')
  const linkPath = `/${type?.toLowerCase() || '#'}`

  return (
    <div className='sidebar-widget'>
      <div className='widget-header'>
        <h3 className='widget-title'>{title}</h3>
        {/* Sửa a -> Link để không reload trang */}
        <Link to={linkPath} className='widget-view-more'>
          View More <ChevronRight size={12} />
        </Link>
      </div>

      <ul className='widget-list'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            // --- XỬ LÝ DỮ LIỆU CHO MOCK DATA ---

            // 1. Xử lý ngày tháng (Fallback nếu thiếu)
            const date = item.createdAt ? new Date(item.createdAt) : new Date()

            // 2. Xử lý tác giả (Mock dùng 'author', API cũ dùng 'creator')
            const author = item.author || item.creator || {}
            const authorName = author.fullName || 'Admin'

            // 3. Xử lý ID (Mock dùng 'id', API cũ có thể dùng 'eventId'/'postId')
            const itemId = item.id || item.postId || item.eventId || Math.random()

            return (
              <li onClick={() => handleItemClick(item)} key={itemId} className='widget-item'>
                <div className='item-date'>
                  <span className='date-day'>{date.getDate()}</span>
                  <span className='date-month'>
                    {date.toLocaleString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className='item-info'>
                  <span className='item-title'>{item.title || 'Không có tiêu đề'}</span>
                  <span className='item-details'>{authorName}</span>
                </div>
              </li>
            )
          })
        ) : (
          <li className='loding-container'>
            {/* Nếu items null/undefined thì loading, nếu mảng rỗng thì hiện text */}
            {!items ? (
              <div className='loading-spinner'>
                <CircularProgress color='primary' />
              </div>
            ) : (
              <div
                style={{ fontSize: '13px', color: '#666', padding: '10px', textAlign: 'center' }}>
                Chưa có dữ liệu
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}

export default SidebarWidget
