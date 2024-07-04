// src/services/authService.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

async function signUp(email, password, role) {
  try {
    console.log('Tentative de création de l\'utilisateur avec email:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Utilisateur créé avec succès:', user);

    // Ajouter l'utilisateur à Firestore avec son rôle
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role,
    });
    console.log('Utilisateur ajouté à Firestore avec succès:', user);

    return user;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
}

export { signUp };
