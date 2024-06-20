<template>
  <div class="form-builder">
    <div class="sidebar">
      <div
        class="element"
        v-for="(element, index) in formElements"
        :key="index"
        @dragstart="onDragStart(element, $event)"
        draggable="true"
      >
        {{ element.label }}
      </div>
    </div>
    <div class="form-container">
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
        <div>
          <label for="form-description">Description du formulaire :</label>
          <textarea
            id="form-description"
            v-model="formDescription"
            placeholder="Entrez la description du formulaire"
          ></textarea>
        </div>
      </div>
      <div class="form-area" v-if="!previewMode">
        <h2>Création du formulaire</h2>
        <div
          class="drop-area"
          @drop="onDrop"
          @dragover.prevent
        >
          <form>
            <div v-for="(field, index) in formFields" :key="index">
              <component :is="field.type" v-bind="field.props"></component>
              <button @click="editElement(index)">Éditer</button>
              <button @click="duplicateElement(index)">Dupliquer</button>
              <button @click="deleteElement(index)">Supprimer</button>
            </div>
          </form>
        </div>
        <button @click="togglePreviewMode">Prévisualiser</button>
      </div>

      
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

      <div class="element-editor" v-if="selectedElement !== null">
        <h2>Édition de l'élément</h2>
        
        <button @click="closeElementEditor">Fermer</button>
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

      formFields: []
    };
  },
  methods: {
    onDragStart(element, event) {
      event.dataTransfer.setData('text/plain', element.type);
    },
    onDrop(event) {
      const elementType = event.dataTransfer.getData('text/plain');
      this.formFields.push({ type: elementType, props: {} });
    },
    editElement(index) {
      this.selectedElement = index;
     
    },
    duplicateElement(index) {
      const elementToDuplicate = { ...this.formFields[index] };
      this.formFields.splice(index + 1, 0, elementToDuplicate);
    },
    deleteElement(index) {
      this.formFields.splice(index, 1);
      this.selectedElement = null; 
    },
    togglePreviewMode() {
      this.previewMode = !this.previewMode;
    },
    fillFormForTesting() {
     
    },
    closeElementEditor() {
      this.selectedElement = null;
     
    }

  },
  components: {
    'text-input': {
      template: `<div><label>Champ texte court: <input type="text" /></label></div>`
    },
    'paragraph-input': {
      template: `<div><label>Champ paragraphe: <textarea></textarea></label></div>`
    },
    'checkbox-group': {
      template: `<div><label>Cases à cocher: <input type="checkbox" /></label></div>`
    },
    'radio-group': {
      template: `<div><label>Boutons radio: <input type="radio" /></label></div>`
    },
    'dropdown': {
      template: `<div><label>Menu déroulant: <select><option>Option 1</option></select></label></div>`
    },
    'date-picker': {
      template: `<div><label>Date: <input type="date" /></label></div>`
    },
    'time-picker': {
      template: `<div><label>Heure: <input type="time" /></label></div>`
    },
    'file-upload': {
      template: `<div><label>Téléchargement de fichier: <input type="file" /></label></div>`
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
  cursor: move;
}

label {
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
.form-area {
  padding: 50px;
  border: 1px solid #ccc;
}
</style>
