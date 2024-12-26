// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"; // Import auth and providers

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhegugaRpRAHYUGBvKPYByVkm-1aDshI0",
  authDomain: "personal-finances-app-57187.firebaseapp.com",
  projectId: "personal-finances-app-57187",
  storageBucket: "personal-finances-app-57187.firebasestorage.app",
  messagingSenderId: "112885533141",
  appId: "1:112885533141:web:805358bbc076624827d55c",
  measurementId: "G-8EFXXQMK6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication

// Initialize the Google and Facebook providers for sign-in
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };