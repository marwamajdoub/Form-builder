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
