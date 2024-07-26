<template>
  <div id="app">
    <header v-if="!isLoginPage">
      <h1><i class="fas fa-file-alt"></i> FORM BUILDER</h1>
      
    </header>
    <main :class="{ 'centered-content': isLoginPage }">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    isLoginPage() {
      return this.$route.path === '/login'; // Chemin de votre page de connexion
    }
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
 
}

header {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

header h1 {
  color:  #007bff;
  font-size: 30px;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}

header h1 i {
  font-size: 30px;
  margin-right: 10px;
}

nav {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

nav a {
  color: #007bff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: rgba(12, 5, 86, 0.2);
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Assurez-vous de spécifier la valeur de height */
  padding: 20px; /* Ajoutez du padding si nécessaire */
}
</style>
