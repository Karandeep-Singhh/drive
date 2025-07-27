import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD12FF2h44A2GDjzKKm6anwYnmAZrNE_bI",
  authDomain: "image-hub-61d08.firebaseapp.com",
  projectId: "image-hub-61d08",
  storageBucket: "image-hub-61d08.appspot.com",
  messagingSenderId: "648933924484",
  appId: "1:648933924484:web:35063409850d4e1115ecd1",
  measurementId: "G-X365DPRKT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)