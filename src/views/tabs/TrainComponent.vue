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
  // import workout_data from '../../../public/dev-data/workouts/workout-data.json';
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
    // mounted() {
    //     if (location.hash.substr(1) == 'view') {
    //       const name = "Exercise 1"
    //       let params = new URLSearchParams(document.location.search)
    //       params.set('id', name)
    //       console.log(params.get('id'))
    //       const formattedName = name.toLowerCase().replace(/\s/g, '')
    //       let tempSchedule = [...this.workoutJson]
    //       const results = tempSchedule.filter((workout: any) => {
    //         const tempName = workout.name.toLowerCase().replace(/\s/g, '')
    //       return tempName.includes(formattedName)
    //       })

    //       console.log(results)
    //         // if (sessionStorage.cache_modal_workout) {
    //         //     try { 
    //         //         this.openModal(JSON.parse(sessionStorage.cache_modal_workout))
    //         //     } catch (err) {
    //         //         sessionStorage.removeItem('cache_modal_workout')
    //         //         location.hash = ''
    //         //     }
    //         // } else {
    //         //     location.hash = ''
    //         // }
    //     }
    // }
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