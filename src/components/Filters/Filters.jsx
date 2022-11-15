import React from 'react'
import { useFilterContext } from '../../context/FilterContext'

const Filters = ({dataFilter, isErrorFilter, errorFilter}) => {

    const {handleChecked} = useFilterContext()

   
    if (isErrorFilter) {
        return <span>Error: {errorFilter.message}</span>
      }

    return (
    <div className='checkbox_custom'>
        {
            dataFilter?.map(({name, _id}) => (
                <label key={_id} className='checkbox_label mb-1' htmlFor={`${name}-${_id}`}>
                    <input className='checkbox_slider_input' type="checkbox" id={`${name}-${_id}`} name={_id} value={_id} onChange={handleChecked}/>
                    <div className='checkbox_slider'></div>
                    <span className='ml-1 text-color'>{name}</span>
                </label>
            ))
        }
    </div>
    )
}

export default Filters