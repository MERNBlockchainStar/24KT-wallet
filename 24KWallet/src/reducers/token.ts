import { LoadTokensActionTypes } from '../types/wallet'
import { ERC20TokenInterface, ERC20TokenState } from '../types/token'
import { TokensAction } from '../types/wallet'
import { loadTokenInfo, saveTokenInfo } from '../util/storage'

const tokensInitialState: ERC20TokenState = loadTokenInfo();

export const tokenReducer = (
    state: ERC20TokenState = tokensInitialState,
    action: TokensAction
) => {
    switch (action.type) {
        case LoadTokensActionTypes.LOAD_TOKENS_REQUEST: {
            let address = action.payload;
            if (!state.tokens.has(address)) {
                let token : ERC20TokenInterface = {
                    contractAddress: address,
                    name: '',
                    symbol: '',
                    balance: 0,
                    isPending: true
                };
                state.tokens.set(address, token);
            } else {
                let token = state.tokens.get(address);
                if (typeof token !== 'undefined') {
                    token.isPending = true;
                    state.tokens.set(address, token);
                }
            }
            saveTokenInfo(state);
            return {
                ...state
            };
        }
        case LoadTokensActionTypes.LOAD_TOKENS_SUCCESS: {
            let address = action.payload.address;
            let token = state.tokens.get(address);
            if (typeof token !== 'undefined') {
                token.isPending = false;
                token.name = action.payload.data.name;
                token.symbol = action.payload.data.symbol;
                token.balance = action.payload.data.balance;
                token.price = action.payload.price;
                state.tokens.set(address, token);
            }
            saveTokenInfo(state);
            return {
                ...state
            };
        }
        case LoadTokensActionTypes.LOAD_TOKENS_FAILURE:
            let address = action.payload.address;
            let token = state.tokens.get(address);
            if (typeof token !== 'undefined') {
                token.isPending = false;
                state.tokens.delete(address);
            }
            saveTokenInfo(state);
            return {
                ...state
            };
        default:
            return state;
    }
}