import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfkrcgW2Llp5DU1XsJOxsz2f8dFdT2sTI",
    authDomain: "notes-auth-fdebd.firebaseapp.com",
    projectId: "notes-auth-fdebd",
    storageBucket: "notes-auth-fdebd.appspot.com",
    messagingSenderId: "85732809352",
    appId: "1:85732809352:web:f12d328ced272b050f1d3d",
    measurementId: "G-NJJ69766F1"
  };


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();