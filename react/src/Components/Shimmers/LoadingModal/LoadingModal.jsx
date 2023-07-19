import './LoadingModal.css'

import React from 'react'

const LoadingModal = () => {
  return (
    <div className="homepost_container">
    <div className='loadingmodal_container'>
        <svg className='loadingmodal_svg' viewBox="25 25 50 50">
        <circle className='loadingmodal_circle'  r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
    </div>
  )
}

export default LoadingModal