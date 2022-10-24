import { createStore, combineReducers } from 'redux';
import { profileReducer, blocksReducer } from "./reducers";

const store = createStore(combineReducers({profile: profileReducer, blocks: blocksReducer}));
console.log(store.getState());

export default store;