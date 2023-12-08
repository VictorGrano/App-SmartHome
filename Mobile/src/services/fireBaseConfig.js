import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWWElDqJCwdB7CLt-xPNqKa68a1nH4KEA",
  authDomain: "projeto-tcc-c1c1f.firebaseapp.com",
  projectId: "projeto-tcc-c1c1f",
  storageBucket: "projeto-tcc-c1c1f.appspot.com",
  messagingSenderId: "181454005571",
  appId: "1:181454005571:web:af9b64bbca828fded0bbf6",
  measurementId: "G-QMX4SFNE79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const database = getFirestore();