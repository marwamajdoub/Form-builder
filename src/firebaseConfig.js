// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOYAOszkk5NPCVQ6Cc9FlSiLknaS5MqVc",
  authDomain: "form-builder-10fb0.firebaseapp.com",
  projectId: "form-builder-10fb0",
  storageBucket: "form-builder-10fb0.appspot.com",
  messagingSenderId: "282984567169",
  appId: "1:282984567169:web:827382d4fb09358beb9880"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
