import React from 'react'
import './forminput.scss'

const FormInput = ({type,id,name,placeholder, onChange, required, title}) => {
  return (
    <div className="form_group">
        <label className="form_label" htmlFor={id}>
        <span>{title}</span>
        <input 
            id={id} 
            type={type} 
            name={name} 
            value={title} 
            onChange={onChange} 
            className="form_input" 
            placeholder={placeholder} 
            required = {required}/>
        </label>
    </div>
  )
}

export default FormInput