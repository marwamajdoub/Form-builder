<template>
  <div id="app">
    <header>
      <h1>FORM</h1>
    </header>
    <main>
      
      <FormBuilder />
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
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  background-color:rgb(19, 104, 175);
  padding: 9px;
 
}
h1{
  color: white;
  font-size: 25px;

}

main {
  
  background-color: white;
 
}


</style>
