import { SET_USER, LOGOUT, GET_USER_ID } from "../actions.js";
import { removeUserFromLocalStorage } from "../utils/LocalStorage.js";

const auth_reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case GET_USER_ID:
      return { ...state, userId: action.payload };
    case LOGOUT:
      return { ...state, user: removeUserFromLocalStorage() };
    default:
      return state;
  }
};

export default auth_reducer;
