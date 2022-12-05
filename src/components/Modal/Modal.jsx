import React from 'react'
import './modal.scss';

import { MdClose } from "react-icons/md";

import { useThemeContext } from "../../context/ThemeContext";


const Modal = ({children}) => {
  const { closeModal } = useThemeContext();
  return (
    <>
      <div className='modal'>
        <div className='modal-header'>
          <div className='close-icon' onClick={() => closeModal()}>
            <MdClose />
          </div>
        </div>
        <div className='modal-body'>
            {children}
        </div>
      </div>
      <div className='modal-overlay' onClick={() => closeModal()}></div>
    </>
  )
}

export default Modal