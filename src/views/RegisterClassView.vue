<script setup lang="ts">
  import { api } from '@/lib/adapters';
  import { onMounted, ref } from 'vue';

  const classes = ref();
  onMounted(async () => {
    const res = await api.get('/turma');
    console.log(res.data.content);
    
  });
</script>
<template>
  Here must lay a table for the already registered classes and it respectively id's and class hours
</template>
