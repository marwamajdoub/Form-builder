import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormPreview from '../components/FormPreview.vue';
import FormBuilder from '../components/FormBuilder.vue';
import TemplatePreview from '../components/TemplatePreview.vue';
import LoginPage from '../components/LoginPage.vue';
import AdminPage from '../components/AdminPage.vue';
import ShareForm from '../components/ShareForm.vue'; // Importer le composant ShareForm
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
    path: '/form-preview/:id',
    name: 'FormPreview',
    component: FormPreview,
    props: true
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: FormBuilder,
    meta: { requiresAuth: true }
  },
  {
    path: '/template/:id',
    name: 'TemplatePreview',
    component: TemplatePreview,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/share-form/:id',
    name: 'ShareForm',
    component: ShareForm,
    props: true
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
