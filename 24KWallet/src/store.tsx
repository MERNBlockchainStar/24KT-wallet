import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import { accountReducer } from './reducers/account'
import { tokenReducer } from './reducers/token'

export type AppDispatch = ThunkDispatch<any, unknown, Action<string>>;

export type AppThunk = ThunkAction<
  Promise<void>,
  any,
  unknown,
  Action<string>
>;

const reducer = combineReducers({
    account: accountReducer,
    token: tokenReducer
})

const middleware = [thunk];

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(...middleware)));
export default store;