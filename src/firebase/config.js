// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZARtA99zGU5z_g3_aFgiN3daoPZ9lPQ",
  authDomain: "twitter-f0cbe.firebaseapp.com",
  projectId: "twitter-f0cbe",
  storageBucket: "twitter-f0cbe.appspot.com",
  messagingSenderId: "389971160480",
  appId: "1:389971160480:web:2d86f64e6af132dde608c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth alanının referansını alma
export const auth = getAuth(app);

// Google sağlayıcı oluşruturma
export const provider = new GoogleAuthProvider();

// Veritabanının referansını alma 
export const db = getFirestore(app)

// medya depolama alanının referansını alma
export const storage = getStorage(app)