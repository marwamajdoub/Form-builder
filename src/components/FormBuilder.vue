<template>
  <div class="form-builder">
    <div class="elements-sidebar">
      <div v-for="(element, index) in formElements" :key="index" @click="addElementToForm(element)" class="sidebar-item">
        <i :class="element.icon"></i>
        <span>{{ element.label }}</span>
      </div>
    </div>

    <div class="form-container">
      <div v-if="!isPreviewMode">
        <!-- Mode Édition -->
        <div class="form-header">
          <input class="form-title" type="text" v-model="formTitle" placeholder="Formulaire sans titre" />
          <textarea class="form-description" v-model="formDescription" placeholder="Description du formulaire"></textarea>
        </div>

        <div class="form-body">
          <div v-for="(field, index) in formFields" :key="index" class="form-field">
            <input type="text" v-model="field.question" placeholder="Question sans titre" class="field-question" />

            <select v-model="field.type" class="field-type-select">
              <option value="text">Réponse courte</option>
              <option value="textarea">Paragraphe</option>
              <option value="radio">Choix multiples</option>
              <option value="checkbox">Cases à cocher</option>
              <option value="dropdown">Liste déroulante</option>
              <option value="date">Date</option>
            </select>

            <!-- Champs de formulaire selon le type -->
            <div v-if="field.type === 'text'">
              <input type="text" placeholder="Réponse courte" class="field-input" />
            </div>
            <div v-else-if="field.type === 'textarea'">
              <textarea placeholder="Paragraphe" class="field-input"></textarea>
            </div>
            <div v-else-if="field.type === 'radio'">
              <div v-for="(option, optIndex) in field.options" :key="optIndex" class="field-option">
                <input type="radio" :name="'option-' + index" :id="'option-' + index + '-' + optIndex" />
                <label :for="'option-' + index + '-' + optIndex">{{ option }}</label>
              </div>
              <button @click.prevent="addOption(field)" class="add-option-btn">Ajouter une option</button>
            </div>
            <div v-else-if="field.type === 'checkbox'">
              <div v-for="(option, optIndex) in field.options" :key="optIndex" class="field-option">
                <input type="checkbox" :id="'checkbox-' + index + '-' + optIndex" />
                <label :for="'checkbox-' + index + '-' + optIndex">{{ option }}</label>
              </div>
              <button @click.prevent="addOption(field)" class="add-option-btn">Ajouter une option</button>
            </div>
            <div v-else-if="field.type === 'dropdown'">
              <select class="field-input">
                <option v-for="(option, optIndex) in field.options" :key="optIndex">{{ option }}</option>
              </select>
              <button @click.prevent="addOption(field)" class="add-option-btn">Ajouter une option</button>
            </div>
            <div v-else-if="field.type === 'date'">
              <input type="date" class="field-input" />
            </div>
          </div>

          <button @click="addQuestion" class="add-question-btn"><i class="fas fa-plus"></i> </button>
        </div>

        <div class="form-actions">
          <button class="action-btn preview-btn" @click="togglePreviewMode">
            <i class="fas fa-eye"></i> 
          </button>
          <button class="action-btn save-btn" @click="saveForm">
            <i class="fas fa-save"></i> 
          </button>
          <button class="action-btn share-btn" @click="generateShareLink">
            <i class="fas fa-share-alt"></i> 
          </button>
        </div>
      </div>

      <div v-else>
        <!-- Mode Prévisualisation -->
        <div class="form-preview">
          <h1>{{ formTitle }}</h1>
          <p>{{ formDescription }}</p>
          <div v-for="(field, index) in formFields" :key="index" class="form-preview-field">
            <div v-if="field.type === 'text'">
              <label>{{ field.question }}</label>
              <input type="text" placeholder="Réponse courte" />
            </div>
            <div v-else-if="field.type === 'textarea'">
              <label>{{ field.question }}</label>
              <textarea placeholder="Paragraphe"></textarea>
            </div>
            <div v-else-if="field.type === 'radio'">
              <label>{{ field.question }}</label>
              <div v-for="(option, optIndex) in field.options" :key="optIndex" class="field-option">
                <input type="radio" :name="'option-' + index" :id="'option-' + index + '-' + optIndex" />
                <label :for="'option-' + index + '-' + optIndex">{{ option }}</label>
              </div>
            </div>
            <div v-else-if="field.type === 'checkbox'">
              <label>{{ field.question }}</label>
              <div v-for="(option, optIndex) in field.options" :key="optIndex" class="field-option">
                <input type="checkbox" :id="'checkbox-' + index + '-' + optIndex" />
                <label :for="'checkbox-' + index + '-' + optIndex">{{ option }}</label>
              </div>
            </div>
            <div v-else-if="field.type === 'dropdown'">
              <label>{{ field.question }}</label>
              <select>
                <option v-for="(option, optIndex) in field.options" :key="optIndex">{{ option }}</option>
              </select>
            </div>
            <div v-else-if="field.type === 'date'">
              <label>{{ field.question }}</label>
              <input type="date" />
            </div>
          </div>

          <!-- Bouton de partage -->
          <div class="form-share">
            <button @click="generateShareLink" class="share-btn">
              <i class="fas fa-share-alt"></i> Partager
            </button>
            <input v-if="shareLink" type="text" :value="shareLink" readonly class="share-link" />
          </div>
        </div>

        <div class="form-actions">
          <button class="action-btn preview-btn" @click="togglePreviewMode">
            <i class="fas fa-edit"></i> Éditer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default {
  data() {

    return {
      
    
      
   
      formTitle: '',
      formDescription: '',
      formFields: [],
      isPreviewMode: false,
      formElements: [
        { label: 'Texte', icon: 'fas fa-font', type: 'text' },
        { label: 'Paragraphe', icon: 'fas fa-align-left', type: 'textarea' },
        { label: 'Choix multiples', icon: 'fas fa-list-ul', type: 'radio' },
        { label: 'Cases à cocher', icon: 'fas fa-check-square', type: 'checkbox' },
        { label: 'Liste déroulante', icon: 'fas fa-caret-down', type: 'dropdown' },
        { label: 'Date', icon: 'fas fa-calendar-alt', type: 'date' }
      ],
      shareLink: ''
    };
  },
  methods: {
    addElementToForm(element) {
      this.formFields.push({
        question: '',
        type: element.type,
        options: element.type === 'radio' || element.type === 'checkbox' || element.type === 'dropdown' ? ['Option 1'] : []
      });
    },
    addQuestion() {
      this.formFields.push({
        question: '',
        type: 'text',
        options: []
      });
    },
    addOption(field) {
      field.options.push('Nouvelle option');
    },
    togglePreviewMode() {
      this.isPreviewMode = !this.isPreviewMode;
    },
    async saveForm() {
  const formData = {
    title: this.formTitle,
    description: this.formDescription,
    fields: this.formFields
  };

  try {
    const docRef = await addDoc(collection(db, 'forms'), formData);
    console.log('Document written with ID: ', docRef.id);
    alert('Formulaire enregistré avec succès!');
    this.generateShareLink(docRef.id); // Génère le lien de partage après l'enregistrement
  } catch (e) {
    console.error('Error adding document: ', e);
  }
},
generateShareLink(formId) {
  this.shareLink = `${window.location.origin}/form/${formId}`;
}
}}

</script>


<style>
.form-builder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ajusté à la hauteur de la vue */
  padding: 20px;
  background-color: #f5f7fa;
}

.elements-sidebar {
  width: 80px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 20px;
  top: 80px; /* Ajuster cette valeur pour décaler la sidebar vers le bas */
  /* Si nécessaire, ajouter une marge pour ne pas couvrir le contenu */
  z-index: 1000;
  top: 60px; /* S'assurer que la sidebar est au-dessus des autres éléments */
  left: 180px;
}


.sidebar-item {
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, background-color 0.3s;
  padding: 10px;
  border-radius: 8px;
  width: 60px;
  text-align: center;
  background-color: #f9f9f9;
}

.sidebar-item:hover {
  transform: scale(1.05);
  background-color: #e0e0e0;
}

.sidebar-item i {
  font-size: 1.5em;
  color: #007bff;
}

.form-container {
  margin-left: 100px;
  width: calc(100% - 120px);
  max-width: 800px; /* Limiter la largeur du conteneur du formulaire */
  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto; /* Permet de faire défiler si le formulaire est trop long */
  max-height: 100vh; /* Limiter la hauteur maximale du conteneur du formulaire */
}

.form-header {
  margin-bottom: 30px;
}

.form-title, .form-description {
  width: 100%;
  border: none;
  padding: 15px;
  font-size: 1.2em;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.field-type-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 1em;
}

.form-body {
  margin-top: 20px;
}

.form-field {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ajouter une ombre pour un effet de profondeur */
  transition: transform 0.3s, box-shadow 0.3s;
}

.form-field:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée au survol */
}

.field-question {
  width: 100%;
  border: none;
  padding: 10px;
  font-size: 1.1em;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 15px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.field-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.field-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.add-option-btn {
  background: #007bff;
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9em;
  transition: background-color 0.3s, transform 0.3s;
}

.add-option-btn:hover {
  background: #0056b3;
  transform: scale(1.05);
}

.add-question-btn {
  background: #28a745;
  border: none;
  color: #ffffff;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 6px;
  margin-top: 20px;
  display: block;
  transition: background-color 0.3s, transform 0.3s;
}

.add-question-btn:hover {
  background: #218838;
  transform: scale(1.05);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.action-btn {
  background-color: #007bff;
  border: none;
  color: #ffffff;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 6px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;
}

.action-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.preview-btn i, .save-btn i {
  margin-right: 8px;
}
.form-preview {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

.form-preview h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.form-preview p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.form-preview-field {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fafafa;
}

.form-preview-field label {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #444;
  margin-bottom: 10px;
}

.form-preview-field input[type="text"],
.form-preview-field textarea,
.form-preview-field select {
  width: calc(100% - 16px); /* Ensure full width with padding adjustment */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  font-size: 16px;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-preview-field input[type="text"]:focus,
.form-preview-field textarea:focus,
.form-preview-field select:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  outline: none;
}
.action-btn {
  background-color: #007bff;
  border: none;
  color: #ffffff;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 6px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;
}

.action-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.share-btn {
  background-color: #17a2b8; /* Couleur pour le bouton de partage */
  border: none;
  color: #ffffff;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 6px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;
}

.share-btn:hover {
  background-color: #138496; /* Couleur au survol pour le bouton de partage */
  transform: scale(1.05);
}

.share-link {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 1em;
  color: #333;
  margin-top: 10px;
}

.preview-btn i, .save-btn i, .share-btn i {
  margin-right: 8px;
}

</style>