import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user); // Successful sign-in
    return result.user; // Return user for navigation handling in the component
  } catch (error) {
    console.error(error);
    throw error; // Throw error to handle in the component
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Signed out successfully");
  } catch (error) {
    console.error(error);
  }
};

export { signInWithGoogle, logOut, auth };
