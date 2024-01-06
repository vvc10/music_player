// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALw8UxOyC8K3Yo7A88Dt4QqVdJT_RHF7M",
  authDomain: "music-application-cbce2.firebaseapp.com",
  databaseURL: "https://music-application-cbce2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "music-application-cbce2",
  storageBucket: "music-application-cbce2.appspot.com",
  messagingSenderId: "102017998132",
  appId: "1:102017998132:web:30261ae8ce46a6ef085961",
  measurementId: "G-8KGDQDE42Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const database = getDatabase(app)
// const analytics = getAnalytics(app);
export { firestore}