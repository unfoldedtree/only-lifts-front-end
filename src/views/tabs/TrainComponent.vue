<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Train</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="train-container">
        <workout-component />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import WorkoutComponent from './train/workouts/WorkoutComponent.vue';

  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      WorkoutComponent,
    }
  });
</script>

<style>
  #train-container {
    padding: 10px 0;
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>