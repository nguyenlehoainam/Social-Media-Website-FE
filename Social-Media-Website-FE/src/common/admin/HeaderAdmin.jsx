import React, { useEffect, useState } from 'react'
import './HeaderAdmin.scss'
import LogoReact from '../../assets/react.svg'
import { getAdmin } from '../../apis/admin.api'
function HeaderAdmin() {
  const [admin, setAdmin] = useState()
  const fetchGet = async () => {
    try {
      const res = await getAdmin()
      setAdmin(res?.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchGet()
  }, []) // ← Quan trọng: thêm [] để chỉ chạy 1 lần sau khi mount

  return (
    <div className='admin__header'>
      <p className='admin__header--name'>Hello, {admin?.fullName || 'Admin'} </p>
      <div className='admin__header--avatar'>
        <img
          src={admin?.avatarUrl || LogoReact}
          alt='avatar'
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%', // bo tròn avatar
            objectFit: 'cover', // ảnh vừa khít khung, không méo
            border: '2px solid #ddd', // viền nhẹ
            boxShadow: '0 0 8px rgba(0,0,0,0.1)', // đổ bóng nhẹ
          }}
        />

        <p>{admin?.username}</p>
      </div>
    </div>
  )
}

export default HeaderAdmin
