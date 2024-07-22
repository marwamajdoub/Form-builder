<template>
  <div class="form-builder">
    <div class="elements-sidebar">
      <div v-for="(element, index) in formElements" :key="index" @click="addElementToForm(element)" class="sidebar-item">
        <i :class="element.icon"></i>
        <span>{{ element.label }}</span>
      </div>
    </div>

    <div class="form-container">
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
            <!-- Ajoutez d'autres types de champs si nécessaire -->
          </select>

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
          <!-- Ajoutez d'autres types de champs si nécessaire -->
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
      formFields: [],
      formElements: [
        { label: 'Réponse courte', icon: 'fas fa-font', type: 'text' },
        { label: 'Paragraphe', icon: 'fas fa-align-left', type: 'textarea' },
        { label: 'Choix multiples', icon: 'fas fa-dot-circle', type: 'radio' },
        // Ajoutez d'autres éléments si nécessaire
      ],
      previewMode: false,
    };
  },
  methods: {
    addQuestion() {
      this.formFields.push({
        type: 'text',
        question: '',
        options: [], // Utilisé uniquement pour les types de champs 'radio'
      });
    },
    addOption(field) {
      if (field.type === 'radio') {
        field.options.push(`Option ${field.options.length + 1}`);
      }
    },
    togglePreviewMode() {
      this.previewMode = !this.previewMode;
    },
    saveForm() {
      // Ajoutez votre logique de sauvegarde du formulaire ici
      console.log({
        title: this.formTitle,
        description: this.formDescription,
        fields: this.formFields,
      });
    },
    addElementToForm(element) {
      const newField = {
        type: element.type,
        question: '',
        options: element.type === 'radio' ? ['Option 1'] : [],
      };
      this.formFields.push(newField);
    }
  },
};
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
  top: 20px;
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
</style>
