import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormInput from "../../components/FormInput/FormInput.jsx";
import MainTemplate from "../../components/Templates/MainTemplate.jsx";
import Title from "../../components/Title/Title.jsx";
import { axiosClient } from "../../utils/Axios.js";

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
    confirmPassword: "",
    email: "",
  });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Confirm password does not match");
      } else {
        const res = await axiosClient.post("/auth/register", { ...values });
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
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
          <FormInput type='password' name='confirmPassword' value={values.confirmPassword} label='Confirm password' id='confirm-password' onChange={handleOnChange} />

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
