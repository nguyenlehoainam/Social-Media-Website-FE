import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { dowloadCvAPI } from '../../apis/posts.api'
import './downloadCv.scss'

const DownloadCvModal = ({ postId, onClose, onPostUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmDownload = async () => {
    setIsLoading(true)
    try {
      const response = await dowloadCvAPI(postId)
      const disposition = response.headers?.['content-disposition']
      let filename = `CVs-Post-${postId}.zip`
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '')
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)

      document.body.appendChild(link)
      link.click()

      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success('Tải xuống thành công!')
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Tải file không thành công.')
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
        <h2>Xác nhận tải xuống tất cả các CV</h2>
        <button onClick={handleConfirmDownload} className='import-button' disabled={isLoading}>
          {isLoading ? 'Đang tải...' : 'Tải xuống'}
        </button>
      </div>
    </div>
  )
}

export default DownloadCvModal
