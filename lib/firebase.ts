// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpQmr2ZBkoGMOkCOCaubk_KbmviUaT65Y",
  authDomain: "skct-result.firebaseapp.com",
  projectId: "skct-result",
  storageBucket: "skct-result.appspot.com",
  messagingSenderId: "241545446470",
  appId: "1:241545446470:web:17bd5d2d937c6e27ce7647",
  measurementId: "G-7FGX6W6W8Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const storage = getStorage();