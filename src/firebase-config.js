import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB9U6k0vESWicAKAqoOizjJtwtiE4yFeck",
  authDomain: "chat-app-75f25.firebaseapp.com",
  projectId: "chat-app-75f25",
  storageBucket: "chat-app-75f25.appspot.com",
  messagingSenderId: "689697313540",
  appId: "1:689697313540:web:f7b8f05d79bf144f243651"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);