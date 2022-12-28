import { createContext, useReducer, useContext } from "react";
import auth_reducer from "../reducers/auth_reducer";
import { getUserFromLocalStorage } from "../utils/LocalStorage.js";

const AuthContext = createContext();
const initialState = {
  user: getUserFromLocalStorage(),
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
