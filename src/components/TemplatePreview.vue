<template>
  <div class="template-preview">
    <h2>{{ template.name }}</h2>
    <p>{{ template.description }}</p>
    
    <!-- Affichage des questions du template -->
    <div v-for="(question, index) in template.questions" :key="index" class="question">
      <h3>{{ question.title }}</h3>
      <p>{{ question.description }}</p>
      <p>Type de question : {{ question.type }}</p>
      <!-- Affiche d'autres détails de la question selon le type -->
      <template v-if="question.type === 'text'">
        <p>Longueur maximale : {{ question.maxLength }}</p>
      </template>
      <template v-else-if="question.type === 'checkbox'">
        <p>Options :</p>
        <ul>
          <li v-for="(option, i) in question.options" :key="i">{{ option }}</li>
        </ul>
      </template>
      <!-- Ajouter d'autres conditions pour les autres types de questions -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // Importer ref et onMounted depuis 'vue'
import { db } from '../firebaseConfig'; // Importer db depuis votre configuration Firebase
import { doc, getDoc } from 'firebase/firestore'; // Importer doc et getDoc depuis 'firebase/firestore'

export default {
  name: 'TemplatePreview',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const template = ref({
      name: '',
      description: '',
      questions: []
    });

    // Utiliser onMounted pour charger le template lors du montage du composant
    onMounted(async () => {
      await fetchTemplate(props.id);
    });

    // Fonction pour récupérer le template depuis Firestore
    const fetchTemplate = async (id) => {
      try {
        const docRef = doc(db, 'templates', id); // Référence au document dans la collection 'templates'
        const docSnap = await getDoc(docRef); // Récupérer le document
        if (docSnap.exists()) {
          template.value = docSnap.data(); // Mettre à jour le template avec les données du document
        } else {
          console.log('Aucun document trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du template :', error);
        // Gestion de l'erreur
      }
    };

    return {
      template
    };
  }
};
</script>

<style scoped>
.template-preview {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.template-preview h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.template-preview p {
  color: #666;
  font-size: 16px;
  margin-bottom: 10px;
}

.question {
  margin-bottom: 20px;
}

.question h3 {
  color: #007bff;
  font-size: 20px;
  margin-bottom: 5px;
}

.question p {
  color: #333;
  font-size: 16px;
  margin-bottom: 5px;
}

.question p:last-child {
  margin-bottom: 0;
}

.question ul {
  list-style-type: none;
  padding: 0;
}

.question li {
  color: #333;
  font-size: 16px;
}
</style>
