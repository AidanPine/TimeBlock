import {createStore, applyMiddleware } from 'redux';
import { rootReducer } from "./reducers";
import thunk from 'redux-thunk';
import { compose } from "redux";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import firebaseConfig from "../firebase_functions/firebaseConfig";


const store = createStore(
    rootReducer, compose(
        applyMiddleware(thunk.withExtraArgument({
            getFirebase,
            getFirestore
        })),
        reduxFirestore(firebaseConfig)
    )
);

export default store;