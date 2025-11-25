import React from 'react'
import './LayoutAdmin.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import HeaderAdmin from '../../../common/admin/HeaderAdmin'

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