import firebase from "firebase";
import "firebase/analytics";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
if (process.env.NODE_ENV === 'production') {
    firebase.analytics();
  }


export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
