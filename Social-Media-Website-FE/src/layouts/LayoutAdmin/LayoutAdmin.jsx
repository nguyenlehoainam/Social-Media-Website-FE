import React from 'react'
import './LayoutAdmin.scss'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../../common/admin/HeaderAdmin'
import Sidebar from '../../components/admin/Sidebar/Sidebar'

function LayoutAdmin() {
  return (
    <div className='admin__container'>
        <div className='admin__content'>
            <div className='admin__sidebar'>
                <Sidebar/>
            </div>
            <div className='admin__right'>
                <HeaderAdmin className="admin__header"/>
                <div className='children-layout'>
                  <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LayoutAdmin