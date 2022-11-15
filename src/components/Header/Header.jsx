import React from 'react'
import './header.scss'
import {GrMenu} from 'react-icons/gr'

import SearchInput from '../SearchInput/SearchInput';
import Mode from './Mode/Mode';
import HeaderProfile from './HeaderProfile/HeaderProfile';

import {useThemeContext} from '../../context/ThemeContext'

const Header = () => {

  const {handleToggleMenu} = useThemeContext();

  return (
    <header className='header_top'>
        <div className='header_top_left'>
            <div className='header_hamburger' onClick={handleToggleMenu}>
              <GrMenu size={20}/>
            </div>
            <SearchInput />
        </div>
        <div className='header_top_right'>
            <Mode />
            <HeaderProfile />
        </div>
        
    </header>
  )
}

export default React.memo(Header)