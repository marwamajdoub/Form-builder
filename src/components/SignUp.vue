<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>

  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth, db } from '../firebaseConfig'; // Assurez-vous d'importer 'auth' depuis firebaseConfig.js

  
  export default {
    data() {
      return {
        email: '',
        password: '',
        role: 'user'
      };
    },
    methods: {
      async handleSignUp() {
        try {
          const { email, password, role } = this;
          
          // Utilisez Firebase Authentication pour créer un nouvel utilisateur
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
  
          // Ajoutez l'utilisateur à la collection 'users' dans Firestore
          await db.collection('users').doc(user.uid).set({
            email: user.email,
            role: role,
          });
  
          // Redirigez l'utilisateur vers la page d'accueil après l'inscription réussie
          this.$router.push('/home');
        } catch (error) {
          console.error('Erreur lors de l\'inscription :', error.message);
        }
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
  