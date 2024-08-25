<template>
  <div class="form-preview">
    <h1>{{ form.title }}</h1>
    <p>{{ form.description }}</p>
    <div v-for="(field, index) in form.fields" :key="index" class="form-preview-field">
      <div v-if="field.type === 'text'">
        <label>{{ field.question }}</label>
        <input type="text" placeholder="Réponse courte" disabled />
      </div>
      <div v-else-if="field.type === 'textarea'">
        <label>{{ field.question }}</label>
        <textarea placeholder="Paragraphe" disabled></textarea>
      </div>
      <div v-else-if="field.type === 'radio'">
        <label>{{ field.question }}</label>
        <div v-for="(option, optIndex) in field.options" :key="optIndex" class="field-option">
          <input type="radio" :name="'option-' + index" :id="'option-' + index + '-' + optIndex" disabled />
          <label :for="'option-' + index + '-' + optIndex">{{ option }}</label>
        </div>
      </div>
      <div v-else-if="field.type === 'checkbox'">
        <label>{{ field.question }}</label>
        <div v-for="(option, optIndex) in field.options" :key="optIndex" class="field-option">
          <input type="checkbox" :id="'checkbox-' + index + '-' + optIndex" disabled />
          <label :for="'checkbox-' + index + '-' + optIndex">{{ option }}</label>
        </div>
      </div>
      <div v-else-if="field.type === 'dropdown'">
        <label>{{ field.question }}</label>
        <select disabled>
          <option v-for="(option, optIndex) in field.options" :key="optIndex">{{ option }}</option>
        </select>
      </div>
      <div v-else-if="field.type === 'date'">
        <label>{{ field.question }}</label>
        <input type="date" disabled />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      form: {}
    };
  },
  async created() {
    const formId = this.$route.params.id;
    try {
      const docRef = doc(db, 'forms', formId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.form = docSnap.data();
      } else {
        console.error('Formulaire non trouvé');
      }
    } catch (e) {
      console.error('Erreur lors de la récupération du formulaire:', e);
    }
  }
};
</script>
<style scoped>
.form-preview {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  color: #555;
  text-align: center;
  margin-bottom: 30px;
}

.form-preview-field {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1.1em;
  color: #333;
  margin-bottom: 8px;
}

input[type="text"],
textarea,
select,
input[type="date"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1em;
  background: #f9f9f9;
}

input[type="text"]:disabled,
textarea:disabled,
select:disabled,
input[type="date"]:disabled {
  background: #e9ecef;
  color: #888;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.field-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 10px;
}

.field-option label {
  font-size: 1em;
  color: #333;
}

select {
  background: #ffffff;
}

input[type="date"] {
  cursor: not-allowed;
}
/* Styles pour le bouton de partage */
.share-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.share-button:hover {
  background-color: #0056b3;
}

/* Styles pour le lien de partage */
.share-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 1em;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.share-link:hover {
  color: #0056b3;
}
</style>
