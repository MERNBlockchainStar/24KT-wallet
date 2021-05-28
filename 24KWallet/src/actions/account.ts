import { LoadAccountActionTypes } from '../types/wallet';
import { getAccount } from '../services/token';
import { AppThunk } from "../store";

export const loadAccount = (address: string): AppThunk => async(dispatch) => {
    try {
        dispatch({
            type: LoadAccountActionTypes.LOAD_ACCOUNT_REQUEST,
        });
        const data = await getAccount(address);
        dispatch({
            type: LoadAccountActionTypes.LOAD_ACCOUNT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LoadAccountActionTypes.LOAD_ACCOUNT_FAILURE,
            payload: "Fail to connect Wallet. Check Connection on Metamask or Mist!"
        })
    }
}