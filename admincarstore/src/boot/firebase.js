import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getStorage} from 'firebase/storage';

// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
const firebaseConfig = {
  apiKey: 'AIzaSyBkQ5om-Fr0ry2jkdr7Ae8Vj0hid7h0WXs',
  authDomain: 'carsstoreproject-9c1c1.firebaseapp.com',
  databaseURL: 'https://carsstoreproject-9c1c1-default-rtdb.firebaseio.com',
  projectId: 'carsstoreproject-9c1c1',
  storageBucket: 'carsstoreproject-9c1c1.appspot.com',
  messagingSenderId: '111011050447',
  appId: '1:111011050447:web:6b1dec34dfc6971b3ad8ba',
  measurementId: 'G-03MF2E4GQP',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);

// Initialize Firebase
