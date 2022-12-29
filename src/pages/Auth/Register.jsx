import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput/FormInput.jsx";
import MainTemplate from "../../components/Templates/MainTemplate.jsx";
import Title from "../../components/Title/Title.jsx";

import { register } from "../../querys/authQuery.js";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();

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
    email: "",
  });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { mutateAsync } = useMutation(register, {
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({ username: values.username, password: values.password, email: values.email });
  };

  return (
    <MainTemplate>
      <div className='main container_sm m-auto flex flex-column justify-center'>
        <Title>Register</Title>
        <form className='form_wrapper' onSubmit={handleSubmit}>
          <FormInput type='email' name='email' value={values.email} label='Email' id='email' onChange={handleOnChange} />

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
              Register
            </button>
            <div className='text-color mt-1 font-500'>
              Are you member? <Link to='/'>Login</Link>
            </div>
          </div>
        </form>
      </div>
    </MainTemplate>
  );
};

export default Register;
