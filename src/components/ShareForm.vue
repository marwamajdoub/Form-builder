<!-- ShareForm.vue -->
<template>
    <div class="share-form">
      <h2>Partager le Formulaire</h2>
      <p>URL de partage:</p>
      <input type="text" v-model="shareUrl" readonly />
      <button @click="copyToClipboard">Copier l'URL</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: ['id'],
    setup(props) {
      const shareUrl = ref('');
  
      const generateShareUrl = () => {
        const baseUrl = window.location.origin;
        shareUrl.value = `${baseUrl}/form-preview/${props.id}`;
      };
  
      const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl.value)
          .then(() => alert('URL copiée dans le presse-papiers'))
          .catch(err => console.error('Erreur lors de la copie dans le presse-papiers:', err));
      };
  
      // Générer l'URL de partage lors du montage du composant
      generateShareUrl();
  
      return { shareUrl, copyToClipboard };
    }
  }
  </script>
  
  <style scoped>
  .share-form {
    padding: 20px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .share-form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
  }
  
  .share-form button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .share-form button:hover {
    background-color: #0056b3;
  }
  </style>
  