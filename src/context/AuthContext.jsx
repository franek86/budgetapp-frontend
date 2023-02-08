import { createContext, useReducer, useContext, useEffect } from "react";
import { SET_USER, GET_USER_ID } from "../actions.js";
import auth_reducer from "../reducers/auth_reducer";
import { getUserFromLocalStorage } from "../utils/LocalStorage.js";

const AuthContext = createContext();
const initialState = {
  user: null,
  userId: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);
  console.log(state);
  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (user) {
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: GET_USER_ID, payload: user?.id });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
