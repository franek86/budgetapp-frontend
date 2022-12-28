import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../../actions.js";

import { HiOutlineUser } from "react-icons/hi";
import { useThemeContext } from "../../../context/ThemeContext";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import Dropdown from "../../Dropdowns/Dropdown";

const HeaderProfile = () => {
  const { dropdown, toggleDropdown } = useThemeContext();
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const displayDropdown = () => {
    toggleDropdown();
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
  };

  return (
    <>
      <div className='font-600 text-color'>{user.username && `Welcome, ${user.username}`}</div>
      <div className='header_profile has_dropdown' onClick={displayDropdown}>
        <div className='avatar'>
          <HiOutlineUser size={30} />
        </div>

        <Dropdown optionClass={dropdown === true ? "show" : ""}>
          <li>
            <Link to='profile'>Profile</Link>
          </li>
          <li className='font-500 mt-1 btn-color text-uppercase pointer' onClick={logout}>
            Logout
          </li>
        </Dropdown>
      </div>
    </>
  );
};

export default HeaderProfile;
