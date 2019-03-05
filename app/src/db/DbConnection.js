import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAjyUZhJcZOsMvYVPpcXkcnqzeePBGyBfE",
    authDomain: "react-v2-cd7a2.firebaseapp.com",
    databaseURL: "https://react-v2-cd7a2.firebaseio.com",
    projectId: "react-v2-cd7a2",
    storageBucket: "react-v2-cd7a2.appspot.com",
    messagingSenderId: "398344487317"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;