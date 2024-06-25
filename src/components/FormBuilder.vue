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
              <input
                type="text"
                v-model="field.question"
                placeholder="Entrez la question"
              />
              <label :for="'field-' + index">{{ field.label }}</label>
              <component
                :is="field.type"
                v-bind="field.props"
                :id="'field-' + index"
              ></component>

              <!-- Handling options for specific field types -->
              <div v-if="field.type === 'checkbox-group' || field.type === 'radio-group' || field.type === 'dropdown'">
                <label>Options:</label>
                <div v-for="(option, optIndex) in field.props.options" :key="optIndex">
                  <input type="text" v-model="field.props.options[optIndex]" placeholder="Option">
                  <button @click.prevent="removeOption(field, optIndex)">Supprimer</button>
                </div>
                <button @click.prevent="addOption(field)">Ajouter une option</button>
              </div>

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
              <label :for="'field-' + index">{{ field.question }}</label>
              <component :is="field.type" v-bind="field.props" :id="'field-' + index"></component>
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
        { type: 'text-input', label: 'Réponse courte' },
        { type: 'paragraph-input', label: 'Paragraphe' },
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
      const newElement = {
        type: element.type,
        label: element.label,
        question: '', // Initialize question for the element
        props: {
          placeholder: `Entrez ${element.label.toLowerCase()}`
        }
      };
      if (element.type === 'checkbox-group' || element.type === 'radio-group' || element.type === 'dropdown') {
        newElement.props.options = ['']; // Initialize options array if needed
      }
      this.formFields.push(newElement);
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
    // Add an option to the field
    addOption(field) {
      if (!field.props.options) {
        this.$set(field.props, 'options', ['']);
      } else {
        field.props.options.push('');
      }
    },
    // Remove an option from the field
    removeOption(field, index) {
      field.props.options.splice(index, 1);
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
  width: 240px; /* Légèrement augmenté pour plus d'espace */
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre légère */
}

.sidebar .element {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Légère ombre sous chaque élément */
}

.sidebar .element:hover {
  background-color: #e0e0e0; /* Légère modification de couleur au survol */
}

.sidebar .element:last-child {
  margin-bottom: 0; /* Supprime le margin-bottom du dernier élément */
}
.form-header {
  margin-bottom: 30px; /* Augmentation de l'espacement en bas pour plus d'aération */
  border-bottom: 1px solid #ccc; /* Ajout d'une ligne de séparation en bas */
  padding-bottom: 15px; /* Espacement en bas pour la séparation */
}

.form-title, .form-description {
  margin-bottom: 15px; /* Espacement entre les titres et les champs */
}

.form-title label, .form-description label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px; /* Espacement entre les labels et les champs */
}

.form-title input[type="text"],
.form-description textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease; /* Transition pour un changement en douceur */
}

.form-title input[type="text"]:focus,
.form-description textarea:focus {
  border-color: #007bff; /* Couleur de bordure au focus */
  outline: none; /* Suppression de l'outline par défaut */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Légère ombre au focus */
}

.form-container {
  flex: 1;
  padding: 20px;
}

.preview-container {
  margin-top: 20px;
}



.form-area {
  padding: 20px;
  border: 1px solid #ccc;
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
