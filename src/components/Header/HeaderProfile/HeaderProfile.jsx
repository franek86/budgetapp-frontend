import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { useThemeContext } from "../../../context/ThemeContext";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { axiosClient } from "../../../utils/Axios.js";
import { removeUserFromLocalStorage } from "../../../utils/LocalStorage.js";
import { SET_USER } from "../../../actions.js";

import Dropdown from "../../Dropdowns/Dropdown";

const HeaderProfile = () => {
  const { dropdown, toggleDropdown } = useThemeContext();
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const displayDropdown = () => {
    toggleDropdown();
  };

  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      dispatch({ type: SET_USER, payload: null });
      removeUserFromLocalStorage();
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
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
