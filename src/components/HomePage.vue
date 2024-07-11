<template>
  <div class="home-container">
    <Sidebar :isAdmin="isAdmin" />
    <div class="content">
      <div class="view-mode-buttons">
        <button @click="toggleViewMode(true)" :class="{ active: isGridView }">Grille</button>
        <button @click="toggleViewMode(false)" :class="{ active: !isGridView }">Liste</button>
      </div>
      <h2>Vos formulaires</h2>
      <div v-if="isGridView" class="form-grid">
        <div class="form-card" v-for="form in forms" :key="form.id" @click="previewForm(form.id)">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ form.name }}</h3>
            <div class="form-card-actions">
              <i class="fas fa-copy" @click.stop="duplicateForm(form.id)"></i>
              <i class="fas fa-trash" @click.stop="deleteForm(form.id)"></i>
              <i class="fas fa-share" @click.stop="shareForm(form.id)"></i>
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
        <li class="form-item" v-for="form in forms" :key="form.id" @click="previewForm(form.id)">
          <i class="fas fa-file-alt"></i> {{ form.name }}
          <div class="form-item-actions">
            <i class="fas fa-copy" @click.stop="duplicateForm(form.id)"></i>
            <i class="fas fa-trash" @click.stop="deleteForm(form.id)"></i>
            <i class="fas fa-share" @click.stop="shareForm(form.id)"></i>
          </div>
        </li>
      </ul>
      <h2>Templates</h2>
      <div v-if="isGridView" class="form-grid">
        <div class="form-card" v-for="template in templates" :key="template.id" @click="previewTemplate(template.id)">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ template.name }}</h3>
            <div class="form-card-actions">
              <i class="fas fa-copy" @click.stop="duplicateTemplate(template.id)"></i>
              <i class="fas fa-trash" @click.stop="deleteTemplate(template.id)"></i>
              <i class="fas fa-share" @click.stop="shareTemplate(template.id)"></i>
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
        <li class="form-item" v-for="template in templates" :key="template.id" @click="previewTemplate(template.id)">
          <i class="fas fa-file-alt"></i> {{ template.name }}
          <div class="form-item-actions">
            <i class="fas fa-copy" @click.stop="duplicateTemplate(template.id)"></i>
            <i class="fas fa-trash" @click.stop="deleteTemplate(template.id)"></i>
            <i class="fas fa-share" @click.stop="shareTemplate(template.id)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Sidebar from './SideBar.vue';
import { db } from '../firebaseConfig';

import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';

const forms = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'forms'));
  querySnapshot.forEach((doc) => {
    forms.value.push({ id: doc.id, ...doc.data() });
  });
});
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      forms: [],
      templates: [],
      isGridView: true,
      isAdmin: true
    };
  },
  methods: {
    toggleViewMode(isGrid) {
      this.isGridView = isGrid;
    },
    goToFormBuilder() {
      this.$router.push({ name: 'FormBuilder' });
    },
    goToTemplateBuilder() {
      this.$router.push({ name: 'TemplateBuilder' });
    },
    previewForm(formId) {
      this.$router.push({ name: 'FormPreview', params: { id: formId } });
    },
    previewTemplate(templateId) {
      this.$router.push({ name: 'TemplatePreview', params: { id: templateId } });
    },
    shareForm(formId) {
      console.log(`Share form ${formId}`);
    },
    duplicateForm(formId) {
      console.log(`Duplicate form ${formId}`);
    },
    deleteForm(formId) {
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce formulaire?");
      if (confirmed) {
        db.collection('forms').doc(formId).delete()
          .then(() => {
            console.log("Formulaire supprimé avec succès");
            // Rafraîchir la liste des formulaires après la suppression
            this.fetchForms();
          })
          .catch(error => {
            console.error("Erreur lors de la suppression du formulaire:", error);
          });
      }
    },
    duplicateTemplate(templateId) {
      console.log(`Duplicate template ${templateId}`);
    },
    deleteTemplate(templateId) {
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce template?");
      if (confirmed) {
        db.collection('templates').doc(templateId).delete()
          .then(() => {
            console.log("Template supprimé avec succès");
            // Rafraîchir la liste des templates après la suppression
            this.fetchTemplates();
          })
          .catch(error => {
            console.error("Erreur lors de la suppression du template:", error);
          });
      }
    },
    shareTemplate(templateId) {
      console.log(`Share template ${templateId}`);
    },
    async fetchForms() {
      const formsCollection = collection(db, 'forms');
      const querySnapshot = await getDocs(formsCollection);
      this.forms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async fetchTemplates() {
      const templatesCollection = collection(db, 'templates');
      const querySnapshot = await getDocs(templatesCollection);
      this.templates = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  },
  created() {
    this.fetchForms();
    this.fetchTemplates();
  }
};
</script>

<style scoped>
/* Styles spécifiques pour HomePage */
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.form-item i {
  margin-right: 10px;
  color: #007bff;
}

.form-item-actions {
  display: flex;
  gap: 10px;
}

.form-item-actions i {
  cursor: pointer;
  font-size: 18px;
  color: #007bff;
  transition: color 0.3s ease;
}

.form-item-actions i:hover {
  color: #0056b3;
}
</style>
