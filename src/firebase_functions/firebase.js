import React, { createContext, useEffect } from "react";
import firebaseConfig from "./firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = firebase.firestore();
export const db = baseDb;