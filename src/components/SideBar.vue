<template>
    <div class="sidebar">
      <h2>Gestion des formulaires</h2>
      <ul>
        <li @click="goToFormBuilder"><i class="fas fa-plus"></i> Créer un nouveau formulaire</li>
        <li @click="viewAllForms"><i class="fas fa-list"></i> Voir tous les formulaires</li>
        <li @click="viewTemplates"><i class="fas fa-file-alt"></i> Voir les templates</li>
        <!-- Add more options as needed -->
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToFormBuilder() {
        this.$router.push({ name: 'FormBuilder' });
      },
      viewAllForms() {
        // Implement the logic to view all forms
      },
      viewTemplates() {
        // Implement the logic to view templates
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: #f8f9fa;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
  
  .sidebar h2 {
    margin-bottom: 20px;
    font-size: 18px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin: 10px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .sidebar ul li i {
    margin-right: 10px;
  }
  </style>
  