<template>
  <div class="home-container">
    <h2>Templates</h2>
    <div class="template-grid">
      <div class="template-card" v-for="template in templates" :key="template.id">
        <div class="template-card-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="template-card-content">
          <h3>{{ template.name }}</h3>
        </div>
      </div>
    </div>

    <h2>Vos formulaires</h2>
    <div class="form-grid">
      <div class="form-card" v-for="form in forms" :key="form.id">
        <div class="form-card-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="form-card-content">
          <h3>{{ form.name }}</h3>
        </div>
      </div>
      <div class="form-card new-form" @click="goToFormBuilder">
        <div class="form-card-icon">
          <i class="fas fa-plus"></i>
        </div>
        <div class="form-card-content">
          <h3>Créer un nouveau formulaire</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forms: [], // Liste des formulaires de l'utilisateur
      templates: [] // Liste des templates
    };
  },
  methods: {
    goToFormBuilder() {
      this.$router.push({ name: 'FormBuilder' }); // Navigue vers le form builder
    }
  },
  created() {
    // Exemple : chargement des formulaires et templates de l'utilisateur depuis une API
    // Utilisez une méthode comme axios pour récupérer les données depuis votre backend
    // Remplissez this.forms et this.templates avec les données récupérées
    this.forms = [
      { id: 1, name: 'Formulaire 1' },
      { id: 2, name: 'Formulaire 2' }
    ];
    this.templates = [
      { id: 1, name: 'Template 1' },
      { id: 2, name: 'Template 2' },
      { id: 3, name: 'Template 3' }
    ];
  }
};
</script>

<style scoped>
.home-container {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.template-grid, .form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.template-card, .form-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
  cursor: pointer;
}

.template-card:hover, .form-card:hover {
  transform: scale(1.05);
}

.template-card-icon, .form-card-icon {
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
}

.template-card-content h3, .form-card-content h3 {
  font-size: 18px;
  color: #333;
}

.new-form {
  background-color: #f1f1f1;
  border: 2px dashed #007bff;
}
</style>
