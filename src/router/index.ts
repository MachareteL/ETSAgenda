import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import FileUploadViewVue from '@/views/FileUploadView.vue';
import AdminLandingViewVue from '@/views/AdminLandingView.vue';
import { useUserStore } from '@/stores/counter';
import RegisterClassViewVue from '@/views/RegisterClassView.vue';
import { api } from '@/lib/adapters';

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
      component: RegisterClassViewVue,
      meta: {
        auth: true
      }
    },
    {
      path: '/landing',
      name: 'landing',
      component: AdminLandingViewVue,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach(async (to) => {
  if (to.meta.auth) {
    const userStore = useUserStore();
    const userToken = await userStore.getUserToken();
    if (!userToken) {
      return { path: '/login' };
    }
    const isTokenValid = await api.post('/login/validarToken', { tokenJWT: userToken });

    if (!isTokenValid) {
      return { path: '/login' };
    }
  }
});

export default router;
