<template>
  <div class="home-container">
    <Sidebar :isAdmin="isAdmin" />
    <div class="content">
      <div class="view-mode-buttons">
        <button @click="toggleViewMode(true)" :class="{ active: isGridView }">Grille</button>
        <button @click="toggleViewMode(false)" :class="{ active: !isGridView }">Liste</button>
      </div>

      <!-- Formulaires -->
      <h2>Vos formulaires</h2>
      <div v-if="isGridView" class="form-grid">
        <div v-for="form in forms" :key="form.id" @click="previewForm(form.id)" class="form-card">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ form.name }}</h3>
            <p>{{ form.description }}</p>
            <ul>
              <li v-for="question in form.questions" :key="question.id">{{ question.text }}</li>
            </ul>
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
        <li v-for="form in forms" :key="form.id" @click="previewForm(form.id)" class="form-item">
          <i class="fas fa-file-alt"></i> {{ form.name }}
          <div class="form-item-actions">
            <i class="fas fa-copy" @click.stop="duplicateForm(form.id)"></i>
            <i class="fas fa-trash" @click.stop="deleteForm(form.id)"></i>
            <i class="fas fa-share" @click.stop="shareForm(form.id)"></i>
          </div>
        </li>
      </ul>

      <!-- Templates -->
      <h2>Templates</h2>
      <div v-if="isGridView" class="form-grid">
        <div v-for="template in templates" :key="template.id" @click="previewTemplate(template.id)" class="form-card template-card">
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
      </div>
      <ul v-else class="form-list">
        <li v-for="template in templates" :key="template.id" @click="previewTemplate(template.id)" class="form-item">
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
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default {
  components: {
    Sidebar
  },

  data() {
    return {
      forms: [],
      templates: [],
      isGridView: true,
      isAdmin: true // Mettez à false si l'utilisateur n'est pas admin
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
    getCoverImage(cover) {
      return `/assets/${cover}`;
    },
    duplicateForm(formId) {
      console.log(`Duplicate form ${formId}`);
    },
    deleteForm(formId) {
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce formulaire?");
      if (confirmed) {
        const formRef = doc(db, 'forms', formId);
        deleteDoc(formRef)
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
        const templateRef = doc(db, 'templates', templateId);
        deleteDoc(templateRef)
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
      const querySnapshot = await getDocs(collection(db, 'forms'));
      this.forms = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        description: doc.data().description || '',
        questions: doc.data().questions || []
      }));
    },
    async fetchTemplates() {
      const querySnapshot = await getDocs(collection(db, 'templates'));
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

.form-card,
.template-card {
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

.form-card:hover,
.template-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.form-card-icon,
.template-card-icon {
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
}

.form-card-content,
.template-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-card-content h3,
.template-card-content h3 {
  font-size: 18px;
  color: #333;
  text-align: center;
}

.form-card-actions,
.template-card-actions {
  margin-top: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.form-card-actions i,
.template-card-actions i {
  font-size: 20px;
  color: #007bff;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

.form-list {
  padding: 0;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.form-item:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.form-item i {
  margin-right: 10px;
}

.form-item-actions {
  margin-left: auto;
}

.new-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.new-form:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.new-form .form-card-icon {
  font-size: 40px;
  color: #007bff;
}

.new-form h3 {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}
</style>
