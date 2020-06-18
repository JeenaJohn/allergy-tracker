import firebase from 'firebase';

 // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAhWVyi0Ab9gnbtvzVfY-HmfebbDoNpen0",
    authDomain: "allergytracker-64a69.firebaseapp.com",
    databaseURL: "https://allergytracker-64a69.firebaseio.com",
    projectId: "allergytracker-64a69",
    storageBucket: "allergytracker-64a69.appspot.com",
    messagingSenderId: "885493888818",
    appId: "1:885493888818:web:f94797bb2625213aad892b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;