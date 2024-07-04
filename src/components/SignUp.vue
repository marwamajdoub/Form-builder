<template>
    <div>
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSignUp">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <select v-model="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import { signUp } from '../services/authService';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        role: 'user', // Par défaut, tous les nouveaux utilisateurs sont des utilisateurs normaux
      };
    },
    methods: {
      async handleSignUp() {
        try {
          await signUp(this.email, this.password, this.role);
          alert('Utilisateur créé avec succès !');
          this.$router.push('/login'); // Redirigez l'utilisateur vers la page de connexion après l'inscription
        } catch (error) {
          alert('Erreur lors de la création de l\'utilisateur : ' + error.message);
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
  