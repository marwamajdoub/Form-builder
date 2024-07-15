<template>
  <div v-if="template" class="form-preview">
    <!-- Display template title and description -->
    <h2>{{ template.name }}</h2>
    <p>{{ template.description }}</p>
    
    <!-- Display template fields dynamically -->
    <div v-for="(question, index) in template.questions" :key="index" class="form-field">
      <label>
        {{ question.text }} 
        <span class="response-type">{{ getResponseType(question.type) }}</span>
      </label> <!-- Display the question and response type -->

      <!-- Render different field types -->
      <template v-if="question.type === 'text-input'">
        <input type="text" :placeholder="question.placeholder" />
      </template>
      
      <template v-else-if="question.type === 'paragraph-input'">
        <textarea :placeholder="question.placeholder"></textarea>
      </template>
      
      <template v-else-if="question.type === 'checkbox-group'">
        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="checkbox-option">
          <input type="checkbox" :id="'option-' + optIndex" />
          <label :for="'option-' + optIndex">{{ option }}</label>
        </div>
      </template>
      
      <template v-else-if="question.type === 'radio-group'">
        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="radio-option">
          <input type="radio" :id="'option-' + optIndex" :name="'radio-' + index" />
          <label :for="'option-' + optIndex">{{ option }}</label>
        </div>
      </template>
      
      <template v-else-if="question.type === 'dropdown'">
        <select>
          <option v-for="(option, optIndex) in question.options" :key="optIndex">{{ option }}</option>
        </select>
      </template>
      
      <template v-else-if="question.type === 'date-picker'">
        <input type="date" />
      </template>
      
      <template v-else-if="question.type === 'time-picker'">
        <input type="time" />
      </template>
      
      <template v-else-if="question.type === 'file-upload'">
        <input type="file" />
      </template>
    </div>
  </div>
  <div v-else>
    <p>Chargement du template...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default {
  name: 'TemplatePreview',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const template = ref(null);

    onMounted(async () => {
      const templateId = props.id;

      try {
        const docRef = doc(db, 'templates', templateId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          template.value = {
            id: docSnap.id,
            ...docSnap.data()
          };
        } else {
          console.error('Template non trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du template :', error);
      }
    });

    // Fonction pour obtenir le type de réponse
    const getResponseType = (type) => {
      switch (type) {
        case 'text-input':
          return '(Réponse courte)';
        case 'paragraph-input':
          return '(Réponse paragraphe)';
        case 'checkbox-group':
          return '(Sélection multiple)';
        case 'radio-group':
          return '(Sélection unique)';
        case 'dropdown':
          return '(Liste déroulante)';
        case 'date-picker':
          return '(Sélection de date)';
        case 'time-picker':
          return '(Sélection d\'heure)';
        case 'file-upload':
          return '(Téléchargement de fichier)';
        default:
          return '';
      }
    };

    return {
      template,
      getResponseType
    };
  }
};
</script>

<style scoped>
/* Styles spécifiques pour TemplatePreview */
.form-preview {
  font-family: 'Montserrat', sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
}

.form-preview h2 {
  color: #007bff;
  font-size: 2em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.form-preview p {
  color: #1a5276;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
}

.form-field .response-type {
  font-size: 0.9em;
  color: #666;
}

.form-field input[type="text"],
.form-field textarea,
.form-field select,
.form-field input[type="date"],
.form-field input[type="time"],
.form-field input[type="file"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.form-field input[type="text"]:focus,
.form-field textarea:focus,
.form-field select:focus,
.form-field input[type="date"]:focus,
.form-field input[type="time"]:focus,
.form-field input[type="file"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}

.checkbox-option,
.radio-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-option input,
.radio-option input {
  margin-right: 10px;
}

.checkbox-option label,
.radio-option label {
  color: #555;
}

.form-field select {
  background-color: #fff;
}

.form-field textarea {
  resize: vertical;
}

.form-field input[type="file"] {
  padding: 8px;
}
</style>
