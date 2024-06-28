<template>
  <div class="home-container">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-content">
      <div class="view-toggle">
        <button @click="toggleViewMode">
          <i :class="viewMode === 'grid' ? 'fas fa-list' : 'fas fa-th'"></i>
        </button>
      </div>
      <h2>Vos formulaires</h2>
      <div :class="['form-grid', viewMode]">
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
      <h2>Templates</h2>
      <div :class="['form-grid', viewMode]">
        <div class="form-card" v-for="template in templates" :key="template.id">
          <div class="form-card-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="form-card-content">
            <h3>{{ template.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './SideBar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      viewMode: 'grid',
      forms: [
        { id: 1, name: 'Formulaire 1' },
        { id: 2, name: 'Formulaire 2' }
      ],
      templates: [
        { id: 1, name: 'Template 1' },
        { id: 2, name: 'Template 2' }
      ]
    };
  },
  methods: {
    toggleViewMode() {
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    },
    goToFormBuilder() {
      this.$router.push({ name: 'FormBuilder' });
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
}

.sidebar-container {
  flex: 0 0 250px;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.view-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  gap: 20px;
}

.form-grid.grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.form-grid.list {
  grid-template-columns: 1fr;
}

.form-card {
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

.form-card:hover {
  transform: scale(1.05);
}

.form-card-icon {
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
}

.form-card-content h3 {
  font-size: 18px;
  color: #333;
}

.new-form {
  background-color: #f1f1f1;
  border: 2px dashed #007bff;
}
</style>
