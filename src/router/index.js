import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormBuilder from '../components/FormBuilder.vue';
import LoginPage from '../components/LoginPage.vue';

// Importez auth et db depuis firebaseConfig
import { auth } from '../firebaseConfig';

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
    component: HomePage,
    meta: { requiresAuth: true } // Ajoutez une meta si l'accès nécessite une authentification
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: FormBuilder,
    meta: { requiresAuth: true } // Ajoutez une meta si l'accès nécessite une authentification
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/login'); // Rediriger vers la page de connexion si non authentifié
  } else {
    next(); // Autoriser l'accès aux autres routes
  }
});

export default router;
