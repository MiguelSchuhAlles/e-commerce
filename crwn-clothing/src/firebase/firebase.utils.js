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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;