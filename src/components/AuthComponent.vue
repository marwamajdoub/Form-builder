<template>
  <div class="form-builder-section">
    <div class="auth-container">
      <div class="auth-form">
        <h2 class="title"><i class="fas fa-file-alt"></i> Form Builder</h2>
        <h2>{{ isLogin ? 'Connexion' : 'Créer un compte' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group" v-if="!isLogin">
            <label for="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
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
          <div class="form-group" v-if="!isLogin">
            <label for="role">Rôle</label>
            <select id="role" v-model="role" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">{{ isLogin ? 'Se connecter' : 'Créer un compte' }}</button>
        </form>
        <p @click="toggleMode">
          {{ isLogin ? "Pas de compte ? Créer un compte" : "Déjà un compte ? Se connecter" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      isLogin: true,
      email: '',
      password: '',
      username: '',
      role: 'user'
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
    },
    async handleSubmit() {
      try {
        if (this.isLogin) {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push('/home');
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;

          // Ajouter l'utilisateur dans Firestore avec le rôle
          await setDoc(doc(db, 'users', user.uid), {
            name: this.username,
            email: this.email,
            role: this.role
          });

          this.$router.push('/home');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(this.isLogin ? 'Identifiants incorrects' : 'Erreur de création du compte');
      }
    }
  }
};
</script>

<style scoped>
.form-builder-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: white ;
}

.auth-container {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-form {
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input, select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

input:focus, select:focus {
  border-color: #2575fc;
  outline: none;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #2575fc;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #1e63d0;
}

p {
  margin-top: 20px;
  cursor: pointer;
  color: #2575fc;
}

p:hover {
  text-decoration: underline;
}
i , h2.title{
  color:#2575fc;
}
</style>
