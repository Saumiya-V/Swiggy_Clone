import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCboVrUJKdwSIWJWYcKdOmKQVJ-SX1PvOw",
  authDomain: "swiggy-clone-a072e.firebaseapp.com",
  projectId: "swiggy-clone-a072e",
  storageBucket: "swiggy-clone-a072e.firebasestorage.app",
  messagingSenderId: "61252767491",
  appId: "1:61252767491:web:d6e8f0684ae17e1fa4e336"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

