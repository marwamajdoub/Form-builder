// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormBuilder from '../components/FormBuilder.vue';
import LoginPage from '../components/LoginPage.vue';
import SignUp from '../components/SignUp.vue'; // Import the SignUpPage component

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
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
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp // Add the SignUpPage route
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
