<!-- Sidebar.vue -->
<template>
    <aside class="sidebar">
      <ul>
        <li @click="goToFormBuilder"><i class="fas fa-plus"></i> Créer un nouveau formulaire</li>
        <li @click="viewAllForms"><i class="fas fa-list"></i> Voir tous les formulaires</li>
        <li @click="viewTemplates"><i class="fas fa-file-alt"></i> Voir les templates</li>
        <li @click="editForm"><i class="fas fa-edit"></i> Modifier un formulaire</li>
        <li @click="deleteForm"><i class="fas fa-trash"></i> Supprimer un formulaire</li>
        <li @click="duplicateForm"><i class="fas fa-copy"></i> Dupliquer un formulaire</li>
        <li @click="shareForm"><i class="fas fa-share"></i> Partager un formulaire</li>
        <li @click="viewResponses"><i class="fas fa-chart-bar"></i> Voir les réponses</li>
        <li @click="viewAnalytics"><i class="fas fa-chart-pie"></i> Voir les analyses</li>
        <li @click="formSettings"><i class="fas fa-cog"></i> Paramètres du formulaire</li>
        <li @click="exportResponses"><i class="fas fa-file-export"></i> Exporter les réponses</li>
        <li @click="templatesLibrary"><i class="fas fa-book"></i> Bibliothèque de templates</li>
        <li @click="importForm"><i class="fas fa-file-import"></i> Importer un formulaire</li>
        <li @click="collaborate"><i class="fas fa-users"></i> Collaborer</li>
        <li @click="formArchive"><i class="fas fa-archive"></i> Formulaires archivés</li>
      </ul>
    </aside>
  </template>
  
  <script>
  export default {
    methods: {
      goToFormBuilder() {
        this.$emit('navigate', { name: 'FormBuilder' });
      },
      viewAllForms() {
        this.$emit('adminAction', 'viewAllForms');
      },
      viewTemplates() {
        this.$emit('adminAction', 'viewTemplates');
      },
      editForm() {
        this.$emit('adminAction', 'editForm');
      },
      deleteForm() {
        this.$emit('adminAction', 'deleteForm');
      },
      duplicateForm() {
        this.$emit('adminAction', 'duplicateForm');
      },
      shareForm() {
        this.$emit('adminAction', 'shareForm');
      },
      viewResponses() {
        this.$emit('adminAction', 'viewResponses');
      },
      viewAnalytics() {
        this.$emit('adminAction', 'viewAnalytics');
      },
      formSettings() {
        this.$emit('adminAction', 'formSettings');
      },
      exportResponses() {
        this.$emit('adminAction', 'exportResponses');
      },
      templatesLibrary() {
        this.$emit('adminAction', 'templatesLibrary');
      },
      importForm() {
        this.$emit('adminAction', 'importForm');
      },
      collaborate() {
        this.$emit('adminAction', 'collaborate');
      },
      formArchive() {
        this.$emit('adminAction', 'formArchive');
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background-color: #f8f8f8;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .sidebar ul li:hover {
    background-color: #e0e0e0;
  }
  
  .sidebar ul li i {
    margin-right: 10px;
  }
  </style>
  