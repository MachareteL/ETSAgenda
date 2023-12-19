import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function getUserToken(){
    const token = localStorage.getItem("token");
    return token
  }

  return { count, doubleCount, increment, getUserToken }
})
