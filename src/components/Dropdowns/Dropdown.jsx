import React from 'react'
import './dropdown.scss'


const Dropdown = ({children, optionClass, optionStyle }) => {
  return (
    <div className={`dropdown ${optionClass}`} style={optionStyle}>
        <ul>
            {children}
        </ul>
    </div>
  )
}


Dropdown.defaultProps={
    optionClass: '',
}

export default Dropdown