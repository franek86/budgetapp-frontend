import React from 'react'
import {MdSearch} from 'react-icons/md'
import './searchinput.scss'


const SearchInput = ({search,handleSearch}) => {

 
 
  return (
    <form className="search">
        <input className="search_input" type="text" onChange={(e) => handleSearch(e)} />
        <button className='search_btn'>
          {search ? undefined  :  <MdSearch size={20} />}
           
        </button>
    </form>
  )
}

export default SearchInput