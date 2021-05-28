import { LoadAccountActionTypes } from '../types/wallet'
import { AccountState } from '../types/account'
import { AccountAction } from '../types/wallet'

const accountInitialState: AccountState = {
    account: null,
    isPending: false,
    isConnected: false,
    error: null
};

export const accountReducer = (
    state: AccountState = accountInitialState,
    action: AccountAction
) => {
    switch (action.type) {
        case LoadAccountActionTypes.LOAD_ACCOUNT_REQUEST:
            return {
                ...state,
                account: null,
                isPending: true,
                isConnected: false,
                error: null
            }
        case LoadAccountActionTypes.LOAD_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: action.payload,
                isPending: false,
                isConnected: true,
                error: null
            }
        case LoadAccountActionTypes.LOAD_ACCOUNT_FAILURE:
            return {
                ...state,
                account: null,
                isPending: false,
                isConnected: false,
                error: action.payload
            }
        default:
            return state;
    }
}