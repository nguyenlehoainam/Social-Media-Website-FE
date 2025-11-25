import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Radio, DatePicker, Space, Select } from 'antd'
import './MemberForm.scss'
import dayjs from 'dayjs'
import { createMembers, detailMembers, updateMembers } from '../../../apis/members.api'
import toast from 'react-hot-toast'
function MemberForm({ modal }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()

  // get api lay chi tiet
  const getDetail = async (id) => {
    try {
      const response = await detailMembers(id)
      const data = response?.data
      const filledEvent = {
        fullName: data.fullName,
        role: data.role,
        gender: data.gender,
        dob: dayjs(data.dob),
        email: data.email,
      }
      form.setFieldsValue(filledEvent)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (id) {
      getDetail(id)
    }
  }, [id, form])

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      dob: values.dob?.format('YYYY-MM-DD'),
    }
    console.log('Du lieu gui len api ', payload)

    try {
      if (modal === 'add') {
        await createMembers(payload)
        toast.success('Thêm người dùng thành công!')
      } else {
        await updateMembers(id, payload)
        toast.success('Cập nhập người dùng thành công!')
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || ''

      if (modal === 'add') {
        if (errMsg.includes('exception.user.already.exists')) {
          toast.error('Email đã tồn tại!')
        } else {
          toast.error('Thêm người dùng thất bại!')
        }
      } else {
        toast.error('Cập nhật người dùng thất bại!')
      }

      console.error('Lỗi từ server:', errMsg)
    }

    navigate('/admin/members')
  }
  const handleCancel = () => {
    navigate('/admin/members')
  }

  return (
    <div>
      <div className='member-form__wrapper'>
        {modal === 'add' ? <h2>Tạo tài khoản thành viên </h2> : <h2>Sửa tài khoản thành viên</h2>}
        <Form
          onFinish={handleSubmit}
          className='member-form'
          layout='horizontal'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign='left'
          form={form}>
          <Form.Item
            label='Họ và tên'
            name='fullName'
            rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}>
            <Input placeholder='Nhập họ và tên' />
          </Form.Item>

          <Form.Item
            label='Vai trò'
            name='role'
            rules={[{ required: true, message: 'Hãy chọn vai trò' }]}>
            <Select placeholder='Chọn vai trò'>
              <Select.Option value='TV'>TV</Select.Option>
              <Select.Option value='BQT'>BQT</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Giới tính' name='gender' rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value='MALE'>Nam</Radio>
              <Radio value='FEMALE'> Nữ </Radio>
              <Radio value='OTHER'>Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label='Ngày sinh'
            name='dob'
            rules={[{ required: true, message: 'Hãy chọn ngày sinh!' }]}>
            <DatePicker
              className='datetime'
              placeholder='Chọn ngày sinh'
              disabledDate={(current) => current && current >= dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Hãy nhập email' },
              { type: 'email', message: 'Giá trị email không hợp lệ' },
            ]}>
            <Input placeholder='Nhập email' />
          </Form.Item>

          <Space
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '32px',
              justifyContent: 'center',
              marginTop: '40px',
            }}>
            <Form.Item>
              <Button htmlType='button' className='btnCancel' onClick={handleCancel}>
                Hủy
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' className='btnSubmit'>
                Gửi
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  )
}

export default MemberForm

{
  /* 
          <Form.Item
            label='Tên tài khoản'
            name='username'
            rules={[{ required: true, message: 'Hãy nhập tên tài khoản!' }]}>
            <Input placeholder='Nhập tên tài khoản' />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='passwordHash'
            rules={[{ required: true, message: 'Hãy nhập mật khẩu hoặc nhấn Rundome' }]}
            style={{ marginBottom: 8 }}>
            <Space.Compact style={{ width: '100%' }}>
              <Input.Password placeholder='Rundome mật khẩu' />
              <Button className='btnSubmit'>Rundome</Button>
            </Space.Compact>
          </Form.Item> */
}
