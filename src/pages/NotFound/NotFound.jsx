import React from 'react'
import {Link} from 'react-router-dom'

import './notfound.scss'

const NotFound = () => {
  return (
    <div className='notfound'>
      <div className='notfound_title'>Oops!</div>
      <p>404 - page not found</p>
      <Link to="/" className='btn mt-1'> 
        Go to Home page
      </Link>
    </div>
  )
}

export default NotFound