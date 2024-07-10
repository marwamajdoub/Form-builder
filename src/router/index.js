import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormPreview from '../components/FormPreview.vue';

import FormBuilder from '../components/FormBuilder.vue';
import LoginPage from '../components/LoginPage.vue';
import AdminPage from '../components/AdminPage.vue';
import { auth } from '../firebaseConfig';
import store from '../store';

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
    meta: { requiresAuth: true }
  },
  {
    path: '/preview',
    name: 'FormPreview',
    component: FormPreview,
    props: true  // Pour passer les props au composant de prévisualisation
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: FormBuilder,
    meta: { requiresAuth: true }
  },
  {
    path: '/form-preview/:formId',
    name: 'FormPreview',
    component: () => import(/* webpackChunkName: "form-preview" */ '../components/FormPreview.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const currentUser = auth.currentUser;
  const userRole = store.state.userRole;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAdmin && userRole !== 'admin') {
    next('/home');
  } else {
    next();
  }
});

export default router;

