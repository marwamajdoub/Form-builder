
import '@fortawesome/fontawesome-free/css/all.css'; 
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Importez le store Vuex

const app = createApp(App);
app.use(store); // Utilisez le store Vuex
app.use(router);
app.mount('#app');
