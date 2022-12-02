import React from 'react'
import './modal.scss'

const Modal = ({children}) => {
  return (
    <div className='modal'>
        <div className='modal-body'>
            {children}
        </div>
    </div>
  )
}

export default Modal