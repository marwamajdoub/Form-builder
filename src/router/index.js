import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormBuilder from '../components/FormBuilder.vue';
import LoginPage from '../components/LoginPage.vue'; // Mettez à jour le chemin vers LoginPage.vue

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage // Utilisez le composant LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: FormBuilder
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
