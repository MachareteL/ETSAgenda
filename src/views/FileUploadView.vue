<script setup lang="ts">
  import exceljs from 'exceljs';
  import { ref } from 'vue';
  import { api } from '@/lib/adapters';
  const fileInput = ref<HTMLInputElement>();
  const workbook = new exceljs.Workbook();
  const fileReader = new FileReader();
  const columns = ref([]);

  async function printar() {
    if (fileInput.value?.files && fileInput.value?.files[0]) {
      fileReader.readAsArrayBuffer(fileInput.value.files[0]);
      fileReader.onload = async (ev) => {
        const result = ev.target?.result;
        const teste = await workbook.xlsx.load(result as ArrayBuffer);
        teste.eachSheet((ev) => {
          // ev.columns.map((cols, index) => {
          //   // console.log(cols.values);
          //   // console.log('filtro');

          //   const result = cols.values?.filter((col) => col);
          //   result?.shift();
          //   console.log(result);
          // });

          ev.eachRow((rows) => {
            // console.log(rows.values);
            if (rows.values) {
              const result = rows.values as Array<{}>
              result.shift()
              console.log(result);
              columns.value.push(result)
            }
          });
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
  <div class="container mx-auto px-8 overflow-hidden">
    <table class="font-sans w-full border">
      <thead>
        <tr>
          <th class="text-black py-2 bg-cyan-300">Título</th>
          <th class="text-black py-2 bg-cyan-300">Data início</th>
          <th class="text-black py-2 bg-cyan-300">Data final</th>
          <th class="text-black py-2 bg-cyan-300">Local</th>
          <th class="text-black py-2 bg-cyan-300">Instrutor</th>
          <th class="text-black py-2 bg-cyan-300">Descrição</th>
          <th class="text-black py-2 bg-cyan-300">Turma</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>
