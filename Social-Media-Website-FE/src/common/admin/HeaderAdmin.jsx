import React, { useEffect, useState } from 'react'
import './HeaderAdmin.scss'
import LogoReact from '../../assets/react.svg'
import { getAdmin } from '../../apis/admin.api'
import toast from 'react-hot-toast'
import { PiHandWavingLight } from 'react-icons/pi'
function HeaderAdmin() {
  const [admin, setAdmin] = useState()
  const fetchGet = async () => {
    try {
      const res = await getAdmin()
      setAdmin(res?.data)
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    fetchGet()
  }, []) // ← Quan trọng: thêm [] để chỉ chạy 1 lần sau khi mount

  return (
    <div className='admin__header'>
      <p className='admin__header--name'>
        Xin chào, {admin?.fullName || 'Admin'}{' '}
        <PiHandWavingLight size={25} style={{ marginLeft: '10px' }} />
      </p>
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
