import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import FormBuilder from '../components/FormBuilder.vue';
import LoginPage from '../components/LoginPage.vue';
import AdminPage from '../components/AdminPage.vue'; // Chemin vers AdminPage correct
import SignUp from '../components/SignUp.vue'; // Chemin vers SignUp correct
import firebase from '../firebaseConfig'; // Chemin vers firebaseConfig.js correct

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
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAdmin: true } // Protection d'accès admin
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Garde de navigation pour les routes nécessitant un rôle d'administration
router.beforeEach((to, from, next) => {
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  if (requiresAdmin) {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData.role === 'admin') {
              next();
            } else {
              next('/home'); // Rediriger vers la page d'accueil si non admin
            }
          } else {
            console.error('Aucun document utilisateur trouvé');
            next('/login');
          }
        }).catch((error) => {
          console.error('Erreur lors de la récupération du document utilisateur:', error);
          next('/login');
        });
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
