import React, { useMemo } from 'react'
import { ChevronRight } from 'react-bootstrap-icons'
import './sidebarWidget.scss'
import CircularProgress from '@mui/joy/CircularProgress'

const SidebarWidget = ({ title, items, type, onViewItemDetail }) => {
  const filteredItems = useMemo(() => items.slice(0, 3), [items])
  const handleItemClick = (item) => {
    if (onViewItemDetail) {
      onViewItemDetail(item)
    }
  }

  return (
    <div className='sidebar-widget'>
      <div className='widget-header'>
        <h3 className='widget-title'>{title}</h3>
        <a href={`${type.toLowerCase()}`} className='widget-view-more'>
          View More <ChevronRight size={12} />
        </a>
      </div>

      <ul className='widget-list'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const date = new Date(item.createdAt)

            return (
              <li onClick={() => handleItemClick(item)} key={item.id} className='widget-item'>
                <div className='item-date'>
                  <span className='date-day'>{date.getDate()}</span>
                  <span className='date-month'>
                    {date.toLocaleString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className='item-info'>
                  <span className='item-title'>{item.title}</span>
                  <span className='item-details'>{item.creator.fullName}</span>
                </div>
              </li>
            )
          })
        ) : (
          <li className='loding-container'>
            <div className='loading-spinner'>
              <CircularProgress color='primary' />
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SidebarWidget
