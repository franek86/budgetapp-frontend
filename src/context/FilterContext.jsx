import { useState, createContext, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer.js";
import { CHECKED_STATE, CHECK_STATE } from "../actions.js";

const FilterContext = createContext();

const initialState = {
  checkedState: [],
  checked: false,
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChecked = (e) => {
    let value = e.target.value;
    let checkTarget = e.target.checked;
    dispatch({ type: CHECKED_STATE, payload: { checkTarget, value } });
    dispatch({ type: CHECK_STATE });
  };

  return <FilterContext.Provider value={{ ...state, handleChecked }}>{children}</FilterContext.Provider>;
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
