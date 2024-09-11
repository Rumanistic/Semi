// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer'; // 경로를 올바르게 지정

const rootReducer = combineReducers({
  auth: authReducer,
  // 다른 리듀서가 있으면 여기에 추가
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
