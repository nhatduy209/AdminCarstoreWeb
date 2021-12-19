import { initializeApp } from "firebase/app";

// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
const firebaseConfig = {
  apiKey: "AIzaSyBkQ5om-Fr0ry2jkdr7Ae8Vj0hid7h0WXs",
  authDomain: "carsstoreproject-9c1c1.firebaseapp.com",
  databaseURL: "https://carsstoreproject-9c1c1-default-rtdb.firebaseio.com",
  projectId: "carsstoreproject-9c1c1",
  storageBucket: "carsstoreproject-9c1c1.appspot.com",
  messagingSenderId: "111011050447",
  appId: "1:111011050447:web:6b1dec34dfc6971b3ad8ba",
  measurementId: "G-03MF2E4GQP"
};

// Initialize Firebase
let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}