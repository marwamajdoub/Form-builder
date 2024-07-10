<template>
    <div>
      <h2>Administration</h2>
      <div v-if="isAdmin">
        <button @click="addUser">Ajouter Utilisateur</button>
        <button @click="removeUser">Supprimer Utilisateur</button>
        <button @click="addTemplate">Ajouter Template</button>
        <button @click="removeTemplate">Supprimer Template</button>
      </div>
      <div v-else>
        <p>Accès refusé. Vous devez être un administrateur pour accéder à cette section.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['isAdmin']) // Utilisation des getters de Vuex pour vérifier le rôle de l'utilisateur
    },
    methods: {
      addUser() {
        // Logique pour ajouter un utilisateur
        console.log("Ajout d'un utilisateur");
      },
      removeUser() {
        // Logique pour supprimer un utilisateur
        console.log("Suppression d'un utilisateur");
      },
      addTemplate() {
        // Logique pour ajouter un template
        console.log("Ajout d'un template");
      },
      removeTemplate() {
        // Logique pour supprimer un template
        console.log("Suppression d'un template");
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez des styles ici si nécessaire */
  </style>
  