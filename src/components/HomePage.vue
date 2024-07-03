<template>
  <div class="home-container">
    <Sidebar :isAdmin="isAdmin" />
    <div class="content">
      <div class="view-mode-buttons">
        <button @click="toggleViewMode" :class="{ active: isGridView }"> Grille</button>
        <button @click="toggleViewMode" :class="{ active: !isGridView }">Liste</button>
      </div>
      
      <h2>Vos formulaires</h2>
      <div v-if="isGridView" class="form-grid">
        <div class="form-card" v-for="form in forms" :key="form.id">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ form.name }}</h3>
            <div class="form-card-actions">
              <i class="fas fa-edit" @click="editForm(form.id)"></i>
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
        <li class="form-item" v-for="form in forms" :key="form.id">
          <i class="fas fa-file-alt"></i> {{ form.name }}
          <div class="form-item-actions">
            <i class="fas fa-edit" @click="editForm(form.id)"></i>
            <i class="fas fa-copy" @click="duplicateForm(form.id)"></i>
            <i class="fas fa-trash" @click="deleteForm(form.id)"></i>
            <i class="fas fa-share" @click="shareForm(form.id)"></i>
          </div>
        </li>
      </ul>

      <h2>Templates</h2>
      <div v-if="isGridView" class="form-grid">
        <div class="form-card" v-for="template in templates" :key="template.id">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ template.name }}</h3>
            <div class="form-card-actions">
              <i class="fas fa-edit" @click="editTemplate(template.id)"></i>
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
        <li class="form-item" v-for="template in templates" :key="template.id">
          <i class="fas fa-file-alt"></i> {{ template.name }}
          <div class="form-item-actions">
            <i class="fas fa-edit" @click="editTemplate(template.id)"></i>
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
import Sidebar from './SideBar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      forms: [],
      templates: [],
      isGridView: true,
      isAdmin: true // Toggle this to switch between admin and user modes
    };
  },
  methods: {
    toggleViewMode() {
      this.isGridView = !this.isGridView;
    },
    goToFormBuilder() {
      this.$router.push({ name: 'FormBuilder' }); // Naviguer vers FormBuilder
    },
    goToTemplateBuilder() {
      this.$router.push({ name: 'TemplateBuilder' }); // Naviguer vers TemplateBuilder
    },
    editForm(formId) {
      console.log(`Edit form ${formId}`);
      // Add your form editing logic here
    },
    duplicateForm(formId) {
      console.log(`Duplicate form ${formId}`);
      // Add your form duplication logic here
    },
    deleteForm(formId) {
      console.log(`Delete form ${formId}`);
      // Add your form deletion logic here
    },
    shareForm(formId) {
      console.log(`Share form ${formId}`);
      // Add your form sharing logic here
    },
    editTemplate(templateId) {
      console.log(`Edit template ${templateId}`);
      // Add your template editing logic here
    },
    duplicateTemplate(templateId) {
      console.log(`Duplicate template ${templateId}`);
      // Add your template duplication logic here
    },
    deleteTemplate(templateId) {
      console.log(`Delete template ${templateId}`);
      // Add your template deletion logic here
    },
    shareTemplate(templateId) {
      console.log(`Share template ${templateId}`);
      // Add your template sharing logic here
    }
  },
  created() {
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
/* Styles spécifiques au composant HomePage */
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
