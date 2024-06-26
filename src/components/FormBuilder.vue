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
              <button class="action-button" @click.prevent="editElement(index)">
                 <i class="fas fa-edit"></i> <!-- Icône pour éditer -->
              </button>

              <button  class="action-button" @click.prevent="duplicateElement(index)">
                <i class="fas fa-copy"></i> <!-- Icône pour dupliquer -->
              </button>

               <button  class="action-button" @click.prevent="deleteElement(index)">
               <i class="fas fa-trash-alt"></i> <!-- Icône pour supprimer -->
              </button>

            </div>
          </form>
        </div>
        <div class="fo-butt">
          <button class="form-button" @click="togglePreviewMode">Prévisualiser</button>
          <button class="form-button" @click="saveForm">Enregistrer </button>
        </div>
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
  background-color :#007bff ; /* Légère modification de couleur au survol */
}

.sidebar .element:last-child {
  margin-bottom: 0; /* Supprime le margin-bottom du dernier élément */
}
.form-header {
  margin-bottom: 30px; /* Augmentation de l'espacement en bas pour plus d'aération */
  border-bottom: 1px solid #ccc; /* Ajout d'une ligne de séparation en bas */
  padding-bottom: 15px; /* Espacement en bas pour la séparation */
}

.form-title {
  flex: 1; /* Pour occuper tout l'espace disponible */
}

.form-title label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px; /* Espacement entre le label et le champ */
  color: #2e86c1; /* Bleu légèrement plus foncé */
  font-size: 1.2em; /* Taille de police légèrement augmentée */
  transition: color 0.3s ease; /* Transition de couleur douce */
}

.form-title input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #b8c9dc; /* Bordure légèrement plus claire */
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Transition douce */
}

.form-title input[type="text"]:focus {
  border-color: #3071a9; /* Bleu plus foncé au focus */
  box-shadow: 0 0 8px rgba(48, 113, 169, 0.4); /* Légère ombre au focus */
}

/* Style pour la description du formulaire */
.form-description {
  flex: 2; /* Pour occuper un espace plus grand */
}

.form-description label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px; /* Espacement entre le label et le champ */
  color: #2e86c1; /* Bleu légèrement plus foncé */
  font-size: 1.2em; /* Taille de police légèrement augmentée */
  transition: color 0.3s ease; /* Transition de couleur douce */
}

.form-description textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #b8c9dc; /* Bordure légèrement plus claire */
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Transition douce */
}

.form-description textarea:focus {
  border-color: #3071a9; /* Bleu plus foncé au focus */
  box-shadow: 0 0 8px rgba(48, 113, 169, 0.4); /* Légère ombre au focus */
}

.form-container {
  flex: 1;
  padding: 20px;
  background-color: #f0f5f9; /* Couleur de fond */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre plus prononcée */
  transition: box-shadow 0.3s ease; /* Transition pour une légère animation */
}

.form-container:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Légère augmentation de l'ombre au survol */
}


.form-area {
  padding: 20px;
  border: 2px solid #1a5276; /* Bordure plus prononcée et bleu sombre */
  border-radius: 8px;
  background-color: #f0f5f9; /* Fond légèrement teinté */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Légère ombre pour la profondeur */
  transition: box-shadow 0.3s ease, border-color 0.3s ease; /* Transition pour une animation douce */
}

.form-area:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Ombre légèrement plus prononcée au survol */
  border-color: #2e86c1; /* Couleur de bordure plus claire au survol */
}


/* Style pour les champs de formulaire */
.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #b8c9dc;
  border-radius: 4px;
  font-size: 1em;
}


/* Style de base pour les boutons previsualiser et enrigistrer*/
.fo-butt {
  display: flex;
  gap: 10px; /* Espacement entre les boutons */
  justify-content: center; /* Centrer les boutons horizontalement */
  margin-top: 20px; /* Marge supérieure */
}

/* Style de base pour les boutons */
.form-button {
  padding: 12px 24px; /* Padding pour une taille confortable */
  background-color: #007bff; /* Bleu vif */
  color: #ffffff; /* Texte blanc */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Style au survol */
.form-button:hover {
  background-color: #0056b3; /* Bleu légèrement plus foncé au survol */
  transform: translateY(-2px); /* Légère élévation au survol */
}
.action-button {
    background-color: transparent;
    border: none;
    color: #007bff; /* Couleur de texte bleue */
    cursor: pointer;
    font-size: 1em;
    transition: color 0.3s ease;
    margin-right: 10px; /* Marge entre les boutons */
  }

  .action-button:hover {
    color: #0056b3; /* Couleur de texte bleue plus foncée au survol */
  }

  .action-button i {
    margin-right: 5px; /* Espace entre l'icône et le texte */
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
