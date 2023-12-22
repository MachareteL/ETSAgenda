<script setup lang="ts">
  import { api } from '@/lib/adapters';
import exceljs from 'exceljs';
  import { ref } from 'vue';
  const fileInput = ref<HTMLInputElement>();
  const workbook = new exceljs.Workbook();
  const fileReader = new FileReader();
  const tableRows = ref<PreviewTableRow[]>([]);

  async function renderTable() {
    const rows: Array<PreviewTableRow>[] = [];
    if (fileInput.value?.files && fileInput.value?.files[0]) {
      fileReader.readAsArrayBuffer(fileInput.value.files[0]);
      fileReader.onload = async (ev) => {
        const result = ev.target?.result;
        const worksheet = await workbook.xlsx.load(result as ArrayBuffer);
        worksheet.eachSheet((sheet) => {
          sheet.eachRow((row) => {
            const items = Array.from(row.values as unknown as Array<PreviewTableRow>);
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

          tableRows.value.push(event as unknown as PreviewTableRow);
        }
        console.log(tableRows.value);
        tableRows.value.shift();
      };
    }
  }

  async function registerEvents() {
    if (fileInput.value?.files && fileInput.value?.files[0]) {
      const file = fileInput.value?.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('file', file, file.name);
      api
        .postForm('/eventos/upload', formData)
        .then(({ data }) => {
          alert("Eventos cadastrados com sucesso!")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
</script>

<template>
  <div class="w-screen flex items-center justify-center py-8 gap-12">
    <label
      for="file"
      class="border rounded-md px-8 py-1 items-center flex-col flex font-thin cursor-pointer"
    >
      Inserir Excel
      <img src="/cloud-upload-signal-svgrepo-com.svg" alt="" class="w-12" />
    </label>
    <input
      type="file"
      name="file"
      id="file"
      accept=".xlsx"
      ref="fileInput"
      @change="renderTable"
      class="hidden"
    />
    <button @click="registerEvents" class="border rounded-md px-8 py-1 items-center flex-col flex font-thin cursor-pointer gap-2">
      Cadastrar <img src="/saving-disc-svgrepo-com.svg" alt="" class="w-10" />
    </button>
  </div>
  <div class="container mx-auto overflow-hidden rounded-t-lg px-8">
    <div class="rounded-t-xl overflow-hidden">
      <table class="font-sans w-full border">
        <thead>
          <tr>
            <th class="text-black py-2 bg-cyan-300 text-start pl-4 font-semibold">Título</th>
            <th class="text-black py-2 bg-cyan-300 text-start px-2 font-semibold">Data início</th>
            <th class="text-black py-2 bg-cyan-300 text-start px-2 font-semibold">Data final</th>
            <th class="text-black py-2 bg-cyan-300 text-start px-2 font-semibold">Local</th>
            <th class="text-black py-2 bg-cyan-300 text-start px-2 font-semibold">Instrutor</th>
            <th class="text-black py-2 bg-cyan-300 text-start px-2 font-semibold">Descrição</th>
            <th class="text-black py-2 bg-cyan-300 text-start px-2 font-semibold">Turma</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableRows" class="border-b border-cyan-300 px-2">
            <td class="pl-2 py-2">{{ row.titulo }}</td>
            <td class="py-1 px-2">{{ row.inicio.toLocaleDateString() }}</td>
            <td class="py-1 px-2">{{ row.final.toLocaleDateString() }}</td>
            <td class="py-1 px-2">{{ row.local }}</td>
            <td class="py-1 px-2">{{ row.instrutor }}</td>
            <td class="py-1 px-2">{{ row.descricao }}</td>
            <td class="py-1 px-2">{{ row.turma }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
