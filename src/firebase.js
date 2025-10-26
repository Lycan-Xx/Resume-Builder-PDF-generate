// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your own Firebase configuration here
const firebaseConfig = {

  apiKey: "AIzaSyCe06vF_DLRp7lkX1YZUSB5sG0adqT70h0",
  authDomain: "resumeforge-a941c.firebaseapp.com",
  projectId: "resumeforge-a941c",
  storageBucket: "resumeforge-a941c.firebasestorage.app",
  messagingSenderId: "728271331853",
  appId: "1:728271331853:web:21306710dbe44eb994eb44",
  measurementId: "G-899KX3NP54"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      // You can handle the successful sign-in here
    })
    .catch((error) => {
      console.error(error);
      // You can handle errors here
    });
};
