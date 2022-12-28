import React from "react";
import "./forminput.scss";

const FormInput = ({ type, id, name, placeholder, onChange, label, value, required, errorMessage, icon, onTogglePassword }) => {
  return (
    <div className='form_group'>
      <label className='form_label' htmlFor={id}>
        <span>{label}</span>
        <input id={id} type={type} name={name} value={value} onChange={onChange} className='form_input' placeholder={placeholder} required={required} />
        <div className='form_icon-right' onClick={onTogglePassword}>
          {icon}
        </div>
      </label>

      {errorMessage && <span className='text-danger'>{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
