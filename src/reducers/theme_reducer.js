import { TOGGLE_MENU, CLOSE_MENU, TOGGLE_THEME, TOGGLE_DROPDOWN } from "../actions.js";

const theme_reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, toggleMenu: !state.toggleMenu };
    case CLOSE_MENU:
      return { ...state, toggleMenu: true };
    case TOGGLE_THEME:
      return { ...state, darkMode: state.darkMode === "light_theme" ? "dark_theme" : "light_theme" };
    case TOGGLE_DROPDOWN:
      return { ...state, dropdown: !state.dropdown };
    default:
      return state;
  }
};

export default theme_reducer;
