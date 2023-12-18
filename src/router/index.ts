import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import FileUploadViewVue from '@/views/FileUploadView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        auth: false
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: FileUploadViewVue,
      meta: {
        auth: true
      }
    },
    {
      path: '/reclass',
      name: 'reclass',
      component: FileUploadViewVue,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach(async (to) => {
  const isAuthenticated = true;
  if (!isAuthenticated && to.meta.auth) {
    // redirect the user to the login page
    console.log('requires auth');

    return { path: '/login' };
  }
});

export default router;
