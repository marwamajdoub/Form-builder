<template>
  <div class="home-container">
    <Sidebar :isAdmin="isAdmin" @navigate="handleNavigation" />
    <div class="content">
      <div class="view-mode-buttons">
        <button @click="toggleViewMode(true)" :class="{ active: isGridView }"> <i class="fas fa-th icon"></i></button>
        <button @click="toggleViewMode(false)" :class="{ active: !isGridView }"> <i class="fas fa-list icon"></i></button>
      </div>

      <!-- Formulaires -->
      <h2 v-if="view === 'AllForms'">Vos formulaires</h2>
      <div v-if="isGridView && view === 'AllForms'" class="form-grid">
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
      <ul v-else-if="view === 'AllForms'" class="form-list">
        <li v-for="form in forms" :key="form.id" @click="previewForm(form.id)" class="form-item">
          <i class="fas fa-file-alt"></i> {{ form.name }}
          <div class="form-item-actions">
            <i class="fas fa-copy" @click.stop="duplicateForm(form.id)"></i>
            <i class="fas fa-trash" @click.stop="deleteForm(form.id)"></i>
          </div>
        </li>
      </ul>

      <!-- Templates -->
      <h2 v-if="view === 'Templates'">Templates</h2>
      <div v-if="isGridView && view === 'Templates'" class="form-grid">
        <div v-for="template in templates" :key="template.id" @click="previewTemplate(template.id)" class="form-card template-card">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ template.name }}</h3>
            <div class="form-card-actions">
              <i class="fas fa-copy" @click.stop="duplicateTemplate(template.id)"></i>
              <i class="fas fa-trash" @click.stop="deleteTemplate(template.id)"></i>
            </div>
          </div>
        </div>
      </div>
      <ul v-else-if="view === 'Templates'" class="form-list">
        <li v-for="template in templates" :key="template.id" @click="previewTemplate(template.id)" class="form-item">
          <i class="fas fa-file-alt"></i> {{ template.name }}
          <div class="form-item-actions">
            <i class="fas fa-copy" @click.stop="duplicateTemplate(template.id)"></i>
            <i class="fas fa-trash" @click.stop="deleteTemplate(template.id)"></i>
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
      isAdmin: true, // Mettez à false si l'utilisateur n'est pas admin
      view: 'AllForms' // Ajout d'un état de vue pour gérer la navigation
    };
  },
  methods: {
    handleNavigation(view) {
      this.view = view;
    },
    toggleViewMode(isGrid) {
      this.isGridView = isGrid;
    },
    goToFormBuilder() {
      this.$router.push({ name: 'FormBuilder' });
    },
    previewForm(formId) {
      this.$router.push({ name: 'FormPreview', params: { id: formId } });
    },
    previewTemplate(templateId) {
      this.$router.push({ name: 'TemplatePreview', params: { id: templateId } });
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
    shareTemplate(templateId) {
      console.log(`Share template ${templateId}`);
    },
    duplicateTemplate(templateId) {
      console.log(`Duplicate template ${templateId}`);
    },
    deleteTemplate(templateId) {
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cette template?");
      if (confirmed) {
        const templateRef = doc(db, 'templates', templateId);
        deleteDoc(templateRef)
          .then(() => {
            console.log("Template supprimée avec succès");
            // Rafraîchir la liste des templates après la suppression
            this.fetchTemplates();
          })
          .catch(error => {
            console.error("Erreur lors de la suppression de la template:", error);
          });
      }
    },
    fetchForms() {
      const formsCollection = collection(db, 'forms');
      getDocs(formsCollection)
        .then(querySnapshot => {
          this.forms = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des formulaires:", error);
        });
    },
    fetchTemplates() {
      const templatesCollection = collection(db, 'templates');
      getDocs(templatesCollection)
        .then(querySnapshot => {
          this.templates = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des templates:", error);
        });
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.form-card,
.template-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  width: calc(33.33% - 20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.form-card:hover,
.template-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.form-card-icon {
  font-size: 50px;
  color: #007bff;
  margin-bottom: 20px;
}

.form-card-content h3 {
  margin: 0 0 10px;
}

.form-card-actions,
.form-item-actions {
  display: flex;
  gap: 10px;
}

.form-item-actions i,
.form-card-actions i {
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s ease;
}

.form-item-actions i:hover,
.form-card-actions i:hover {
  color: #0056b3;
}

.form-list {
  list-style: none;
  padding: 0;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.form-item:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>