<template>
    <div class="auth-container">
      <div class="auth-form">
        <h2>{{ isLogin ? 'Connexion' : 'Créer un compte' }}</h2>
        <form @submit.prevent="handleSubmit">
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
          <button type="submit">{{ isLogin ? 'Se connecter' : 'Créer un compte' }}</button>
        </form>
        <p @click="toggleMode">
          {{ isLogin ? "Pas de compte ? Créer un compte" : "Déjà un compte ? Se connecter" }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLogin: true,
        email: '',
        password: ''
      };
    },
    methods: {
      toggleMode() {
        this.isLogin = !this.isLogin;
      },
      handleSubmit() {
        if (this.isLogin) {
          // Log in logic here
        } else {
          // Sign up logic here
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
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
  </style>
  