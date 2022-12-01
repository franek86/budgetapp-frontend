import { useEffect, createContext, useContext, useReducer } from "react";
import { getStorageTheme } from "../utils/LocalStorage.js";
import theme_reducer from "../reducers/theme_reducer.js";
import { TOGGLE_MENU, CLOSE_MENU, TOGGLE_THEME, TOGGLE_DROPDOWN, TRANSACTION_IS_EDIT } from "../actions.js";

const ThemeContext = createContext();

const initialState = {
  darkMode: getStorageTheme(),
  toggleMenu: false,
  dropdown: false,
  isEdit: -1
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(theme_reducer, initialState);

  const handleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
    localStorage.setItem("theme", state.darkMode);
  };

  const handleCloseMenu = () => {
    dispatch({ type: CLOSE_MENU });
  };
  const handleToggleMenu = () => {
    dispatch({ type: TOGGLE_MENU });
  };
  const toggleDropdown = () => {
    dispatch({ type: TOGGLE_DROPDOWN });
  };
  const toggleIsEdit = (id) => {
    dispatch({type: TRANSACTION_IS_EDIT, payload: id})
  }
  useEffect(() => {
    localStorage.setItem("theme", state.darkMode);
  }, [state.darkMode]);

  return <ThemeContext.Provider value={{ ...state, handleToggleMenu, handleCloseMenu, handleTheme, toggleDropdown, toggleIsEdit }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
