import firebase from 'firebase';

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCckQtsCJXW3Hcoprw12_U8IaC7mEdoNQs",
  authDomain: "trackmyallergy.firebaseapp.com",
  databaseURL: "https://trackmyallergy.firebaseio.com",
  projectId: "trackmyallergy",
  storageBucket: "trackmyallergy.appspot.com",
  messagingSenderId: "1063371669384",
  appId: "1:1063371669384:web:34aec930c45560ecc1043d",
  measurementId: "G-8GNLQFJKC4"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;