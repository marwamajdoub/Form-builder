import { createRouter, createWebHistory } from 'vue-router';
import FormBuilder from '../components/FormBuilder.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/form-builder', component: FormBuilder }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
