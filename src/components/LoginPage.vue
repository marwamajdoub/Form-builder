<template>
  <div class="form-builder-section">
    <div class="auth-container">
      <div class="auth-form">
        <h2 class="title"><i class="fas fa-file-alt"></i> Form Builder</h2>
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
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Import the initialized auth and db instances
import { setDoc, doc } from 'firebase/firestore';

export default {
  data() {
    return {
      isLogin: true,
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.errorMessage = ''; // Clear error message when toggling mode
    },
    async handleSubmit() {
      try {
        if (this.isLogin) {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push('/home');
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
          
          // Add user to Firestore
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            uid: user.uid,
            createdAt: new Date()
          });

          this.$router.push('/home');
        }
      } catch (error) {
        this.errorMessage = this.isLogin
          ? 'Erreur de connexion : ' + error.message
          : 'Erreur de création du compte : ' + error.message;
        console.error('Error:', error);
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
  align-content: center;
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