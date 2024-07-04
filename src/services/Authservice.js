// src/services/authService.js

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';

async function signUp(email, password, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Ajouter l'utilisateur à Firestore avec son rôle
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      role: role,
    });

    return user;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
}

export { signUp };
