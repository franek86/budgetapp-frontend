import { TOGGLE_MENU, CLOSE_MENU, TOGGLE_THEME, TOGGLE_DROPDOWN, TRANSACTION_IS_EDIT, OPEN_MODAL, CLOSE_MODAL } from "../actions.js";

const theme_reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, toggleMenu: !state.toggleMenu };
    case CLOSE_MENU:
      return { ...state, toggleMenu: false };
    case TOGGLE_THEME:
      return { ...state, darkMode: state.darkMode === "light_theme" ? "dark_theme" : "light_theme" };
    case TOGGLE_DROPDOWN:
      return { ...state, dropdown: !state.dropdown };
    case TRANSACTION_IS_EDIT:
      return {...state, isEdit: action.payload}
    case OPEN_MODAL:
      return {...state, toggleModal: true}
    case CLOSE_MODAL:
      return {...state, toggleModal: false}
    default:
      return state;
  }
};

export default theme_reducer;
