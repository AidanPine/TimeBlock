import React from 'react';
import ReactDOM from 'react-dom/client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from "./firebase_functions/firebaseConfig";
import store from "./redux_functions/store";
import { ReactReduxFirebaseProvider , isLoaded} from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector} from 'react-redux';

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
        return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
              <AuthIsLoaded>
                <App />
              </AuthIsLoaded>
          </ReactReduxFirebaseProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
