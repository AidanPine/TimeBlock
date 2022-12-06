import { Types } from './actionTypes';
import { actionTypes } from "redux-firestore";
import flags from "../data_functions/globals";
import { Action } from '@remix-run/router';

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
            if (flags.personalBlockFlag) {
                console.log(newBlock);
                firestore.collection('users').doc(user.uid).collection('blocks').doc(newBlock.key).set(newBlock);
            }
            else {
                firestore.collection('users').doc(user.uid).get().then((doc) => {
                    firestore.collection('team-calendars').doc(doc.data().calendar).collection('blocks').doc(newBlock.key).set(newBlock);
                })
            }
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
            if (flags.personalBlockFlag) {
                firestore.collection('users').doc(user.uid).collection('blocks').doc(block.key).set({
                    ...block,
                })
            }
            else {
                firestore.collection('users').doc(user.uid).get().then((doc) => {
                    firestore.collection('team-calendars').doc(doc.data().calendar).collection('blocks').doc(block.key).set(block);
                })
            }
        }
        dispatch(ActionCreators.editBlock({
                ...block,
            })
        );
    }
}

export const deleteBlock = (blockID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        const user = firebase.auth().currentUser;
        if (user) {
            if (flags.personalBlockFlag) {
                firestore.collection('users').doc(user.uid).collection('blocks').doc(blockID).delete();
            }
            else {
                firestore.collection('users').doc(user.uid).get().then((doc) => {
                    firestore.collection('team-calendars').doc(doc.data().calendar).collection('blocks').doc(blockID).delete();
                })
            }
        }
        dispatch(ActionCreators.deleteBlock(blockID));
    }
}

export const addCalendar = (calendar) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        if (user) {
            firestore.collection('users').doc(user.uid).collection('calendars').add(calendar).then((docRef) => {
                firestore.collection('team-calendars').doc(docRef.id).set(calendar);
                firestore.collection('team-calendars').doc(docRef.id).collection('users').doc(user.uid).set({name: 'user'});
            });
        }
    }
}

export const editCalendar = (calendar) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        if (user) {
            firestore.collection('users').doc(user.uid).collection('calendars').doc(calendar.id).set(calendar).then(() => {
                firestore.collection('team-calendars').doc(calendar.id).set(calendar);
            });
        }
    }
}

export const deleteCalendar = (calendarID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        if (user) {
            firestore.collection('users').doc(user.uid).collection('calendars').doc(calendarID).delete().then(() => {
               firestore.collection('team-calendars').doc(calendarID).delete();
            });
        }
    }
}

export const changeCalendar = (calendarID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        if (user) {
            flags.personalBlockFlag = calendarID ? 0 : 1;
            dispatch(ActionCreators.clearBlocks());
            firestore.collection('users').doc(user.uid).get().then((doc) => {
                firestore.collection('users').doc(user.uid).set({
                    ...doc.data(),
                    calendar: calendarID,
                })
            })

            let blocks = [];
            if (calendarID) {
                if (calendarID === 'merged') {

                    // get combination of blocks from all calendars and combine with personal calendar
                    // then turn personal calendar blocks grey
                    // in block component, if color is grey then you cant edit (always unchecked, never striked-through, no dragging, editing, deleting, etc)

                    firestore.collection('users').doc(user.uid).collection('blocks').get().then((col) => {
                        blocks = col.docs.map(doc => doc.data());
                        for (let block of blocks) {
                            block.color = 'grey';
                            block.name = "Anonymous Event";  // replace with display name (Evan's Event)
                            block.completed = false;
                            dispatch(ActionCreators.addEvent(block));
                        }
                        //console.log('Users blocks: ' + getState().blocks);
                    });

                    firestore.collection('team-calendars').get().then((querySnapshots) => {
                        let calBlocks = []
                        querySnapshots.forEach(doc => {
                            if (doc.data().id !== undefined) {
                                const calID = doc.data().id;
                                firestore.collection('team-calendars').doc(calID).collection('blocks').get().then((col) => {
                                    calBlocks = col.docs.map(doc => doc.data());
                                    for (let block of calBlocks) {
                                        dispatch(ActionCreators.addEvent(block));
                                    }
                                });
                            }
                        });
                    });
                } else {
                    firestore.collection('team-calendars').doc(calendarID).collection('blocks').get().then( (col) => {
                        blocks = col.docs.map(doc => doc.data());
                        for (let block of blocks) {
                            dispatch(ActionCreators.addEvent(block));
                        }
                        console.log(getState().blocks);
                    });
                }
            }
            else {
                firestore.collection('users').doc(user.uid).collection('blocks').get().then( (col) => {
                    blocks = col.docs.map(doc => doc.data());
                    for (let block of blocks) {
                        dispatch(ActionCreators.addEvent(block));
                    }
                    console.log(getState().blocks);
                });
            }
        }
    }
}