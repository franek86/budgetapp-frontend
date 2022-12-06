import { DELETE_TRANSACTIONS, LATEST_TRANSACTIONS } from '../actions';

const transaction_reducer = (state, action) => {
    switch (action.type) {
        case DELETE_TRANSACTIONS:
            return ({...state,  transactionId: action.payload})
        case LATEST_TRANSACTIONS:
            //let latesetTransaction = action.payload.slice(5)
           console.log(action.payload)
            return ({...state, transaction: [...action.payload]})
        default:
            return state
    }
}

export default transaction_reducer;