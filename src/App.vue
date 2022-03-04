<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { workoutStore } from '@/stores/workoutInfo';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  methods: {
    setUserWorkoutData() {
      workoutStore.commit('prepareWorkoutData');
      console.log(workoutStore.state.initialSchedule)
    }
  },
  created() {
    this.setUserWorkoutData()
  }
});
</script>

<style>
  * {
        --bs-gray-base: #a7a7a7;
        --primary-text: #E4E6EB;
        --card-background-flat: #323436;
        --bs-text-muted: #777;
        --comment-background: #3A3B3C;
        --card-background: #242526;
        --theme-bg-1: #18191a;
        --theme-dark: #0E0E10;
        --theme-post: #1c1e21;
        --theme-medium: #1C1C1E;
        --overflow: auto;
    }
</style>