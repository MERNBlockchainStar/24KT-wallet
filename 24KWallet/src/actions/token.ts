import { LoadTokensActionTypes, SendTokenActionTypes } from '../types/wallet';
import { getAccount, sendTokenService } from '../services/token';
import { AppThunk } from "../store";

export const loadToken = (address: string): AppThunk => async(dispatch) => {
    try {
        dispatch({
            type: LoadTokensActionTypes.LOAD_TOKENS_REQUEST,
            payload: address
        });

        const data = await getAccount(address);

        dispatch({
            type: LoadTokensActionTypes.LOAD_TOKENS_SUCCESS,
            payload: { address: address, data: data }
        })
    } catch (error) {
        dispatch({
            type: LoadTokensActionTypes.LOAD_TOKENS_FAILURE,
            payload: { address: address, error: "Fail to load tokens!" }
        })
    }
}

export const sendToken = (to: string, amount: number, contractAddress: any): AppThunk => async(dispatch) => {
    try {
        dispatch({
            type: SendTokenActionTypes.SEND_TOKEN_REQUEST,
        });

        const data = await sendTokenService(to, amount, 18, contractAddress, () => {
            dispatch(loadToken(contractAddress));
        });
        dispatch({
            type: SendTokenActionTypes.SEND_TOKEN_SUCCESS,
            payload: { data: data }
        })
    } catch (error) {
        dispatch({
            type: SendTokenActionTypes.SEND_TOKEN_FAILURE,
            payload: { error: "Fail to send tokens!" }
        })
    }
}