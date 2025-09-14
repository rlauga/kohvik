// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS0E0o0U8AvwQ8mE9HvNIt612fwlvpZdY",
  authDomain: "kohvik-rlauga.firebaseapp.com",
  projectId: "kohvik-rlauga",
  storageBucket: "kohvik-rlauga.firebasestorage.app",
  messagingSenderId: "326339333862",
  appId: "1:326339333862:web:5f2c7c90cb50610f31f527"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };