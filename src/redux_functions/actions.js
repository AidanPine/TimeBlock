import { Types } from './actionTypes';
import { actionTypes } from "redux-firestore";

const randomKey = (keyLength) => {
    const lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let key = "";

    while (key.length < keyLength) {
        let choice = Math.floor(Math.random() * 3);
        switch(choice) {
            case 0:
                key += lower[Math.floor(Math.random() * 26)];
                break;
            case 1:
                key += upper[Math.floor(Math.random() * 26)];
                break;
            case 2:
                key += nums[Math.floor(Math.random() * 10)];
                break;
            default:
                break;
        }
    }

    return key;
}

export const ActionCreators = {

    receiveLogin: (user) => ({ type: Types.LOGIN_SUCCESS, payload: { user } }),

    loginError: (error) => ({ type: Types.LOGIN_FAILURE, payload: { error } }),

    logout: (user) => ({ type: Types.LOGOUT, payload: { user } }),

    signup: (user) => ({ type: Types.SIGNUP, payload: { user } }),

    signupError: (error) => ({type: Types.SIGNUP_ERROR, payload: { error } }),

    addEvent: (block) => ({ type: Types.ADD_EVENT, payload: { block } }),

    editBlock: (block) => ({ type: Types.EDIT_BLOCK, payload: { block } }),

    deleteBlock: (blockID) => ({ type: Types.DELETE_BLOCK, payload: { blockID } }),

    clearBlocks: () => ({ type: Types.CLEAR_BLOCKS, payload: { } })
}

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((user) => {
            console.log(this.state);
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
        }).then(() => {
            dispatch(ActionCreators.clearBlocks());
            dispatch({ type: actionTypes.CLEAR_DATA })
            console.log(getState());
        });
    }
}

const initBlock = {
    name: 'default',
    length: 1,
    color: 0x00,
    date: 'now',
    startTime: 'now',
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return (
                firestore.collection('users').doc(response.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username
                }).then(firestore.collection('users').doc(response.user.uid).collection('blocks').add({
                        ...initBlock,
                    })))
        }).then(() => {
            dispatch(ActionCreators.signup());
        }).catch(error => {
            dispatch(ActionCreators.signupError(error));
        })
    }
}

export const addBlock = (newBlock) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        console.log(newBlock);
        const firebase = getFirebase();
        const firestore = getFirestore();

        const user =  firebase.auth().currentUser;
        if (user) {
            firestore.collection('users').doc(user.uid).collection('blocks').doc(newBlock.key).set(newBlock);
        }
        dispatch(ActionCreators.addEvent({
                ...newBlock,
            })
        );
        console.log(getState());
    }
}

export const editBlock = (block) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        const user = firebase.auth().currentUser;
        if (user) {
            firestore.collection('users').doc(user.uid).collection('blocks').doc(block.key).set({
                ...block,
            })
        }
        dispatch(ActionCreators.editBlock({
                ...block,
            })
        );
        console.log(getState());
    }
}

export const deleteBlock = (blockID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        const user = firebase.auth().currentUser;
        if (user) {
            firestore.collection('users').doc(user.uid).collection('blocks').doc(blockID).delete();
        }
        dispatch(ActionCreators.deleteBlock(blockID));
    }
}