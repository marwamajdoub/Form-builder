<template>
  <div class="home-container">
    <!-- Composant Sidebar pour la gestion -->
    <Sidebar :isAdmin="isAdmin" />

    <!-- Contenu principal -->
    <div class="content">
      <!-- Boutons pour basculer entre la vue grille et liste -->
      <div class="view-mode-buttons">
        <button @click="toggleViewMode(true)" :class="{ active: isGridView }"> Grille</button>
        <button @click="toggleViewMode(false)" :class="{ active: !isGridView }">Liste</button>
      </div>
      
      <!-- Section pour afficher les formulaires -->
      <h2>Vos formulaires</h2>
      <div v-if="isGridView" class="form-grid">
        <div class="form-card" v-for="form in forms" :key="form.id" @click="editForm(form.id)">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ form.name }}</h3>
            <div class="form-card-actions">
              <i class="fas fa-copy" @click="duplicateForm(form.id)"></i>
              <i class="fas fa-trash" @click="deleteForm(form.id)"></i>
              <i class="fas fa-share" @click="shareForm(form.id)"></i>
            </div>
          </div>
        </div>
        <div class="form-card new-form" @click="goToFormBuilder">
          <div class="form-card-icon">
            <i class="fas fa-plus"></i>
          </div>
          <div class="form-card-content">
            <h3>Créer un nouveau formulaire</h3>
          </div>
        </div>
      </div>
      <ul v-else class="form-list">
        <li class="form-item" v-for="form in forms" :key="form.id" @click="editForm(form.id)">
          <i class="fas fa-file-alt"></i> {{ form.name }}
          <div class="form-item-actions">
            <i class="fas fa-copy" @click="duplicateForm(form.id)"></i>
            <i class="fas fa-trash" @click="deleteForm(form.id)"></i>
            <i class="fas fa-share" @click="shareForm(form.id)"></i>
          </div>
        </li>
      </ul>

      <!-- Section pour afficher les templates -->
      <h2>Templates</h2>
      <div v-if="isGridView" class="form-grid">
        <div class="form-card" v-for="template in templates" :key="template.id" @click="editTemplate(template.id)">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ template.name }}</h3>
            <div class="form-card-actions">
              <i class="fas fa-copy" @click="duplicateTemplate(template.id)"></i>
              <i class="fas fa-trash" @click="deleteTemplate(template.id)"></i>
              <i class="fas fa-share" @click="shareTemplate(template.id)"></i>
            </div>
          </div>
        </div>
        <div class="form-card new-form" @click="goToTemplateBuilder">
          <div class="form-card-icon">
            <i class="fas fa-plus"></i>
          </div>
          <div class="form-card-content">
            <h3>Ajouter template</h3>
          </div>
        </div>
      </div>
      <ul v-else class="form-list">
        <li class="form-item" v-for="template in templates" :key="template.id" @click="editTemplate(template.id)">
          <i class="fas fa-file-alt"></i> {{ template.name }}
          <div class="form-item-actions">
            <i class="fas fa-copy" @click="duplicateTemplate(template.id)"></i>
            <i class="fas fa-trash" @click="deleteTemplate(template.id)"></i>
            <i class="fas fa-share" @click="shareTemplate(template.id)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Sidebar from './SideBar.vue'; // Importez votre composant Sidebar ici

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      forms: [], // Tableau pour stocker les formulaires
      templates: [], // Tableau pour stocker les templates
      isGridView: true, // Indicateur pour le mode d'affichage (grille ou liste)
      isAdmin: true // Indicateur pour le mode administrateur (user ou admin)
    };
  },
  methods: {
    // Méthode pour basculer entre la vue grille et liste
    toggleViewMode(isGrid) {
      this.isGridView = isGrid;
    },
    // Méthode pour naviguer vers le FormBuilder
    goToFormBuilder() {
      this.$router.push({ name: 'FormBuilder' });
    },
    // Méthode pour naviguer vers le TemplateBuilder
    goToTemplateBuilder() {
      this.$router.push({ name: 'TemplateBuilder' });
    },
    // Méthode pour éditer un formulaire
    editForm(formId) {
      console.log(`Edit form ${formId}`);
      // Ajoutez ici votre logique d'édition de formulaire
    },
    // Méthode pour dupliquer un formulaire
    duplicateForm(formId) {
      console.log(`Duplicate form ${formId}`);
      // Ajoutez ici votre logique de duplication de formulaire
    },
    // Méthode pour supprimer un formulaire
    deleteForm(formId) {
      console.log(`Delete form ${formId}`);
      // Ajoutez ici votre logique de suppression de formulaire
    },
    // Méthode pour partager un formulaire
    shareForm(formId) {
      console.log(`Share form ${formId}`);
      // Ajoutez ici votre logique de partage de formulaire
    },
    // Méthode pour éditer un template
    editTemplate(templateId) {
      console.log(`Edit template ${templateId}`);
      // Ajoutez ici votre logique d'édition de template
    },
    // Méthode pour dupliquer un template
    duplicateTemplate(templateId) {
      console.log(`Duplicate template ${templateId}`);
      // Ajoutez ici votre logique de duplication de template
    },
    // Méthode pour supprimer un template
    deleteTemplate(templateId) {
      console.log(`Delete template ${templateId}`);
      // Ajoutez ici votre logique de suppression de template
    },
    // Méthode pour partager un template
    shareTemplate(templateId) {
      console.log(`Share template ${templateId}`);
      // Ajoutez ici votre logique de partage de template
    }
  },
  created() {
    // Exemple de données fictives pour les formulaires et les templates
    this.forms = [
      { id: 1, name: 'Formulaire 1' },
      { id: 2, name: 'Formulaire 2' }
    ];
    this.templates = [
      { id: 1, name: 'Template 1' },
      { id: 2, name: 'Template 2' }
    ];
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}

.view-mode-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.view-mode-buttons button {
  padding: 10px;
  cursor: pointer;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.view-mode-buttons button:hover {
  background-color: #0056b3;
}

.view-mode-buttons .active {
  background-color: #0056b3;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.form-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.form-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.form-card-icon {
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
}

.form-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-card-content h3 {
  font-size: 18px;
  color: #333;
  text-align: center;
}

.form-card-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.form-card-actions i {
  cursor: pointer;
  font-size: 18px;
  color: #007bff;
  transition: color 0.3s ease;
}

.form-card-actions i:hover {
  color: #0056b3;
}



.new-form {
  background-color: #f1f1f1;
  border: 2px dashed #007bff;
}

.form-list {
  list-style: none;
  padding: 0;
}

.form-item {
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s;
}

.form-item:hover {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.form-item i {
  margin-right: 10px;
}

.form-item:hover i {
  color: white;
}
</style>
