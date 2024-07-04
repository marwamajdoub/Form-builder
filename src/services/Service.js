import { auth, db } from '../firebaseConfig';

// Fonction pour ajouter un utilisateur à Firestore
const addUserToFirestore = (uid, email) => {
  // Ajoutez ici les données supplémentaires que vous souhaitez stocker pour chaque utilisateur
  db.collection('users').doc(uid).set({
    email: email,
    role: 'user' // Par défaut, attribuez le rôle d'utilisateur
    // Ajoutez d'autres données personnalisées si nécessaire
  })
  .then(() => {
    console.log('Utilisateur ajouté à Firestore avec succès');
  })
  .catch((error) => {
    console.error('Erreur lors de l\'ajout de l\'utilisateur à Firestore:', error);
  });
};

// Exemple de création de compte utilisateur avec Firebase Auth
const createUserWithEmailAndPassword = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Accédez à l'utilisateur créé
      const user = userCredential.user;
      // Appelez la fonction pour ajouter l'utilisateur à Firestore
      addUserToFirestore(user.uid, user.email);
    })
    .catch((error) => {
      // Gestion des erreurs
      console.error('Erreur lors de la création de compte:', error);
    });
};

export { createUserWithEmailAndPassword };
