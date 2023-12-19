<script setup lang="ts">
  import { ref } from 'vue';
  import { api } from '@/lib/adapters';
  const event = ref();
  function login() {
    api
      .post('/eventos', event)
      .then(({ data }) => {
        const token = data.tokenJWT;
        if (token) {
          console.log(token);
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }
</script>
<template>
  <table>
    <!--
      Here must lay a table for the already registered classes and it respectively id's and class hours
           
      -->
  </table>
</template>
