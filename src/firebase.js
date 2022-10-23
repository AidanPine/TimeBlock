import React, { createContext, useEffect } from "react";
import firebaseConfig from "./firebaseConfig";
import app from 'firebase/app'
import 'firebase/database';
import { useDispatch } from 'react-redux';
import { ActionCreators } from "./actions";

const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({children}) => {
    let firebase = {
        app: null,
        database: null
    }

    const dispatch = useDispatch();

    if (!firebase.app.length) {
        app.initializeApp(firebaseConfig);
        firebase = {
            app: app,
            database: app.database(),

            api: {
                ActionCreators
            }

        }
    }


    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )
}