// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9EbmO-EPdQq0S13RE9NEC7A4HZnNpI6Y",
  authDomain: "demo3-895a5.firebaseapp.com",
  projectId: "demo3-895a5",
  storageBucket: "demo3-895a5.appspot.com",
  messagingSenderId: "370469745744",
  appId: "1:370469745744:web:96bc2310b74e334de38d55",
  measurementId: "G-HKZYLW3B69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);