<template>
  <div id="app">
    <header>
      <h1>FORM</h1>
    </header>
    <main>
      <router-view></router-view>
      <div class="form-builder">
        <FormBuilder />
      </div>
    </main>
  </div>
</template>

<script>
import FormBuilder from './components/FormBuilder.vue';

export default {
  name: 'App',
  components: {
    FormBuilder
  }
};
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

header {
  background: linear-gradient(to right, #1e5799, #2989d8);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #1e5799, #2989d8);
  z-index: -1;
  animation: gradientAnimation 10s linear infinite;
}

h1 {
  color: white;
  font-size: 40px;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

main {
  display: flex;
  padding: 20px;
}

.sidebar {
  width: 200px; /* Largeur de la barre latérale */
  background-color: white; /* Couleur de fond de la barre latérale */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.sidebar:hover {
  transform: scale(1.02);
}

.form-builder {
  flex: 1; /* Pour occuper tout l'espace restant */
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.form-builder:hover {
  transform: scale(1.02);
}
</style>