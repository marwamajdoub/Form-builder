<template>
  <div class="form-builder">
    <!-- Sidebar for selecting elements -->
    <div class="sidebar">
      <div
        class="element"
        v-for="(element, index) in formElements"
        :key="index"
        @click="addElementToForm(element)"
      >
        {{ element.label }}
      </div>
    </div>

    <!-- Main form container -->
    <div class="form-container">
      <!-- Form header for title and description -->
      <div class="form-header">
        <div class="form-title">
          <label for="form-title">Titre du formulaire :</label>
          <input
            id="form-title"
            type="text"
            v-model="formTitle"
            placeholder="Entrez le titre du formulaire"
          />
        </div>
        <div class="form-description">
          <label for="form-description">Description du formulaire :</label>
          <textarea
            id="form-description"
            v-model="formDescription"
            placeholder="Entrez la description du formulaire"
          ></textarea>
        </div>
      </div>

      <!-- Form area for adding elements and previewing -->
      <div class="form-area" v-if="!previewMode">
        <h2>Création du formulaire</h2>
        <div class="drop-area">
          <!-- Form fields dynamically generated -->
          <form>
            <div
              v-for="(field, index) in formFields"
              :key="index"
              :class="getFieldClass(field.type)"
            >
              <component :is="field.type" v-bind="field.props"></component>
              <button @click.prevent="editElement(index)">Éditer</button>
              <button @click.prevent="duplicateElement(index)">Dupliquer</button>
              <button @click.prevent="deleteElement(index)">Supprimer</button>
            </div>
          </form>
        </div>
        <button @click="togglePreviewMode">Prévisualiser</button>
        <button @click="saveForm">Enregistrer le formulaire</button>
      </div>

      <!-- Preview mode -->
      <div class="preview-container" v-else>
        <h2>Aperçu du formulaire</h2>
        <div class="form-preview">
          <form>
            <div v-for="(field, index) in formFields" :key="index">
              <component :is="field.type" v-bind="field.props"></component>
            </div>
          </form>
        </div>
        <button @click="togglePreviewMode">Revenir à l'édition</button>
      </div>

      <!-- Element editor modal -->
      <div class="element-editor" v-if="selectedElement !== null">
        <h2>Édition de l'élément</h2>
        <!-- Include an editor for the selected element here -->
        <button @click="closeElementEditor">Fermer</button>
      </div>

      <!-- Form management interface -->
      <div class="form-management">
        <h2>Gestion des Formulaires</h2>
        <ul class="form-list">
          <li v-for="(form, index) in savedForms" :key="index">
            <h3>{{ form.title }}</h3>
            <p>{{ form.description }}</p>
            <button @click="loadForm(index)">Charger</button>
            <button @click="deleteForm(index)">Supprimer</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formTitle: '',
      formDescription: '',
      previewMode: false,
      selectedElement: null,
      formElements: [
        { type: 'text-input', label: 'Champ texte court' },
        { type: 'paragraph-input', label: 'Champ paragraphe' },
        { type: 'checkbox-group', label: 'Cases à cocher' },
        { type: 'radio-group', label: 'Boutons radio' },
        { type: 'dropdown', label: 'Menu déroulant' },
        { type: 'date-picker', label: 'Date' },
        { type: 'time-picker', label: 'Heure' },
        { type: 'file-upload', label: 'Téléchargement de fichier' }
      ],
      formFields: [], // Array to store form fields
      savedForms: [] // Array to store saved forms
    };
  },
  methods: {
    // Handle click event to add element to form
    addElementToForm(element) {
      this.formFields.push({ type: element.type, props: {} });
    },
    // Edit selected element
    editElement(index) {
      this.selectedElement = index;
      // Implement editing functionality
    },
    // Duplicate selected element
    duplicateElement(index) {
      const elementToDuplicate = { ...this.formFields[index] };
      this.formFields.splice(index + 1, 0, elementToDuplicate);
    },
    // Delete selected element
    deleteElement(index) {
      this.formFields.splice(index, 1);
      this.selectedElement = null; // Clear selected element after deletion
    },
    // Toggle preview mode
    togglePreviewMode() {
      this.previewMode = !this.previewMode;
    },
    // Close element editor
    closeElementEditor() {
      this.selectedElement = null;
      // Implement functionality to close element editor
    },
    // Save the current form
    saveForm() {
      const formToSave = {
        title: this.formTitle,
        description: this.formDescription,
        fields: [...this.formFields]
      };
      this.savedForms.push(formToSave);
      // Optionally, you can save this form to a backend or localStorage
      // Reset form title, description, and fields after saving
      this.formTitle = '';
      this.formDescription = '';
      this.formFields = [];
    },
    // Load a form from saved forms
    loadForm(index) {
      const formToLoad = this.savedForms[index];
      this.formTitle = formToLoad.title;
      this.formDescription = formToLoad.description;
      this.formFields = [...formToLoad.fields];
      this.previewMode = false; // Exit preview mode after loading
    },
    // Delete a form from saved forms
    deleteForm(index) {
      this.savedForms.splice(index, 1);
    },
    // Get CSS class based on field type
    getFieldClass(type) {
      return `form-field-${type}`;
    }
  }
};
</script>
<style scoped>
.form-builder {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
}

.form-container {
  flex: 1;
  padding: 20px;
}

.preview-container {
  margin-top: 20px;
}

.form-header {
  margin-bottom: 20px;
}

.form-area {
  padding: 20px;
  border: 1px solid #ccc;
}

.element {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
textarea,
select,
input[type="date"],
input[type="time"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Additional styles for form preview */
.form-preview {
  padding: 20px;
  border: 1px solid #ccc;
}

/* Styles for form fields based on type */
.form-field-text-input {
  margin-bottom: 10px;
}

.form-field-paragraph-input {
  margin-bottom: 10px;
}

.form-field-checkbox-group {
  margin-bottom: 10px;
}

.form-field-radio-group {
  margin-bottom: 10px;
}

.form-field-dropdown {
  margin-bottom: 10px;
}

.form-field-date-picker {
  margin-bottom: 10px;
}

.form-field-time-picker {
  margin-bottom: 10px;
}

.form-field-file-upload {
  margin-bottom: 10px;
}

/* Styles for form management */
.form-management {
  margin-top: 20px;
}

.form-list {
  list-style-type: none;
  padding: 0;
}

.form-list li {
  margin-bottom: 20px;
}

.form-list h3 {
  margin-bottom: 10px;
}
</style>

