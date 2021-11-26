import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyASjWJX2BOGXVspaurLpPuAihINaMmfG1Q",
    authDomain: "classroom-3be27.firebaseapp.com",
    projectId: "classroom-3be27",
    storageBucket: "classroom-3be27.appspot.com",
    messagingSenderId: "717361498733",
    appId: "1:717361498733:web:9d78effa3f9b70e9f2cd64",
    measurementId: "G-C477SFX315"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;