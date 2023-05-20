
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';



const firebaseConfig = {
  apiKey: "AIzaSyBwTuawu9PYryoluN0Gm4t7p8CqALj40Uw",
  authDomain: "amzon-clone-17306.firebaseapp.com",
  projectId: "amzon-clone-17306",
  storageBucket: "amzon-clone-17306.appspot.com",
  messagingSenderId: "956081917195",
  appId: "1:956081917195:web:282349d91d3eacfa45a60e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = !firebaseConfig.apps.length ? initializeApp(firebaseConfig) : app();

// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;

