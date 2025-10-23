// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCNdLflk-M0JT4ZE7VmykzoS2iOWG5g4dU",
    authDomain: "greennest-indoor-plant-care.firebaseapp.com",
    projectId: "greennest-indoor-plant-care",
    storageBucket: "greennest-indoor-plant-care.firebasestorage.app",
    messagingSenderId: "565714166981",
    appId: "1:565714166981:web:ece37256e8a6e2b89abcac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Named export করো
export const auth = getAuth(app);
export default app; // optional, যদি অন্য কিছু দরকার হয়
