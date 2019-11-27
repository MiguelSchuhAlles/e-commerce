import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBrVC2CI34P06-2emY9fQLBYDKKmavYA5U",
    authDomain: "crwn-db-c3e09.firebaseapp.com",
    databaseURL: "https://crwn-db-c3e09.firebaseio.com",
    projectId: "crwn-db-c3e09",
    storageBucket: "crwn-db-c3e09.appspot.com",
    messagingSenderId: "192629575394",
    appId: "1:192629575394:web:5aaf421b5f6f2d8dbc58bb",
    measurementId: "G-Z6FK0J06DL"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;