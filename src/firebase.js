// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-S8mxoeB1bAoMWC0NlI_DaePGZKxGxZI",
  authDomain: "post-it-9ca58.firebaseapp.com",
  projectId: "post-it-9ca58",
  storageBucket: "post-it-9ca58.appspot.com",
  messagingSenderId: "807886517730",
  appId: "1:807886517730:web:c2e44c120e1624b30eb5bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore(app);