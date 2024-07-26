<template>
    <div v-if="template" class="response-page">
      <h2>{{ template.name }}</h2>
      <p>{{ template.description }}</p>
  
      <form @submit.prevent="submitForm">
        <div v-for="(question, index) in template.questions" :key="index" class="form-field">
          <label>
            {{ question.text }}
            <!-- Affichage des questions selon le type -->
            <template v-if="question.type === 'text-input'">
              <input type="text" v-model="responses[index]" :placeholder="question.placeholder" />
            </template>
  
            <template v-else-if="question.type === 'paragraph-input'">
              <textarea v-model="responses[index]" :placeholder="question.placeholder"></textarea>
            </template>
  
            <template v-else-if="question.type === 'checkbox-group'">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="checkbox-option">
                <input type="checkbox" :id="'option-' + optIndex" :value="option" v-model="responses[index]" />
                <label :for="'option-' + optIndex">{{ option }}</label>
              </div>
            </template>
  
            <template v-else-if="question.type === 'radio-group'">
              <div v-for="(option, optIndex) in question.options" :key="optIndex" class="radio-option">
                <input type="radio" :id="'option-' + optIndex" :name="'radio-' + index" :value="option" v-model="responses[index]" />
                <label :for="'option-' + optIndex">{{ option }}</label>
              </div>
            </template>
  
            <template v-else-if="question.type === 'dropdown'">
              <select v-model="responses[index]">
                <option v-for="(option, optIndex) in question.options" :key="optIndex">{{ option }}</option>
              </select>
            </template>
  
            <template v-else-if="question.type === 'date-picker'">
              <input type="date" v-model="responses[index]" />
            </template>
  
            <template v-else-if="question.type === 'time-picker'">
              <input type="time" v-model="responses[index]" />
            </template>
  
            <template v-else-if="question.type === 'file-upload'">
              <input type="file" />
            </template>
          </label>
        </div>
  
        <button type="submit" class="submit-button">Envoyer</button>
      </form>
    </div>
  
    <div v-else>
      <p>Chargement du template...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
  import { db } from '../firebaseConfig';
  
  export default {
    name: 'ResponsePage',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const template = ref(null);
      const responses = ref([]);
  
      onMounted(async () => {
        const templateId = props.id;
        console.log(`Loading template with ID: ${templateId}`);
  
        try {
          const docRef = doc(db, 'templates', templateId);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            console.log('Template data:', docSnap.data());
            template.value = {
              id: docSnap.id,
              ...docSnap.data()
            };
            responses.value = new Array(template.value.questions.length).fill('');
          } else {
            console.error('Template not found');
          }
        } catch (error) {
          console.error('Error fetching template:', error);
        }
      });
  
      const submitForm = async () => {
        const formResponses = responses.value;
        console.log('Submitting responses:', formResponses);
  
        try {
          await addDoc(collection(db, 'responses'), {
            templateId: props.id,
            responses: formResponses,
            submittedAt: new Date()
          });
          alert('Form successfully submitted!');
          responses.value = new Array(template.value.questions.length).fill(''); // Reset responses
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
  
      return {
        template,
        responses,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  .response-page {
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(135deg, #f9f9f9 30%, #e6f7ff 100%);
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 40px auto;
  }
  
  .response-page h2 {
    color: #007bff;
    font-size: 2.2em;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px rgba(0, 123, 255, 0.3);
  }
  
  .response-page p {
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
    margin-bottom: 8px;
  }
  
  .checkbox-option input[type="checkbox"],
  .radio-option input[type="radio"] {
    margin-right: 8px;
  }
  
  .submit-button {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  