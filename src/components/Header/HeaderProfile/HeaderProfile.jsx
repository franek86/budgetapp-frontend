import React from 'react'
import {HiOutlineUser} from 'react-icons/hi'
import { useThemeContext } from '../../../context/ThemeContext'
import Dropdown from '../../Dropdowns/Dropdown'


const HeaderProfile = () => {

  const {dropdown, toggleDropdown} = useThemeContext();

  const displayDropdown = () => {
    toggleDropdown()
  }
  
  
  return (
    <div className='header_profile has_dropdown' onClick={displayDropdown}>
      <div className='avatar'>
        <HiOutlineUser size={30}/>
      </div>



      <Dropdown optionClass={dropdown === true ? 'show' : ''}>
        <li>test</li>
        <li>test nice</li>
        <li>test</li>
        <li>test hello</li>
      </Dropdown>
    </div>
  )
}

export default HeaderProfile