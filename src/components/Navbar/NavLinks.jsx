import React from 'react'
import {NavLink} from 'react-router-dom'

const NavLinks = ({url, children, clickHandler, endHandler}) => {
  return (
    <li className="nav_link" onClick={clickHandler}>
        <NavLink to={`${url}`} className={({isActive}) => isActive ? "nav_link_active" : ""} end={endHandler}>
            {children}
        </NavLink>
    </li>
  )
}

NavLinks.defaultProps = {
  endHandler: undefined
};

export default NavLinks