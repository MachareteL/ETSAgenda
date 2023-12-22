<script setup lang="ts">
  import { api } from '@/lib/adapters';
  import { onMounted, ref } from 'vue';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';

  const stickySplitLabels = false;
  const minCellWidth = 400;
  const minSplitWidth = 100;

  const eventsRef = ref<CalendarEvent[]>([]);

  const splitDays = [
    // The id property is added automatically if none (starting from 1), but you can set a custom one.
    // If you need to toggle the splits, you must set the id explicitly.
    { id: 1, class: 'mom', label: 'Mom' },
    { id: 2, class: 'dad', label: 'Dad', hide: false },
    { id: 3, class: 'kid1', label: 'Kid 1' },
    { id: 4, class: 'kid2', label: 'Kid 2' },
    { id: 5, class: 'kid3', label: 'Kid 3' }
  ];
  const events = [
    {
      start: '2023-12-19 10:35',
      end: '2023-11-19 11:30',
      title: 'Doctor appointment',
      content: '<i class="icon material-icons">local_hospital</i>',
      class: 'health',
      split: 1 // Has to match the id of the split you have set (or integers if none).
    },
  ];
  onMounted(async () => {
    const { data } = await api.get('eventos');
    const events = data.content as BackendEvent[];

    for (let index = 0; index < events.length; index++) {
      const currentEvent = events[index];
      eventsRef.value.push({
        start: currentEvent.data_inicio,
        end: currentEvent.data_fim,
        title: currentEvent.titulo,
        class: '',
        content: '',
        split: ''
      });
    }
    console.log(eventsRef.value);
    
  });
</script>

<template>
  <div class="container mx-auto h-[85vh]">
    <!-- <Vue-cal :disable-views="['years', 'year', 'week']" /> -->
    <vue-cal
      class="vuecal--blue-theme"
      :selected-date="new Date()"
      :time-from="8 * 60"
      :time-step="30"
      :disable-views="['years', 'year', 'week']"
      :editable-events="false"
      :events="events"
      :split-days="splitDays"
      :sticky-split-labels="stickySplitLabels"
      :min-cell-width="minCellWidth"
      :min-split-width="minSplitWidth"
    >
    </vue-cal>
  </div>
</template>

<style>
  .vuecal--blue-theme__cell-events-count {
    width: 4px;
    min-width: 0;
    height: 4px;
    padding: 0;
    color: transparent;
  }
</style>
