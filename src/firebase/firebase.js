import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDDVFQ4P0x1OsH3dm0QZnkLp6ASp2jJwag",
    authDomain: "arsip-puisi.firebaseapp.com",
    projectId: "arsip-puisi",
    storageBucket: "arsip-puisi.firebasestorage.app",
    messagingSenderId: "931323324233",
    appId: "1:931323324233:web:549a76659b44a49dca1c98"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);