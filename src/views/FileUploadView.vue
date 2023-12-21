<script setup lang="ts">
  import exceljs from 'exceljs';
  import { ref } from 'vue';
  const fileInput = ref<HTMLInputElement>();
  const workbook = new exceljs.Workbook();
  const fileReader = new FileReader();
  const tableRows = ref<TableRow[]>([]);

  async function printar() {
    const rows: Array<TableRow>[] = [];
    if (fileInput.value?.files && fileInput.value?.files[0]) {
      fileReader.readAsArrayBuffer(fileInput.value.files[0]);
      fileReader.onload = async (ev) => {
        const result = ev.target?.result;
        const worksheet = await workbook.xlsx.load(result as ArrayBuffer);
        worksheet.eachSheet((sheet) => {
          sheet.eachRow((row) => {
            const items = Array.from(row.values as unknown as Array<TableRow>);
            items.shift();
            rows.push(items);
          });
        });
        for (let index = 0; index < rows.length; index++) {
          const row = rows[index];
          let event = {
            titulo: row[0],
            inicio: row[1],
            final: row[2],
            local: row[3],
            instrutor: row[4],
            descricao: row[5],
            turma: row[6]
          };

          tableRows.value.push(event as unknown as TableRow);
        }
        console.log(tableRows.value);
        tableRows.value.shift()
      };
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
      <tbody>
        <tr v-for="row in tableRows">
          <td>{{ row.titulo }}</td>
          <td>{{ row.inicio.toLocaleDateString() }}</td>
          <td>{{ row.final.toLocaleDateString() }}</td>
          <td>{{ row.local }}</td>
          <td>{{ row.instrutor }}</td>
          <td>{{ row.descricao }}</td>
          <td>{{ row.turma }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
