<template>
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {{ currentUser.displayName }}</p>
  
      <!-- Exemple de fonctionnalité : gestion des utilisateurs -->
      <div v-if="users.length > 0">
        <h2>Users</h2>
        <ul>
          <li v-for="user in users" :key="user.uid">
            {{ user.displayName }} - {{ user.email }}
            <button @click="deleteUser(user.uid)">Delete</button>
          </li>
        </ul>
      </div>
  
      <!-- Autres fonctionnalités admin à ajouter ici -->
  
    </div>
  </template>
  
  <script>
  import firebase from '../firebaseConfig';
  
  export default {
    data() {
      return {
        currentUser: null,
        users: []
      };
    },
    created() {
      // Vérifier le rôle de l'utilisateur actuel
      const user = firebase.auth().currentUser;
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              this.currentUser = doc.data();
              if (this.currentUser.role !== 'admin') {
                this.$router.push('/home'); // Rediriger si l'utilisateur n'est pas admin
              }
            } else {
              console.error('No user document found');
              this.$router.push('/login');
            }
          }).catch((error) => {
            console.error('Error fetching user document:', error);
            this.$router.push('/login');
          });
  
        // Charger la liste des utilisateurs pour l'admin
        firebase.firestore().collection('users').get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.users.push(doc.data());
            });
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      } else {
        this.$router.push('/login');
      }
    },
    methods: {
      deleteUser(userId) {
        firebase.firestore().collection('users').doc(userId).delete()
          .then(() => {
            console.log('User successfully deleted');
            // Actualiser la liste des utilisateurs après suppression
            this.users = this.users.filter(user => user.uid !== userId);
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      }
      // Autres méthodes pour gérer les templates, les formulaires, etc.
    }
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques au composant */
  </style>
  