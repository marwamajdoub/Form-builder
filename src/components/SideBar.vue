<template>
  <aside class="sidebar">
    <div class="sidebar-header">
  
    </div>
    <ul class="sidebar-menu">
      <li @click="goToFormBuilder" class="sidebar-item">
        <i class="fas fa-plus icon"></i> Nouveau
      </li>
      <li @click="viewAllForms" class="sidebar-item">
        <i class="fas fa-list icon"></i>Formulaires
      </li>
      <li @click="viewTemplates" class="sidebar-item">
        <i class="fas fa-file-alt icon"></i> Templates
      </li>
      <li @click="viewResponses" class="sidebar-item">
        <i class="fas fa-chart-bar icon"></i> Responses
      </li>
      <li @click="shareForm" class="sidebar-item">
        <i class="fas fa-share-alt icon"></i> Share Form
      </li>
    </ul>
  </aside>
</template>

<script>
import { ref } from 'vue';


export default {
  methods: {
    goToFormBuilder() {
      this.$emit('navigate', { name: 'FormBuilder' });
    },
    viewAllForms() {
      this.$emit('navigate', 'AllForms');
    },
    viewTemplates() {
      this.$emit('navigate', 'Templates');
    },
    viewResponses() {
      this.$emit('navigate', 'Responses');
    },
    shareForm() {
      const formId = this.currentFormId; // Assurez-vous que currentFormId est défini et mis à jour ailleurs dans le composant
      if (!formId) {
        alert('Please select a form to share.');
        return;
      }

      const formUrl = `${window.location.origin}/forms/${formId}`;
      this.copyToClipboard(formUrl);
      alert(`Form URL copied to clipboard: ${formUrl}`);
    },
    copyToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  },
  setup() {
    const currentFormId = ref('UC6WL3ld7IBpm2VVWqaZ'); // Remplacer par une logique pour obtenir l'ID du formulaire actuel
    return { currentFormId };
  

    
  }
}
</script>

<style scoped>
.sidebar {
  width: 100px;
  background: linear-gradient(135deg, #42a5f5, #478ed1);
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: all 0.3s ease;
}

.sidebar:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.sidebar-header {
  margin-bottom: 20px;
}

.sidebar-header h2 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  flex-grow: 1;
}

.sidebar-item {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.2s;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.sidebar-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background:  #007bff; ;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}

.sidebar-item:hover::before {
  transform: scaleX(1);
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.icon {
  margin-right: 15px;
  font-size: 1.3em;
  color: #fff;
  transition: color 0.3s;
}

.sidebar-item:hover .icon {
  color: #007bff;;
}
</style>
