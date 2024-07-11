<template>
    <div class="template-preview" v-if="template">
      <h2>{{ template.name }}</h2>
      <p>{{ template.description }}</p>
      <!-- Autres détails du template à afficher -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import { db } from '../firebaseConfig';
  import { doc, getDoc } from 'firebase/firestore';
  
  export default {
    props: ['id'],
    data() {
      return {
        template: null
      };
    },
    async mounted() {
      await this.fetchTemplate();
    },
    methods: {
      async fetchTemplate() {
        try {
          const templateRef = doc(db, 'templates', this.id);
          const docSnap = await getDoc(templateRef);
  
          if (docSnap.exists()) {
            this.template = docSnap.data();
          } else {
            console.log('Aucun document correspondant!');
          }
        } catch (error) {
          console.error('Erreur lors du chargement du template:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .template-preview {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  