<template>
  <div id="app">
    <header>
      <h1><i class="fas fa-file-alt"></i>FORM BUILDER</h1>
      <nav>
        <router-link to="/form-builder">Form Builder</router-link>
        <router-link to="/home">Home</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>

export default {
  name: 'App'
  
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
      text-align: left; /* Alignement du texte à gauche */
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center; /* Centrer verticalement */
    }

    header h1 {
      color: white;
      font-size: 36px;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center; /* Centrer verticalement */
    }

    header h1 i {
      font-size: 40px; /* Taille de l'icône */
      margin-right: 10px; /* Espacement entre l'icône et le texte */
    }


    .form-icon {
      margin-right: 10px; /* Espacement entre l'icône et le formulaire */
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