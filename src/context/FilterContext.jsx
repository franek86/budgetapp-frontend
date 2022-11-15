import {useState, createContext, useContext} from 'react';

const FilterContext = createContext();

export const FilterProvider = ({children}) => {

    const [checkedState, setCheckedState] = useState([]);
    const [checked,setChecked] = useState(false);


    const handleChecked = (e) => {
        const checkTarget = e.target.checked;
        const value = e.target.value;
        setCheckedState(
            checkTarget ? [...checkedState, value] : checkedState.filter((item) => item !== value)
        )
        setChecked(current => !current)
    };


    return<FilterContext.Provider value={{handleChecked, checkedState}}>
        {children}
    </FilterContext.Provider>
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}