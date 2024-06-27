<template>
  <div class="home-container">
    <div class="view-mode-buttons">
      <button class="view-mode-button" :class="{ active: !isListMode }" @click="toggleGridView">
        <i class="fas fa-th"></i> Grille
      </button>
      <button class="view-mode-button" :class="{ active: isListMode }" @click="toggleListView">
        <i class="fas fa-list"></i> Liste
      </button>
    </div>

    <h2>Vos formulaires</h2>
    <div :class="{ 'form-list': isListMode, 'form-grid': !isListMode }">
      <template v-if="!isListMode">
        <div class="form-card" v-for="form in forms" :key="form.id">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ form.name }}</h3>
          </div>
        </div>
        <!-- Carte pour créer un nouveau formulaire -->
        <div class="form-card new-form" @click="goToFormBuilder">
          <div class="form-card-icon">
            <i class="fas fa-plus"></i>
          </div>
          <div class="form-card-content">
            <h3>Créer un nouveau formulaire</h3>
          </div>
        </div>
      </template>
      <template v-else>
        <ul class="form-list">
          <li v-for="form in forms" :key="form.id">
            <div class="form-card">
              <div class="form-card-icon">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="form-card-content">
                <h3>{{ form.name }}</h3>
              </div>
            </div>
          </li>
        </ul>
        <!-- Carte pour créer un nouveau formulaire -->
        <div class="form-card new-form" @click="goToFormBuilder">
          <div class="form-card-icon">
            <i class="fas fa-plus"></i>
          </div>
          <div class="form-card-content">
            <h3>Créer un nouveau formulaire</h3>
          </div>
        </div>
      </template>
    </div>

    <h2>Vos templates</h2>
    <div :class="{ 'template-list': isListMode, 'template-grid': !isListMode }">
      <template v-if="!isListMode">
        <div class="template-card" v-for="template in templates" :key="template.id">
          <div class="template-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="template-card-content">
            <h3>{{ template.name }}</h3>
          </div>
        </div>
      </template>
      <template v-else>
        <ul class="template-list">
          <li v-for="template in templates" :key="template.id">
            <div class="template-card">
              <div class="template-card-icon">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="template-card-content">
                <h3>{{ template.name }}</h3>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forms: [], // Liste des formulaires de l'utilisateur
      templates: [], // Liste des templates de l'utilisateur
      isListMode: false // Mode grille par défaut
    };
  },
  methods: {
    toggleListView() {
      this.isListMode = true; // Active le mode liste
    },
    toggleGridView() {
      this.isListMode = false; // Active le mode grille
    },
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
      { id: 2, name: 'Template 2' }
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

.view-mode-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.view-mode-button {
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 5px;
  transition: color 0.3s ease;
}

.view-mode-button.active {
  color: #333;
}

.form-grid, .template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.form-list, .template-list {
  list-style-type: none;
  padding: 0;
}

.form-card, .template-card {
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

.form-card:hover, .template-card:hover {
  transform: scale(1.05);
}

.form-card-icon, .template-card-icon {
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
}

.form-card-content h3, .template-card-content h3 {
  font-size: 18px;
  color: #333;
}

.new-form {
  background-color: #f1f1f1;
  border: 2px dashed #007bff;
  margin-top: 20px; /* Ajout d'une marge en haut pour l'espacement */
}
</style>
