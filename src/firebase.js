import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCMT9OzConKPWDyokenR85vkcNWU_--dUQ",
    authDomain: "apitelegram-a92e5.firebaseapp.com",
    projectId: "apitelegram-a92e5",
    storageBucket: "apitelegram-a92e5.appspot.com",
    messagingSenderId: "436621843679",
    appId: "1:436621843679:web:75c3cc4a62b165163d5d6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);