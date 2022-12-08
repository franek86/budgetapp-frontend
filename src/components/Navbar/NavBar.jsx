import React from 'react'
import {Link} from 'react-router-dom'
import NavLinks from './NavLinks'
import {FaMonero} from 'react-icons/fa'
import{MdOutlineSpaceDashboard, MdOutlineSyncAlt, MdOutlineAccountBalanceWallet, MdOutlineCategory, MdOutlineAdminPanelSettings, MdClose} from 'react-icons/md'
import './navbar.scss'

import {useThemeContext} from '../../context/ThemeContext'


const Navbar = () => {
  const {toggleMenu, handleCloseMenu} = useThemeContext();
  return (
    <aside className={`aside${toggleMenu === true ? ' aside_toggle' : ''}`}>
      <div className='nav_close' onClick={handleCloseMenu}>
        <MdClose size={30} />
      </div>
      <div className='nav_logo'>
        <Link to="/">
          <FaMonero size={60} color="#f8fdfe"/>
        </Link>
      </div>
      <nav className="nav">
          <ul className="nav_links">
              <NavLinks url="/" endHandler="end" clickHandler={handleCloseMenu}>
                <div className="nav_links_icon">
                  <MdOutlineSpaceDashboard size={20}/>
                </div>
                Dashboard
              </NavLinks>

              <NavLinks url="/transactions" clickHandler={handleCloseMenu}>
                <div className="nav_links_icon">
                 <MdOutlineSyncAlt size={20}/>
                </div>
                Transactions
              </NavLinks>

              <NavLinks url="/categories" clickHandler={handleCloseMenu}>
                <div className="nav_links_icon">
                  <MdOutlineCategory size={20}/>
                </div>
               
                Categories
              </NavLinks>

              <NavLinks url="/wallet" clickHandler={handleCloseMenu}>
                <div className="nav_links_icon">
                  <MdOutlineAccountBalanceWallet size={20}/>
                </div>
                
                Wallet
              </NavLinks>

              <NavLinks url="/profile" clickHandler={handleCloseMenu}>
                <div className="nav_links_icon">
                  <MdOutlineAdminPanelSettings size={20}/>
                </div>
                
                Profile
              </NavLinks>
          </ul>
      </nav>
    </aside>
  )
}

export default Navbar