<template>
    <div>
      <h2>Inscription</h2>
  
      <!-- Exemple d'utilisation de ref avec un champ de saisie -->
      <input type="text" v-model="usernameRef" placeholder="Nom d'utilisateur">
  
      <button @click="register">S'inscrire</button>
    </div>
  </template>
  
  <script>
   import { createUserWithEmailAndPassword } from '../services/Service';

   export default {
   // Autres options de composant
   methods: {
    register() {
      const email = this.email; // Supposons que vous avez bindé l'email avec v-model
      const password = this.password; // Supposons que vous avez bindé le mot de passe avec v-model

      // Appeler la fonction pour créer un compte utilisateur avec Firebase
      createUserWithEmailAndPassword(email, password);
    }
  }
};
</script>
  
  <style scoped>
  .form-builder-section {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-builder-section h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .form-builder-section i {
    font-size: 28px;
    margin-right: 10px;
  }
  
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; /* Adjust height as needed */
  }
  
  .auth-form {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  .auth-form h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  p {
    margin-top: 10px;
    cursor: pointer;
    color: #007bff;
  }
  
  .title {
    color: #007bff;
  }
  </style>
  