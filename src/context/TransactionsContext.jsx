import { createContext, useReducer , useContext} from 'react'
import transaction_reducer from '../reducers/transactions_reducer'
import { DELETE_TRANSACTIONS, LATEST_TRANSACTIONS } from "../actions";

const TransactionsContext = createContext();
const initialState = {
    transactionId: 0,
    latestTransaction: []
}

export const TransactionProvider = ({children}) => {
    const [state, dispatch] = useReducer(transaction_reducer, initialState);

    const getTransactionId = (id) => {
        dispatch({type: DELETE_TRANSACTIONS, payload: id});
    }

    const getLatestTransaction = (data) => {
        dispatch({type: LATEST_TRANSACTIONS, payload: data})
    }

    return <TransactionsContext.Provider value={{...state, getTransactionId, getLatestTransaction}}>
        {children}
    </TransactionsContext.Provider>
}

export const useTransactionContext = () => {
    return useContext(TransactionsContext)
}
