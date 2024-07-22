<template>
  <aside class="sidebar">
    <ul>
      <li @click="goToFormBuilder"><i class="fas fa-plus"></i> Créer un nouveau formulaire</li>
      <li @click="viewAllForms"><i class="fas fa-list"></i> Voir tous les formulaires</li>
      <li @click="viewTemplates"><i class="fas fa-file-alt"></i> Voir les templates</li>
      <li @click="viewResponses"><i class="fas fa-chart-bar"></i> Voir les réponses</li>
      <li @click="formSettings"><i class="fas fa-cog"></i> Paramètres du formulaire</li>
      <li @click="exportResponses"><i class="fas fa-file-export"></i> Exporter les réponses</li>
      <li @click="exportForm"><i class="fas fa-file-export"></i> Exporter un formulaire</li>
      <li @click="importForm"><i class="fas fa-file-import"></i> Importer un formulaire</li>
      <li @click="importTemplate"><i class="fas fa-file-import"></i> Importer une template</li>
      <li @click="collaborate"><i class="fas fa-users"></i> Collaborer</li>
      <li @click="formArchive"><i class="fas fa-archive"></i> Formulaires archivés</li>
    </ul>
  </aside>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
    formSettings() {
      this.$emit('navigate', 'FormSettings');
    },
    exportResponses() {
      this.$emit('navigate', 'ExportResponses');
    },
    exportForm() {
      this.$emit('navigate', 'ExportForm');
    },
    importForm() {
      this.$emit('navigate', 'ImportForm');
    },
    importTemplate() {
      this.$emit('navigate', 'ImportTemplate');
    },
    collaborate() {
      this.$emit('navigate', 'Collaborate');
    },
    formArchive() {
      this.$emit('navigate', 'FormArchive');
    }
  },
  setup() {
    const router = useRouter();
    const currentFormId = ref(null); // Assurez-vous de définir l'ID du formulaire en cours d'utilisation

    const shareForm = () => {
      if (currentFormId.value) {
        router.push({ name: 'ShareForm', params: { id: currentFormId.value } });
      } else {
        alert('Veuillez sélectionner un formulaire à partager.');
      }
    };

    return { shareForm };
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f8f8f8;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.sidebar ul li:hover {
  background-color: #e0e0e0;
}

.sidebar ul li i {
  margin-right: 10px;
}
</style>
