import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAuQoxiZ6Ffz-TiTqzT0Wt0HL-xQR4QPbw",
  authDomain: "crwn-db-acaf5.firebaseapp.com",
  databaseURL: "https://crwn-db-acaf5.firebaseio.com",
  projectId: "crwn-db-acaf5",
  storageBucket: "crwn-db-acaf5.appspot.com",
  messagingSenderId: "776296457619",
  appId: "1:776296457619:web:36ce7c40522b90ab577466",
  measurementId: "G-14QWF4ER8Q"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
