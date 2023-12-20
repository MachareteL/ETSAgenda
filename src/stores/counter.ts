import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/lib/adapters';

export const useUserStore = defineStore('user', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  async function getUserToken() {
    const token = localStorage.getItem('token');
    // logica para ver se o token está válido
    // const isTokenValid = await api.post('/validar', { token });
    
    // if (!isTokenValid) {
    //   return null
    // }
    return token;
  }

  return { count, doubleCount, increment, getUserToken };
});
