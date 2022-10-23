import { Types } from './actionTypes';

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


let blockID = 0;

const initialUserState = {
    profile: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    }
};

const initialBlocksState = {
    blocks: [

    ]
};

export function profileReducer(state=initialUserState, action) {
    switch(action.type) {
        case Types.LOGIN:
            return {
                ...state,
                profile: action.payload.user,
            }
        case Types.ADD_USER:
            return {
                ...state,
                profile: action.payload.user
            }
        case Types.UPDATE_USER:
            return {
                ...state,
                profile: action.payload.user
            }
        case Types.LOGOUT:
            return {
                ...state,
                profile: initialUserState.profile
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