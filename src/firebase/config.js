import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBmMLY5n3WY43mlJEt6Ef_anck3hzq3S8Q",
  authDomain: "eshop-87704.firebaseapp.com",
  projectId: "eshop-87704",
  storageBucket: "eshop-87704.appspot.com",
  messagingSenderId: "380935965297",
  appId: "1:380935965297:web:27d0ad01226dc539fca9d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the Auth, Firestore, and Storage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
