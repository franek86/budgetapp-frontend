import React from 'react'

const Title = ({children, optionlClass}) => {
  return (
    <h1 className={optionlClass}>{children}</h1>
  )
}


Title.defaultProps = {
    optionlClass: undefined
}

export default Title