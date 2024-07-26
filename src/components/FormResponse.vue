<template>
    <div v-if="form" class="form-response">
      <h1>{{ form.title }}</h1>
      <p>{{ form.description }}</p>
      <form @submit.prevent="submitResponse">
        <div v-for="(field, index) in form.fields" :key="index" class="form-response-field">
          <label>{{ field.question }}</label>
          <div v-if="field.type === 'text'">
            <input type="text" v-model="responses[index]" placeholder="Réponse courte" />
          </div>
          <div v-else-if="field.type === 'textarea'">
            <textarea v-model="responses[index]" placeholder="Paragraphe"></textarea>
          </div>
          <div v-else-if="field.type === 'radio'">
            <div v-for="(option, optIndex) in field.options" :key="optIndex">
              <input type="radio" :name="'option-' + index" :id="'radio-' + index + '-' + optIndex" :value="option" v-model="responses[index]" />
              <label :for="'radio-' + index + '-' + optIndex">{{ option }}</label>
            </div>
          </div>
          <div v-else-if="field.type === 'checkbox'">
            <div v-for="(option, optIndex) in field.options" :key="optIndex">
              <input type="checkbox" :id="'checkbox-' + index + '-' + optIndex" :value="option" v-model="responses[index]" />
              <label :for="'checkbox-' + index + '-' + optIndex">{{ option }}</label>
            </div>
          </div>
          <div v-else-if="field.type === 'dropdown'">
            <select v-model="responses[index]">
              <option v-for="(option, optIndex) in field.options" :key="optIndex" :value="option">{{ option }}</option>
            </select>
          </div>
          <div v-else-if="field.type === 'date'">
            <input type="date" v-model="responses[index]" />
          </div>
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
    <div v-else>
      <p>Chargement du formulaire...</p>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebaseConfig';
  import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        form: null,
        responses: []
      };
    },
    async created() {
      const formId = this.$route.params.id;
      if (!formId) {
        console.error('Form ID is missing');
        return;
      }
  
      try {
        const formDoc = doc(db, 'forms', formId);
        const docSnap = await getDoc(formDoc);
  
        if (docSnap.exists()) {
          this.form = docSnap.data();
          this.responses = new Array(this.form.fields.length).fill('');
        } else {
          console.error('No such document!');
        }
      } catch (e) {
        console.error('Error fetching document: ', e);
      }
    },
    methods: {
      async submitResponse() {
        const formId = this.$route.params.id;
        if (!formId) {
          console.error('Form ID is missing');
          return;
        }
  
        const responseData = {
          formId: formId,
          responses: this.responses,
          submittedAt: new Date()
        };
  
        try {
          await addDoc(collection(db, 'responses'), responseData);
          alert('Réponses enregistrées avec succès!');
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
.form-response {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
}

.form-response-field {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"],
textarea,
select,
input[type="date"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 100px;
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 5px;
}

input[type="radio"] + label,
input[type="checkbox"] + label {
  margin-right: 15px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.form-response-field div {
  margin-bottom: 10px;
}
</style>

  