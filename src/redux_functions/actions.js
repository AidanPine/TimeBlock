import { Types } from './actionTypes';


export const ActionCreators = {
    addUser: (user) => ({ type: Types.ADD_USER, payload: { user } }),

    updateUser: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),

    receiveLogin: (user) => ({ type: Types.LOGIN_SUCCESS, payload: { user } }),

    loginError: (error) => ({ type: Types.LOGIN_FAILURE, payload: { error } }),

    logout: (user) => ({ type: Types.LOGOUT, payload: { user } }),

    signup: (user) => ({ type: Types.SIGNUP, payload: { user } }),

    signupError: (error) => ({type: Types.SIGNUP_ERROR, payload: { error } }),

    addEvent: (block) => ({ type: Types.ADD_EVENT, payload: { block } })
}

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((user) => {
            firestore.collection('users').doc(user.uid).then((doc, user) => {
                    dispatch(ActionCreators.receiveLogin());
                }
            )
        }).catch((error) => {
            dispatch(ActionCreators.loginError(error));
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch(ActionCreators.logout());
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username
            })
        }).then(() => {
            dispatch(ActionCreators.signup());
        }).catch(error => {
            dispatch(ActionCreators.signupError(error));
        })
    }
}