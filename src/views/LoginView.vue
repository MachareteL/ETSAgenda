<script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue';

  const form = ref();

  function login() {
    const usuario = form.value[0].value;
    const senha = form.value[1].value;
    axios
      .post('http://localhost:8081/login', { usuario, senha })
      .then(({ data }) => {
        const token = data.tokenJWT
        if(token){
          console.log(token);
          
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }
</script>
<template>
  <div class="container mx-auto justify-center flex items-center h-[80vh]">
    <form
      class="w-fit py-32 px-24 space-y-2 rounded-lg border border-gray-500"
      @submit.prevent="login"
      ref="form"
    >
      <div class="flex flex-col">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" class="text-black px-2 py-px" />
      </div>
      <div class="flex flex-col">
        <label for="password">Password</label>
        <input type="text" name="password" id="password" class="text-black px-2 py-px" />
      </div>
      <input
        type="submit"
        value="Sign in"
        class="bg-gray-700 px-2 py-1 rounded-md cursor-pointer"
      />
    </form>
  </div>
</template>
