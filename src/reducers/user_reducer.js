import { GET_USER_BUDGET } from "../actions.js";

const user_reducer = (state, action) => {
  switch (action.type) {
    case GET_USER_BUDGET:
      return { ...state, budget: action.payload };
    default:
      return state;
  }
};

export default user_reducer;
