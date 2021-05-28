export enum LoadAccountActionTypes {
    LOAD_ACCOUNT_REQUEST = "LOAD_ACCOUNT_REQUEST",
    LOAD_ACCOUNT_SUCCESS = "LOAD_ACCOUNT_SUCCESS",
    LOAD_ACCOUNT_FAILURE = "LOAD_ACCOUNT_FAILURE",
}
export interface LoadAccountRequestAction {
    type: LoadAccountActionTypes.LOAD_ACCOUNT_REQUEST;
}
  
export interface LoadAccountSuccessAction {
    type: LoadAccountActionTypes.LOAD_ACCOUNT_SUCCESS;
    payload: any;
}
  
export interface LoadAccountFailureAction {
    type: LoadAccountActionTypes.LOAD_ACCOUNT_FAILURE;
    payload: any;
}
  
export type AccountAction =
    | LoadAccountRequestAction
    | LoadAccountSuccessAction
    | LoadAccountFailureAction;

export enum LoadTokensActionTypes {
    LOAD_TOKENS_REQUEST = "LOAD_TOKENS_REQUEST",
    LOAD_TOKENS_SUCCESS = "LOAD_TOKENS_SUCCESS",
    LOAD_TOKENS_FAILURE = "LOAD_TOKENS_FAILURE"
}

export interface LoadTokensRequestAction {
    type: LoadTokensActionTypes.LOAD_TOKENS_REQUEST;
    payload: any;
}
  
export interface LoadTokensSuccessAction {
    type: LoadTokensActionTypes.LOAD_TOKENS_SUCCESS;
    payload: any;
}
  
export interface LoadTokensFailureAction {
    type: LoadTokensActionTypes.LOAD_TOKENS_FAILURE;
    payload: any;
}

export enum SendTokenActionTypes {
    SEND_TOKEN_REQUEST = "SEND_TOKEN_REQUEST",
    SEND_TOKEN_SUCCESS = "SEND_TOKEN_SUCCESS",
    SEND_TOKEN_FAILURE = "SEND_TOKEN_FAILURE"
}

export interface SendTokenRequestAction {
    type: SendTokenActionTypes.SEND_TOKEN_REQUEST;
    payload: any;
}
  
export interface SendTokenSuccessAction {
    type: SendTokenActionTypes.SEND_TOKEN_SUCCESS;
    payload: any;
}
  
export interface SendTokenFailureAction {
    type: SendTokenActionTypes.SEND_TOKEN_FAILURE;
    payload: any;
}

export type TokensAction =
    | LoadTokensRequestAction
    | LoadTokensSuccessAction
    | LoadTokensFailureAction
    | SendTokenRequestAction
    | SendTokenSuccessAction
    | SendTokenFailureAction;