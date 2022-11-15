import React from 'react'
import {MdDarkMode} from 'react-icons/md'
import './mode.scss'

import { useThemeContext } from '../../../context/ThemeContext'

const Mode = () => {
const {darkMode, handleTheme} = useThemeContext();


  return (
    <div className="mode">
        <label htmlFor='theme'>
            <input type="checkbox" onChange={handleTheme} checked={darkMode === "dark_theme"} id="theme" />
            <div className='checkbox_custom'>
                <MdDarkMode size={25}/>
            </div>
        </label>  
    </div>
  )
}

export default Mode