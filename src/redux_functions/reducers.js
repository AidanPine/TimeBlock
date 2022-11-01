import { Types } from './actionTypes';
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

/*
store design:
{
	profile: {
	...
	},
	blocks: [
		{
			name:
			date:
			desc:
			length:
			startTime:
			...
		},
	]
}
 */


// let blockID = 0;

const initialAuthState = {
    authError: null,
};

const initialBlocksState = {
    blocks: [
    ]
};

export function authReducer(state=initialAuthState, action) {
    switch(action.type) {
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                authError: null,
            }
        case Types.LOGIN_FAILURE:
            return {
                ...state,
                authError: action.payload.error.message
            }
        case Types.LOGOUT:
            return {
                ...state,
                authError: null,
            }
        case Types.SIGNUP:
            return {
                ...state,
            }
        case Types.SIGNUP_ERROR:
            return {
                ...state,
                authError: action.payload.error.message
            }
        default:
            return state;
    }
}

export function blocksReducer(state = initialBlocksState, action) {
    switch(action.type) {
        case Types.ADD_EVENT:
            return [
                ...state,

                action.payload.block
            ]
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    auth: authReducer,
    blocks: blocksReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});