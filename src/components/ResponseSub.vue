<template>
    <div class="response-sub-container">
      <h1 class="title">Réponses au Formulaire</h1>
      <div v-if="loading" class="loading">Chargement des réponses...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="responses-list">
        <div v-for="response in responses" :key="response.id" class="response-card">
          <pre class="response-data">{{ formatResponse(response.data()) }}</pre>
        </div>
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
    methods: {
      formatResponse(data) {
        return JSON.stringify(data, null, 2); // Format the JSON data nicely
      }
    }
  };
  </script>
  
  <style scoped>
  .response-sub-container {
    padding: 20px;
    background: #f4f6f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    margin: auto;
    font-family: 'Poppins', sans-serif;
  }
  
  .title {
    font-size: 2.5em;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .loading, .error {
    font-size: 1.2em;
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .loading {
    color: #007bff;
  }
  
  .error {
    color: #e74c3c;
  }
  
  .responses-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .response-card {
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .response-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .response-data {
    white-space: pre-wrap; /* Allows text to wrap inside the container */
    overflow-wrap: break-word; /* Breaks long words to avoid overflow */
    font-family: 'Courier New', Courier, monospace; /* Use a monospace font for better readability of JSON data */
    font-size: 1em;
    color: #333;
  }
  </style>
  