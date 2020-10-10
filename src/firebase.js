import firebase from "firebase";
import "firebase/analytics";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
