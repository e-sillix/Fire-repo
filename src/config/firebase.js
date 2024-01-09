import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKLj-UOAsFP0pCH9mMJ0ERlLMq3gYT0k0",
  authDomain: "firstfire-68f75.firebaseapp.com",
  projectId: "firstfire-68f75",
  storageBucket: "firstfire-68f75.appspot.com",
  messagingSenderId: "235167431274",
  appId: "1:235167431274:web:bad2090b475b546fc2a813",
  measurementId: "G-WRQ7NRB3SF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
