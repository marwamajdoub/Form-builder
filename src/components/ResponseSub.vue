<template>
    <div>
      <h1>Réponses au Formulaire</h1>
      <div v-if="loading">Chargement des réponses...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <ul>
          <li v-for="response in responses" :key="response.id">
            {{ response.data() }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "@/firebaseConfig";
  
  export default {
    data() {
      return {
        responses: [],
        loading: true,
        error: null,
      };
    },
    async created() {
      try {
        const responses = [];
        const querySnapshot = await getDocs(collection(db, "responses"));
        querySnapshot.forEach((doc) => {
          responses.push(doc);
        });
        this.responses = responses;
        this.loading = false;
      } catch (error) {
        this.error = "Erreur lors du chargement des réponses: " + error.message;
        this.loading = false;
      }
    },
  };
  </script>
  
  <style scoped>
.response-sub-container {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: auto;
  font-family: 'Poppins', sans-serif;
}

.title {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.loading, .error {
  font-size: 1.2em;
  text-align: center;
  color: #007bff;
}

.error {
  color: #e74c3c;
}

.responses-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.response-card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.response-card pre {
  margin: 0;
  font-size: 1em;
  white-space: pre-wrap; /* Allows text to wrap inside the container */
  overflow-wrap: break-word; /* Breaks long words to avoid overflow */
}
</style>