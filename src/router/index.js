import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormPreview from '../components/FormPreview.vue';
import FormBuilder from '../components/FormBuilder.vue';
import TemplatePreview from '../components/TemplatePreview.vue';
import LoginPage from '../components/LoginPage.vue';
import AdminPage from '../components/AdminPage.vue';
import FormResponse from '@/components/FormResponse.vue';
import ResponseSub from '@/components/ResponseSub.vue'; // Import du composant ReponseSub

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/form-preview/:id',
    name: 'FormPreview',
    component: FormPreview,
    props: true,
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: FormBuilder,
    meta: { requiresAuth: true },
  },
  {
    path: '/template/:id',
    name: 'TemplatePreview',
    component: TemplatePreview,
    props: true,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/form/:id',
    name: 'FormResponse',
    component: FormResponse,
    props: true,
  },
  {
    path: '/responses',
    name: 'ResponseSub',
    component: ResponseSub,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
