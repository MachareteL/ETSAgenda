<script setup lang="ts">
  import exceljs from 'exceljs';
  import { ref } from 'vue';
  const file = ref()
  const Workbook = new exceljs.Workbook()
  async function teste() {
    const planilha = await Workbook.xlsx.read(file)
  }
</script>

<template>
  <div class="about">
    <input type="file" name="file" id="file" accept=".xlsx" @change="teste"/>
  </div>
</template>
