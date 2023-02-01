import { createContext, useReducer, useContext } from "react";

import user_reducer from "../reducers/user_reducer.js";

const UserContext = createContext();
const initialState = {
  budget: 0,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, initialState);

  return <UserContext.Provider value={{ ...state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
