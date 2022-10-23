import { Types } from './actionTypes';

export const ActionCreators = {
    addUser: (user) => ({ type: Types.ADD_USER, payload: { user } }),

    updateUser: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),

    login: (user) => ({ type: Types.LOGIN, payload: { user } }),

    logout: (user) => ({ type: Types.LOGOUT, payload: { user } }),

    addEvent: (block) => ({ type: Types.ADD_EVENT, payload: { block } })
}