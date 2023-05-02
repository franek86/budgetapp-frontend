import { DELETE_TRANSACTIONS } from "../actions";

const transaction_reducer = (state, action) => {
  switch (action.type) {
    case DELETE_TRANSACTIONS:
      return { ...state, transactionId: action.payload };

    default:
      return state;
  }
};

export default transaction_reducer;
