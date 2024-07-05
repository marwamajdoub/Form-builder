import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormBuilder from '../components/FormBuilder.vue';
import AuthComponent from '../components/AuthComponent.vue'; // Importez votre nouveau composant

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
    component: AuthComponent // Utilisez le nouveau composant pour la route de login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: AuthComponent // Utilisez le même composant pour la route de signup
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: FormBuilder,
    meta: { requiresAuth: true }
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
    next('/login');
  } else {
    next();
  }
});

export default router;
