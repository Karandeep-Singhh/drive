import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = process.env.NEXT_PUBLIC_APP_ENV === "production" ? {
  apiKey: "AIzaSyD12FF2h44A2GDjzKKm6anwYnmAZrNE_bI",
  authDomain: "image-hub-61d08.firebaseapp.com",
  projectId: "image-hub-61d08",
  storageBucket: "image-hub-61d08.appspot.com",
  messagingSenderId: "648933924484",
  appId: "1:648933924484:web:35063409850d4e1115ecd1",
  measurementId: "G-X365DPRKT3"
} :  {
  apiKey: "AIzaSyB-UqOh-128C3bc6_cPBoP9brYd23nI_E4",
  authDomain: "lithe-realm-383115.firebaseapp.com",
  databaseURL: "https://lithe-realm-383115-default-rtdb.firebaseio.com",
  projectId: "lithe-realm-383115",
  storageBucket: "lithe-realm-383115.firebasestorage.app",
  messagingSenderId: "373614163818",
  appId: "1:373614163818:web:6cea2298902ba60025d713",
  measurementId: "G-JPJN6B0C42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)