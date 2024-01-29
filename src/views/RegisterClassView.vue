<script setup lang="ts">
    import { api } from '@/lib/adapters';
  import type { AxiosError } from 'axios';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    const teams = ref<Team[]>([]);
    const newTeamForm = ref();
    const { go } = useRouter();

    onMounted(async () => {
      const { data } = await api.get('/turma');
      const turmas = data.content as Team[];

      turmas.forEach(({ nome, turno }) => {
        teams.value.push({ nome, turno });
      });
    });

    async function registerNewTeam() {
      const nome = newTeamForm.value[0].value;
      const turno = newTeamForm.value[1].value;
      try {
        await api.post('/turma', { nome, turno });
      } catch (err) {
        alert((err as AxiosError).response?.data);
      }
      go(0);
    }
</script>

<template>
  <div class="flex flex-col items-center py-8">
    <div class="border rounded-md p-6 space-y-2">
      <h1>Cadastrar nova turma individual</h1>
      <form ref="newTeamForm" @submit.prevent="registerNewTeam" class="space-y-2">
        <div>
          <label for="nome">Nome da Turma: </label>
          <input type="text" name="nome" id="nome" class="text-black py-px px-2" />
        </div>
        <div>
          <label for="turno">Turno da Turma: </label>
          <input type="text" name="turno" id="turno" class="text-black py-px px-2" />
        </div>
        <input type="submit" value="Cadastrar" class="border px-2 py-1 rounded-md cursor-pointer" />
      </form>
    </div>
  </div>
  <div class="container mx-auto overflow-hidden rounded-t-lg px-8">
    <div class="rounded-t-xl overflow-hidden">
      <table class="font-sans w-full border">
        <thead>
          <tr>
            <th class="text-black py-2 bg-cyan-300 text-start pl-4 font-semibold">Nome da Turma</th>
            <th class="text-black py-2 bg-cyan-300 text-start px-2 font-semibold">
              Período de aula
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" class="border-b border-cyan-300 px-2">
            <td class="pl-2 py-2">{{ team.nome }}</td>
            <td class="py-1 px-2">{{ team.turno }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
