import { CHECKED_STATE, CHECK_STATE } from "../actions.js";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case CHECKED_STATE:
      const { checkTarget, value } = action.payload;
      return { ...state, checkedState: checkTarget ? [...state.checkedState, value] : state.checkedState.filter((item) => item !== value) };
    case CHECK_STATE:
      return { ...state, checked: !state.checked };
    default:
      return state;
  }
};

export default filter_reducer;
