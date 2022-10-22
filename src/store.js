import { createStore, combineReducers } from 'redux';
import { profileReducer, blocksReducer } from "./reducers";

const store = createStore(combineReducers({profileReducer, blocksReducer}));

export default store;