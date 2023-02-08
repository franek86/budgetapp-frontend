import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";

import FormInput from "../../components/FormInput/FormInput.jsx";
import MainTemplate from "../../components/Templates/MainTemplate.jsx";
import Title from "../../components/Title/Title.jsx";

import { addUserToLocalStorage } from "../../utils/LocalStorage.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

import { login } from "../../querys/authQuery.js";
import { useMutation } from "@tanstack/react-query";
import { SET_USER } from "../../actions.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [togglePassword, setTooglePassword] = useState(false);

  const onChangePassword = () => {
    setTooglePassword(!togglePassword);
  };

  const changePasswordIcon = () => {
    return togglePassword ? <IoMdEyeOff size={24} fill='#3b4b76' /> : <IoMdEye size={24} fill='#3b4b76' />;
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { dispatch } = useAuthContext();

  const { mutateAsync } = useMutation(login, {
    onSuccess: (data) => {
      dispatch({ type: SET_USER, payload: data });

      data && addUserToLocalStorage(data);
      navigate(from, { replace: true });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({ username: values.username, password: values.password });
  };

  return (
    <MainTemplate>
      <div className='main container_sm m-auto flex flex-column justify-center'>
        <Title>Login</Title>
        <form className='form_wrapper' onSubmit={handleSubmit}>
          <FormInput type='text' name='username' value={values.username} label='Username' id='username' onChange={handleOnChange} />
          <FormInput
            type={togglePassword ? "text" : "password"}
            name='password'
            value={values.password}
            label='Password'
            id='password'
            icon={changePasswordIcon()}
            onChange={handleOnChange}
            onTogglePassword={onChangePassword}
          />
          <div className='form_group'>
            <button className='form_btn' type='submit'>
              Login
            </button>
            <div className='text-color mt-1 font-500'>
              Not a member yet? <Link to='auth/register'>Register now</Link>
            </div>
          </div>
        </form>
      </div>
    </MainTemplate>
  );
};

export default Login;
