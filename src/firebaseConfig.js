// Import the Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration (get this from your Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyBOYAOszkk5NPCVQ6Cc9FlSiLknaS5MqVc",
  authDomain: "form-builder-10fb0.firebaseapp.com",
  projectId: "form-builder-10fb0",
  storageBucket: "form-builder-10fb0.appspot.com",
  messagingSenderId: "282984567169",
  appId: "1:282984567169:web:827382d4fb09358beb9880"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
