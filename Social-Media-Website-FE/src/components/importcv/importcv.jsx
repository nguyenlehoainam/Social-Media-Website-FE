import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { creatcv } from '../../apis/posts.api'
import './importcv.scss'

const ImportCvModal = ({ postId, onClose }) => {
  const [cvFile, setCvFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCvFile(file)
    }
  }

  const handleSubmit = async () => {
    if (!cvFile) {
      toast.error('Vui lòng chọn một file CV.')
      return
    }
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', cvFile)
      formData.append('postId', postId)

      await creatcv(formData)

      toast.success('Nộp CV thành công!')
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Nộp CV không thành công.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='import-cv-modal-overlay' onClick={onClose}>
      <div className='import-cv-modal-content' onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className='close-button'>
          &times;
        </button>

        <h2>Import file CV</h2>

        <div className='file-input-area'>
          <label htmlFor='cv-upload' className='file-input-label'>
            {cvFile ? cvFile.name : 'Click vào đây để chọn file CV'}
          </label>
          <input id='cv-upload' type='file' accept='.pdf,.doc,.docx' onChange={handleFileChange} />
        </div>

        {/* <a href='' download className='template-link'>
          Click vào đây để download toàn bộ cv
        </a> */}

        <button onClick={handleSubmit} className='import-button' disabled={isLoading}>
          {isLoading ? 'Đang nộp...' : 'Import'}
        </button>
      </div>
    </div>
  )
}

export default ImportCvModal
