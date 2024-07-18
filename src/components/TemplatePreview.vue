<template>
  <div v-if="template" class="form-preview">
    <!-- Display template title and description -->
    <h2>{{ template.name }}</h2>
    <p>{{ template.description }}</p>
    
    <!-- Display template fields dynamically -->
    <div v-for="(question, index) in template.questions" :key="index" class="form-field">
      <label>
        <span v-if="!question.editing" @click="startEditing(question)">{{ question.text }}</span>
        <input v-else type="text" v-model="question.text" @keydown.enter="saveEditing(question)" class="edit-input" />
        <span class="response-type">{{ getResponseType(question.type) }}</span>
      </label>

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

    <!-- Add save button -->
    <button @click="saveTemplate" class="save-button">Enregistrer</button>
  </div>
  <div v-else>
    <p>Chargement du template...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
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
          // Ajouter une propriété d'édition pour chaque question
          template.value.questions.forEach(question => {
            question.editing = false;
          });
        } else {
          console.error('Template non trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du template :', error);
      }
    });

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

    const startEditing = (question) => {
      question.editing = true;
    };

    const saveEditing = (question) => {
      question.editing = false;
      // Ici, vous pouvez ajouter du code pour sauvegarder la modification dans Firebase
    };

    const saveTemplate = async () => {
      try {
        const newForm = {
          ...template.value,
          createdAt: new Date()
        };
        const formRef = doc(collection(db, 'forms'));
        await setDoc(formRef, newForm);
        alert('Template enregistré avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du template :', error);
        alert('Erreur lors de l\'enregistrement du template.');
      }
    };

    return {
      template,
      getResponseType,
      startEditing,
      saveEditing,
      saveTemplate
    };
  }
};
</script>

<style scoped>
/* Styles spécifiques pour TemplatePreview */
.form-preview {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #f9f9f9 30%, #e6f7ff 100%);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
  transition: transform 0.3s ease-in-out;
}

.form-preview:hover {
  transform: translateY(-10px);
}

.form-preview h2 {
  color: #007bff;
  font-size: 2.2em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 123, 255, 0.3);
}

.form-preview p {
  color: #1a5276;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 30px;
}

.form-field {
  margin-bottom: 25px;
}

.form-field label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 1.1em;
  cursor: pointer;
}

.form-field .edit-input {
  width: 60%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-field .response-type {
  font-size: 0.85em;
  color: #666;
  font-style: italic;
}

.form-field input[type="text"],
.form-field textarea,
.form-field select,
.form-field input[type="date"],
.form-field input[type="time"],
.form-field input[type="file"] {
  width: 100%;
  padding: 14px;
  border: 2px solid #ccc;
  border-radius: 10px;
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
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);
}

.checkbox-option,
.radio-option {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.checkbox-option input,
.radio-option input {
  margin-right: 12px;
}

.checkbox-option label,
.radio-option label {
  color: #555;
  font-weight: 500;
}

.form-field select {
  background-color: #fff;
  cursor: pointer;
}

.form-field textarea {
  resize: vertical;
}

.form-field input[type="file"] {
  padding: 10px;
}

.save-button {
  display: block;
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: 20px;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>
