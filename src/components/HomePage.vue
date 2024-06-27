<template>
  <div>
    <h2>Vos formulaires</h2>
    <!-- Liste des formulaires créés -->
    <ul>
      <li v-for="form in forms" :key="form.id">{{ form.name }}</li>
    </ul>
    <button @click="goToFormBuilder">Créer un nouveau formulaire</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forms: [] // Liste des formulaires de l'utilisateur
    };
  },
  methods: {
    goToFormBuilder() {
      this.$router.push({ name: 'FormBuilder' }); // Navigue vers le form builder
    }
  },
  created() {
    // Exemple : chargement des formulaires de l'utilisateur depuis une API
    // Utilisez une méthode comme axios pour récupérer les données depuis votre backend
    // Remplissez this.forms avec les données récupérées
    this.forms = [
      { id: 1, name: 'Formulaire 1' },
      { id: 2, name: 'Formulaire 2' }
    ];
  }
};
</script>

<style scoped>
/* Styles pour la page d'accueil */
</style>
