<script setup lang="ts">
  import exceljs from 'exceljs';
  import { ref } from 'vue';
  import { api } from '@/lib/adapters';
  const fileInput = ref<HTMLInputElement>();
  const workbook = new exceljs.Workbook();

  const fileReader = new FileReader();
  async function printar() {
    if (fileInput.value?.files && fileInput.value?.files[0]) {
      fileReader.readAsArrayBuffer(fileInput.value.files[0]);
      fileReader.onload = async (ev) => {
        const result = ev.target?.result;
        const teste = await workbook.xlsx.load(result as ArrayBuffer);
        // console.log(teste);
        teste.eachSheet((ev) => {
          console.log(ev.columns.map((col) => {console.log(col.values);
          }));
        });
      };

      //   const file = fileInput.value?.files[0];
      //   console.log(file);
      //   const formData = new FormData();
      //   formData.append('file', file, file.name);
      //   formData.append('user', '1');
      //   api
      //     .postForm('/eventos/upload', formData)
      //     .then(({ data }) => {
      //       console.log(data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    }
  }
</script>

<template>
  <div class="about">
    <input type="file" name="file" id="file" accept=".xlsx" ref="fileInput" />
  </div>
  <button @click="printar">printar</button>
</template>
