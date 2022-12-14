import { createContext, useReducer, useContext, useEffect } from "react";
import { SET_USER } from "../actions.js";
import auth_reducer from "../reducers/auth_reducer";
import { getUserFromLocalStorage } from "../utils/LocalStorage.js";

const AuthContext = createContext();
const initialState = {
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);

  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (user) {
      dispatch({ type: SET_USER, payload: user });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
