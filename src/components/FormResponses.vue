<template>
    <div class="form-responses">
      <h1>Form Responses</h1>
      <!-- Affichez les réponses du formulaire ici -->
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { db } from '../firebaseConfig'; // Assure-toi que db est correctement configuré
  
  export default {
    setup() {
      const route = useRoute();
      const formId = route.params.id;
      const responses = ref([]);
  
      onMounted(async () => {
        const responseSnapshot = await db.collection('responses').where('formId', '==', formId).get();
        responses.value = responseSnapshot.docs.map(doc => doc.data());
      });
  
      return { responses };
    }
  }
  </script>
  
  <style scoped>
  .form-responses {
    padding: 20px;
  }
  </style>
  