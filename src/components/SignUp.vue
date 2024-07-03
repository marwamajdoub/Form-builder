<template>
    <div class="auth-container">
      <div class="auth-form">
        <h2>Créer un compte</h2>
        <form @submit.prevent="handleSignUp">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Entrez votre email"
            />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <div class="form-group">
            <label for="name">Nom</label>
            <input
              type="text"
              id="name"
              v-model="name"
              required
              placeholder="Entrez votre nom"
            />
          </div>
          <button type="submit">Créer un compte</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { doc, setDoc } from 'firebase/firestore';
  import { auth, db } from '../firebaseConfig';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        name: ''
      };
    },
    methods: {
      async handleSignUp() {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
  
          // Ajoutez l'utilisateur à la collection Firestore avec un rôle
          await setDoc(doc(db, 'users', user.uid), {
            email: this.email,
            name: this.name,
            role: 'user', // Définissez le rôle ici (par défaut 'user')
            createdAt: new Date()
          });
  
          this.$router.push('/home');
        } catch (error) {
          console.error('Error:', error);
          alert('Erreur de création du compte');
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
  